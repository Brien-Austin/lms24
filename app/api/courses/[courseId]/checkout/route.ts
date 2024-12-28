import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST( req : Request , {params} : {params : {courseId : string}}){
    try {
        const user = await currentUser();
        if ( !user || !user.id || !user.emailAddresses?.[0].emailAddress){
            return new NextResponse('Unauthorized' ,{status : 400});
        }

        const course = await db.course.findUnique({
            where : {
                id : params.courseId,
                isPublished : true
            }
        })

        const purchase = await db.purchase.findUnique({
            where : {
                userID_courseID : {
                    userID : user.id,
                    courseID : params.courseId
                }
            }
        })

        if(purchase){
            return new NextResponse('Already purchased')
        }
        if(!course){
            return new NextResponse('Course not found')
        }

        const line_items : Stripe.Checkout.SessionCreateParams.LineItem[] =[ {
            quantity:1,
            price_data : {
                currency : 'INR',
                product_data : {
                    name : course.title,
                    description : course.description!
                },
                unit_amount : Math.round((Number(course.price) ?? 0) * 100)
            }
        }]

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where : {
                userID : user.id,
            },
            select : {
                stripeCustomerID : true
            }
        })

        if(!stripeCustomer){
            const customer = await stripe.customers.create({
                email : user.emailAddresses[0].emailAddress
            })
            stripeCustomer = await db.stripeCustomer.create({
                data : {
                    userID : user.id,
                    stripeCustomerID : customer.id
                }
            })

        }

        const session = await stripe.checkout.sessions.create({
            customer : stripeCustomer.stripeCustomerID,
            payment_method_types : ["card"],
            line_items,
            mode : 'payment',
            
            success_url : `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?
            success=1`,
            cancel_url : `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?
            cancel=1`,
            metadata : {
                courseId : course.id,
                userId : user.id
            }
        })
        return NextResponse.json({url : session.url})

        
    } catch (error) {
        
        console.log('[CHECKOUT_ERROR}',error);
        return new NextResponse('Internal Server Error', {status : 500})
    }
}
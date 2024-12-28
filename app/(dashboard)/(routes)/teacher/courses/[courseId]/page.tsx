import { IconBadge } from "@/components/IconBadge";
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { File, IndianRupeeIcon, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import { ImageForm } from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import { AttachmentForm } from "./_components/AttachmentForm";
import { ChaptersForm } from "./_components/ChaptersForm";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/Actions";




export default async function Course({params} : {params: {courseId : string}}){
    const {userId} = auth();
  

    
    const categories = await db.category.findMany({
        orderBy : {
            name : "asc"
        }
    })

console.log(categories)
    const course = await db.course.findUnique({
        where : {
            id : params.courseId,
          
       
        },
        include:{
            chapters : {
                orderBy : {
                    position : "asc"
                }

            },
            attachments: {
                orderBy: {
                  createdAt: "desc",
                },
              },
        }
    })

    if (!course){
        return redirect("/")
    }

    

  
    const requiredFields = [
        course?.title,
        course?.description,
        course?.imageUrl,
        course?.price,
        course?.categoryID,
        course?.chapters.some(chapters => chapters.isPublished)
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`
    const isComplete = requiredFields.every(Boolean)
    const id = auth();
    console.log(id);
    return (<>
    {
        !course.isPublished && (
            <>
            <Banner label="This course is not published and it will not be visible to the students"/>
            </>
        )
    }
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course Setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete All Fields {completionText}
                    </span>

                </div>
               <Actions disabled={!isComplete} courseId={params.courseId} isPublished={course.isPublished}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2"> 
                    <IconBadge icon={LayoutDashboard}/>
                    <h1>
                        Customize your Course
                    </h1>  
                    </div>
                    <TitleForm
                    initialData = {course}
                    courseId = {params.courseId}
                    />
                
                     <DescriptionForm
                    initialData = {course}
                    courseId = {params.courseId}
                    />
                     <ImageForm
                    initialData = {course}
                    courseId = {params.courseId}
                    />
                      <CategoryForm

                      options = {categories.map((category)=>({
                        label : category.name,
                        value : category.id
                      }))}
                      
                    initialData = {course}
                    courseId = {params.courseId}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks}/>
                            <h2 className="text-xl">Course Chapters</h2>

                        </div>
                       <div>
                        <ChaptersForm  initialData={course} courseId={course.id}/>
                       </div>
                    </div>
                    <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={IndianRupeeIcon}/>
                        <h2 className="text-xl">
                            Sell your course
                        </h2>

                    </div>
                    <PriceForm initialData={{ ...course, price: course.price ? Number(course.price) : null }} courseId={params.courseId}/>
                </div>
                <div>
                <div className="flex items-center gap-x-2">
                        <IconBadge icon={File}/>
                        <h2 className="text-xl">
                            Resources and Attachments
                        </h2>

                    </div>
                    <AttachmentForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                </div>

               
                </div>
             

            </div>
        
        </div>
        </>
    )
}
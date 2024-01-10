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

export default async function Course({params} : {params: {courseId : string}}){

    
    const categories = await db.category.findMany({
        orderBy : {
            name : "asc"
        }
    })

console.log(categories)
    const course = await db.course.findUnique({
        where : {
            id : params.courseId
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
        course?.categoryID
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`
    const id = auth();
    console.log(id);
    return (
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
                            Todo chapters
                        </div>
                    </div>
                    <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={IndianRupeeIcon}/>
                        <h2 className="text-xl">
                            Sell your course
                        </h2>

                    </div>
                    <PriceForm initialData={course} courseId={params.courseId}/>
                </div>
               
                </div>
                <div></div>

            </div>
        
        </div>
    )
}
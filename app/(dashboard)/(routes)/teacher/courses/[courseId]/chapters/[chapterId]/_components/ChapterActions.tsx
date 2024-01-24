"use client"

import { ConfirmModal } from "@/components/confirm-modal"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios'
import { useRouter } from "next/navigation"

interface ChapterActionsProps {
    disabled : boolean,
    courseId : string
    chapterId : string
    isPublished : boolean
}

export const ChapterActions = ({disabled,courseId,chapterId,isPublished}: ChapterActionsProps) =>{
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);

    const onClick = async() => {
        try {
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
               toast.success('Chapter Unpublished')
            }
            else{
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
                toast.success('Chapter published')
            }

            
        } catch (error) {
            toast.error("Something went wrong")

            
        }
        finally{
            setIsLoading(false);
        }

    }
    const onDelete =async() =>{
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success('Chapter deleted successfully')
            router.refresh();
            router.push(`/teacher/courses/${courseId}`)

            
        } catch (error) {
            toast.error("Something went wrong")
            
        }
        finally {
            setIsLoading(false)
        }


    }
    return ( 

        <div className="flex items-center gap-x-2">
            <Button onClick={onClick}size={"sm"}  disabled={disabled || isLoading} variant={"outline"} >
                {isPublished ? "UnPublish" : "Publish"}
            </Button>
            <ConfirmModal  onConfirm={onDelete}>
            <Button disabled={isLoading} size={"sm"} >
                <Trash className="h-4 w-4"/>
            </Button>
            </ConfirmModal>
            
        </div>
    )
}
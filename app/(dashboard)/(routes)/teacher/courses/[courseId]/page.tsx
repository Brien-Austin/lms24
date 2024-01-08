export default function Course({params} : {params: {courseId : string}}){
    return (
        <>
        <p>Course ID : {params.courseId}</p>
        </>
    )
}
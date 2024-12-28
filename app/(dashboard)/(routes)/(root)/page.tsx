import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { getDashboardCourses } from "@/app/actions/get-dashboard-courses";
import { InfoCard } from "./_components/InfoCard";
import { CoursesList } from "../search/_components/CoursesList";

;

export default async function Dashboard() {
  const { PrismaClient}  = require('@prisma/client')

// const database = new PrismaClient();

// async function main() {

//     try {

//         await database.category.createMany({
//             data : [
//                 {name:'Computer Science'},
//                 {name:'Music'},
//                 {name:'Fitness'},
//                 {name:'Engineering'},
//                 {name:'Photography'},
//                     {name:'Filming'},
//                     {name:'Accounting'},
//             ]
//         });
//         console.log('Uploaded data to database')
        
//     } catch (error) {
//         console.log('Error seeding the database',error)
        
//     }
//     finally {
//         console.log('Disconnected from database')
//         await database.$disconnect();
//     }
// }


// main();
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
import { UserButton, auth } from "@clerk/nextjs";


export default function Home() {
  const {userId} = auth();
  console.log(userId);
  return (
  <div>
    <UserButton  afterSignOutUrl="/"/>

  </div>
  )
}

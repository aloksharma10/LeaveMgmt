"use client"
import { applyLeave } from "@/actions/leaveActions";
import { Button } from "@/components/ui/button";

// import Dashboard from '@/components/Dashborad/Dashborad'
export default function Home() {
  return (
  //  <Dashboard/>
  <Button onClick={()=>{
    applyLeave({
      userId: '6511d7209677f6959aae545c',
      title: "Vacation trip title all the way from client",
      startDate: '2023-09-25',
      endDate: '2023-10-30',
      message: 'Vacation trip'
    })
  }}>Create Leave</Button>
  )
}

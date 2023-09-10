// import Dashboard from '@/components/Dashborad/Dashborad'
import dynamic from 'next/dynamic';
export default function Home() {
  const Dashboard = dynamic(() => import('@/components/Dashborad/Dashborad'), {
    loading: () => <div>Loading...</div>,
  });
  return (
   <Dashboard/>
  )
}

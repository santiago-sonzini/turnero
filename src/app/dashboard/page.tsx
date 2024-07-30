
import { TabsDashboard } from '@/components/tables/appoinments/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNextDaysAppointments, getTodayAppointments } from '../actions/appoinments';

export default async function Page() {
  const  nextFifteenRes = await getNextDaysAppointments(15)
  const  nextSevenRes = await getNextDaysAppointments(7)
  const todayRes = await getTodayAppointments(new Date())

  const nextFifteen = nextFifteenRes.status === 200 ? nextFifteenRes.data : []
  const nextSeven = nextSevenRes.status === 200 ? nextSevenRes.data : []
  const today = todayRes.status === 200 ? todayRes.data : []
  return (
      <div className="w-screen md:w-full p-2 md:p-8">
      
        <div className="flex items-center justify-center space-y-2">
         
          <TabsDashboard  today={today} nextSeven={nextSeven} nextFifteen={nextFifteen} />

          </div>
      </div>
  );
}

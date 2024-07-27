
import { TabsDashboard } from '@/components/tables/appoinments/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNextSevenDaysAppointments, getTodayAppointments } from '../actions/appoinments';

export default async function Page() {
  const  nextSevenRes = await getNextSevenDaysAppointments()
  const todayRes = await getTodayAppointments(new Date())

  const nextSeven = nextSevenRes.status === 200 ? nextSevenRes.data : []
  const today = todayRes.status === 200 ? todayRes.data : []
  return (
    <ScrollArea className="w-screen md:w-fit h-full flex flex-col justify-center items-center p-3 ">
      <div className="w-screen md:w-full">
      
        <div className="flex items-center justify-between space-y-2">
         
          <TabsDashboard  today={today} nextSeven={nextSeven} />

          </div>
      </div>
    </ScrollArea>
  );
}

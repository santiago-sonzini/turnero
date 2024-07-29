
import { TabsDashboard } from '@/components/tables/appoinments/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNextSevenDaysAppointments, getTodayAppointments } from '../actions/appoinments';

export default async function Page() {
  const  nextSevenRes = await getNextSevenDaysAppointments()
  const todayRes = await getTodayAppointments(new Date())

  const nextSeven = nextSevenRes.status === 200 ? nextSevenRes.data : []
  const today = todayRes.status === 200 ? todayRes.data : []
  return (
      <div className="w-screen md:w-full p-2 md:p-8">
      
        <div className="flex items-center justify-center space-y-2">
         
          <TabsDashboard  today={today} nextSeven={nextSeven} />

          </div>
      </div>
  );
}

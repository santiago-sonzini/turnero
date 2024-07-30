import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AppointmentWithDetails } from "@/app/actions/appoinments"
import { AppointmentsClient } from "../appoinments/client"

export function TabsDashboard({ today, nextSeven }: { today: AppointmentWithDetails[], nextSeven: AppointmentWithDetails[] }) {
  return (
    <Tabs defaultValue="today" className="w-11/12">
      <TabsList className="grid w-full md:w-1/3 grid-cols-2">
        <TabsTrigger value="today">Hoy</TabsTrigger>
        <TabsTrigger value="week">7 dias</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <AppointmentsClient data={today} />
      </TabsContent>
      <TabsContent value="week">
      <AppointmentsClient data={nextSeven} />
      </TabsContent>
    </Tabs>
  )
}

import Page from "@/components/pages/turnos/page";
import { getAllServices } from "../actions/services";
import AvailableTimesDisplay from "@/components/pages/turnos/page";
import { getUserData, getUserDataWithAppointment } from "../actions/auth";
import PaginatedAppointments from "@/components/paginated-apoinments";

export default async function HomePage() {
  const res_user = await getUserDataWithAppointment();
  console.log("🚀 ~ HomePage ~ res_user:", res_user);

  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center p-4 text-white md:justify-center">
      {res_user?.status === 200 && res_user.data?.appointments ? (
        <PaginatedAppointments
          appointments={res_user.data.appointments}
          itemsPerPage={2}
        />
      ) : null}
    </main>
  );
}

import Page from "@/components/pages/turnos/page";
import { getAllServices } from "../actions/services";
import AvailableTimesDisplay from "@/components/pages/turnos/page";
import { getUserData } from "../actions/auth";


export default async function HomePage() {
  const res_user = await getUserData();
  
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-start md:justify-center text-white">
      {<AvailableTimesDisplay user={res_user?.status === 200 ? res_user.data : null}  />}
    </main>
  );
}

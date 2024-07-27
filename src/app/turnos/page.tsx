import Page from "@/components/pages/turnos/page";
import { getAllServices } from "../actions/services";
import AvailableTimesDisplay from "@/components/pages/turnos/page";
import { getUserData } from "../actions/auth";


export default async function HomePage() {
  const res = await getAllServices(new Date());
  const res_user = await getUserData();
  console.log("🚀 ~ HomePage ~ user:", )
  if (res.status !== 200) {
    return <div>Error: {res.message}</div>;
  }
  console.log("🚀 ~ HomePage ~ res:", res.data[0])
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-start md:justify-center text-white">
      {res.data[0] && <AvailableTimesDisplay user={res_user?.status === 200 ? res_user.data : null} service={res.data[0]} />}
    </main>
  );
}

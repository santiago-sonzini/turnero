import { ServicesForm } from "@/components/services/form";
import { redirect } from "next/navigation";


export default function HomePage() {
  redirect("/turnos")
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      </div>
    </main>
  );
}

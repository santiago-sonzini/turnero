"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { Heading } from "@/components/ui/heading";
import { Clipboard, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { UserWithAppointments } from "@/app/actions/users";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { CreateAppointmentModal } from "./create-appointment-modal";

interface ClientsClientProps {
  data: UserWithAppointments;
}

export const ClientsClient = ({ data }: ClientsClientProps) => {
  const router = useRouter();

  const appointments = data?.appointments ?? [];

  return (
    <>
      <div className="my-5 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{data.name}</h2>
         <div className="flex items-center justify-start space-x-2 mt-5 gap-x-4 p-2">
         <Button
            onClick={() => {
              toast({
                title: "Copiado al portapapeles",
              })
              navigator.clipboard.writeText(data.phone);
            }}
          >
            <Clipboard className=" h-4 w-4" /> 
          </Button>
         <a target="_blank" href={`https://wa.me/549${data.phone}`} className="text-nowrap flex items-center underline text-lg md:text-sm text-muted-foreground">
            {`+54 9 ${data.phone}`}
          </a>
         
         </div>
        </div>
        <CreateAppointmentModal text="Crear turno" user={data} />
      </div>
      <DataTable searchKey="date" columns={columns} data={appointments} />
    </>
  );
};

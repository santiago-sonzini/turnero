'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { UserWithAppointments } from '@/app/actions/users';

interface ClientsClientProps {
  data: UserWithAppointments;
}

export const ClientsClient = ({ data }: ClientsClientProps) => {
  const router = useRouter();

  const appointments = data?.appointments ?? [];

  return (
    <>
      <div className="flex items-start justify-between my-5">
        <Heading
          title={`${data.name}, Turnos (${appointments.length})`}
          description={`Numero de telefono: ${data.phone}`}
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />Crear turno
        </Button> */}
      </div>
      <DataTable searchKey="date" columns={columns} data={appointments} />
    </>
  );
};

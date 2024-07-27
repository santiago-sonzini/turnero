'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Appointment } from '@prisma/client';
import { AppointmentWithDetails } from '@/app/actions/appoinments';

interface AppointmentClientProps {
  data: AppointmentWithDetails[];
}

export const AppointmentsClient = ({ data }: AppointmentClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between my-5">
        <Heading
          title={`Turnos (${data.length})`}
          description=''
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />Crear turno
        </Button>
      </div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

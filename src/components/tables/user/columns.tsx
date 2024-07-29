'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { Appointment, AppointmentStatus } from '@prisma/client';
import { AppointmentWithDetails } from '@/app/actions/appoinments';


import { format } from "date-fns"
import { translateStatusToSpanish } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<AppointmentWithDetails>[] = [
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => (
      <Badge className={`${getStatusVariant(row.original.status)}`} >
        {translateStatusToSpanish(row.original.status)}
      </Badge>
    )
  },
  {
    accessorKey: 'startTime',
    header: 'Hora',
    cell: ({ row }) => <div>{row.original.startTime}</div>
  },
  {
    accessorKey: 'service.name',
    header: 'Servicio',
    cell: ({ row }) => <div>{row.original.service.name}</div>
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => (
      <div>
        {new Date(row.original.date).toLocaleDateString('es-ES')}
      </div>
    )
  },
  
  
  
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    cell: ({ row }) => (
      <div>
        {new Date(row.original.createdAt).toLocaleDateString('es-ES')}
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];


const getStatusVariant = (status: AppointmentStatus): string => {
  switch (status) {
    case 'SCHEDULED':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-900';
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-900';
    case 'CANCELED':
      return 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-900';
    case 'COMPLETED':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-900';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-900';
  }
};
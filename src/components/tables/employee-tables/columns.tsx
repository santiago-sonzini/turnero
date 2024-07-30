'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { UserWithAppointmentsCount } from '@/app/actions/users';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<UserWithAppointmentsCount>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'NOMBRE'
  },
  
  {
    accessorKey: 'phone',
    header: 'Nro de telefono',
    cell: ({ row }) => <a target="_blank" href={`https://wa.me/549${row.original.phone}`} className="flex items-center underline text-lg md:text-sm text-muted-foreground">
    {`+54 9 ${row.original.phone}`}
  </a>
  },
  {
    accessorKey: 'createdAt',
    header: 'CREADO',
    cell: ({ row }) => row.original.createdAt.toLocaleDateString("es-ES")
  },
  {
    id: 'appointmentsCount',
    header: 'TURNOS',
    cell: ({ row }) => row.original.appointments.length
  },
  {
    id: 'appointmentsCount',
    header: '',
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/clients/${row.original.id}`}
        >
          <Button variant="outline" className="w-full">
            Ir
          </Button>
        </Link>
      );
    }
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
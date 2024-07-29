import { getUserDataWithAppointment } from '@/app/actions/auth';
import { get_user_id_with_apointments } from '@/app/actions/users';
import BreadCrumb from '@/components/breadcrumb';
import { ClientsClient } from '@/components/tables/user/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  
  const res = await get_user_id_with_apointments(params.id);
  if (res.status === 200 && res.data) {
    const { data } = res;
    const breadcrumbItems = [
      { title: 'Clientes', link: '/dashboard/clients' },
      { title: `${data?.name}`, link: `/dashboard/clients/${data?.id}` }
    ];

    return (
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-8">
          <BreadCrumb items={breadcrumbItems} />
         <ClientsClient data={data} />
        </div>
      </ScrollArea>
    );
  }

  return <div>Error</div>;
  

  
}

import { get_user_apointments_paginated } from "@/app/actions/users";
import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Clientes", link: "/dashboard/clients" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const phone = (searchParams.search || '').toString();
  const offset = (page - 1) * pageLimit;

  const res = await get_user_apointments_paginated(
    page,
    pageLimit,  
    offset,
    phone ? phone : undefined,
  );
  
  if (res.status === 200 && res.data) {
    const totalUsers = res.data.totalUsers;
    const pageCount = res.data.totalPages;
    const users = res.data.users;
    return (
      <>
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <Heading
              title={`Clientes (${totalUsers})`}
              description="Informacion sobre tus clientes"
            />

            <Link

              href={"/dashboard/employee/new"}
              target="_blank"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Agregar nuevo
            </Link>
          </div>
          <Separator />

          <EmployeeTable
            searchKey="name"
            pageNo={page}
            columns={columns}
            totalUsers={totalUsers}
            data={users}
            pageCount={pageCount}
          />
        </div>
      </>
    );
  }
  return <div>Error</div>;
}

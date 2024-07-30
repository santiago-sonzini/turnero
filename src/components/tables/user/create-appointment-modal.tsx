"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Edit, Plus } from "lucide-react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  FormContactInfo,
  FormContactInfoSchema,
} from "@/components/forms/form-contact-info";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
import { User } from "@prisma/client";
import { create_user } from "@/app/actions/users";
import { cleanAndFixPhone } from "@/lib/utils";
import {
  AvailableTimesDisplay,
  AvailableTimesSkeleton,
} from "@/components/pages/turnos/page";
import {
  ServiceWithAvailability,
  getAllServices,
} from "@/app/actions/services";
import AvailableTimes from "@/components/available-times";
import { DatePicker } from "@/components/ui/date-picker";

export function CreateAppointmentModal({
  text,
  user,
}: {
  text: string;
  user: User;
}) {
  const [serviceState, setServiceState] =
    React.useState<ServiceWithAvailability | null>(null);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [loading, setLoading] = React.useState(false);

  const getData = async (date: Date) => {
    setLoading(true);
    const res = await getAllServices(date);

    if (
      res.status === 200 &&
      res.data[0] &&
      res.data[0].availableTimes.length > 0
    ) {
      setServiceState(res.data[0]);
    } else {
      console.log("Error al obtener los servicios");
      setServiceState(null);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (date) {
      getData(date);
    }
  }, [date]);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useClientMediaQuery("(min-width: 768px)");

 

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-background sm:max-w-[425px] md:w-[50vw] md:max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>
              <h4 className="text-text font-arvo m-2 text-center text-2xl md:text-3xl">
                Crear turno para {user?.name}
              </h4>
            </DialogTitle>
            <DialogDescription className="font-arvo flex h-[55vh] flex-col overflow-y-scroll font-normal">
              <DatePicker
                disabled={loading}
                selected={date}
                onSelect={setDate}
              />

              {serviceState && !loading && date ? (
                <AvailableTimes.Display
                  getData={getData}
                  user={user}
                  date={date}
                  service={serviceState}
                />
              ) : loading ? (
                <AvailableTimes.SkeletonDisplay />
              ) : (
                <div className="w-full rounded-lg border bg-background p-6 shadow-lg dark:border-gray-700 dark:shadow-none md:w-1/3">
                  <p className="text-text mb-4 text-center font-bold">
                    No hay horarios disponibles para el dia seleccionado
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {text}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="mb-10 text-left">
          <DrawerTitle>
            <h4 className="text-text m-2 text-center text-2xl font-bold md:text-xl">
            Crear turno para {user?.name}
            </h4>
          </DrawerTitle>
          <DrawerDescription className="font-arvo h-[55vh] overflow-y-scroll font-normal">
            <DatePicker disabled={loading} selected={date} onSelect={setDate} />

            {serviceState && !loading && date ? (
              <AvailableTimes.Display
                getData={getData}
                user={user}
                date={date}
                service={serviceState}
              />
            ) : loading ? (
              <AvailableTimes.SkeletonDisplay />
            ) : (
              <div className="w-full rounded-lg border bg-background p-6 shadow-lg dark:border-gray-700 dark:shadow-none md:w-1/3">
                <p className="text-text mb-4 text-center font-bold">
                  No hay horarios disponibles para el dia seleccionado
                </p>
              </div>
            )}
          </DrawerDescription>

          <DrawerClose asChild className="mb-24">
            {/* <Button>Cerrar</Button> */}
          </DrawerClose>
        </DrawerHeader>

        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

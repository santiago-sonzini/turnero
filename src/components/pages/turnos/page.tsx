"use client";

import { createAppointment } from "@/app/actions/appoinments";
import {
  ServiceWithAvailability,
  getAllServices,
} from "@/app/actions/services";
import { create_user } from "@/app/actions/users";
import {
  FormContactInfo,
  FormContactInfoSchema,
} from "@/components/forms/form-contact-info";
import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import {
  addDays,
  addMinutesToTime,
  capitalizeFirstLetter,
  cleanAndFixPhone,
} from "@/lib/utils";
import { Appointment, ServiceAvailability, User } from "@prisma/client";
import { log } from "console";
import { set } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import App from "next/app";
import React, { useEffect, useState } from "react";
import { Form } from "react-hook-form";
import { z } from "zod";

const Page = ({ user }: { user: User | null }) => {
  const [serviceState, setServiceState] =
    useState<ServiceWithAvailability | null>(null);
  const [date, setDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (date) {
      getData(date);
    }
  }, [date]);

  return (
    <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16 md:justify-center">
      <div className="text-text flex w-5/6 items-center justify-center gap-4 text-center md:w-1/3">
        {/* <Button disabled={loading} onClick={
          () => {
            setDate(addDays(date, -1));
          }
        } className="">
          <ChevronLeft />
        </Button> */}

        <DatePicker disabled={loading} selected={date} onSelect={setDate} />

        {/* <Button disabled={loading} onClick={
          () => {
            setDate(addDays(date, 1));
          }
        } className="">
          <ChevronRight />
        </Button> */}
      </div>
      {serviceState && !loading && date ? (
        <AvailableTimesDisplay
          getData={getData}
          user={user}
          date={date}
          service={serviceState}
        />
      ) : loading ? (
        <AvailableTimesSkeleton />
      ) : (
        <div className="w-full rounded-lg border bg-background p-6 shadow-lg dark:border-gray-700 dark:shadow-none md:w-1/3">
          <p className="text-text mb-4 text-center font-bold">
            No hay horarios disponibles para el dia seleccionado
          </p>
        </div>
      )}
    </div>
  );
};

export const AvailableTimesDisplay = ({
  service,
  date,
  user,
  getData,
}: {
  service: ServiceWithAvailability;
  date: Date;
  user: User | null;
  getData: Function;
}) => {
  const handleSubmit = async (input: z.infer<typeof FormContactInfoSchema>) => {
    const phone = cleanAndFixPhone(input.phone);
    const data = {
      ...input,
      phone,
    };
    console.log("🚀 ~ handleSubmit ~ data:", data);
    const res = await create_user(input);
    if (res.status === 200) {
      toast({
        title: "Exito.",
        description:
          "Se ha actualizado tus datos, recarga la pagina si no se muestran los horarios disponibles",
      });
    } else {
      toast({
        title: "Error al actualizar datos",
      });
    }
  };

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (service.availableTimes && service.availableTimes[0]) {
      const times = generateAvailableTimes(
        service.availableTimes[0],
        service.appointments,
        date,
      );
      setAvailableTimes(times);
    }
  }, [service, date]);

  const generateAvailableTimes = (
    availableTime: ServiceAvailability,
    appointments: Appointment[],
    date: Date,
  ) => {
    const { startHour, endHour, timesPerHour } = availableTime;
    const start = new Date(`2000-01-01T${startHour}`);
    const end = new Date(`2000-01-01T${endHour}`);
    const times = [];

    // Convert appointment times to Date objects for comparison
    const appointmentTimes = appointments.map((appointment) => ({
      date: new Date(appointment.date).toDateString(), // Normalize date for comparison
      start: new Date(`2000-01-01T${appointment.startTime}`),
      end: new Date(`2000-01-01T${appointment.endTime}`),
    }));

    while (start < end) {
      const timeString = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Check if this time overlaps with any appointment on the selected date
      const isOverlap = appointmentTimes.some((appointment) => {
        if (appointment.start.getTime() === start.getTime()) {
          console.log(
            "🚀 ~ isOverlap ~ appointment:",
            appointment.start.toTimeString(),
            start.toTimeString(),
          );
        }
        return start.getTime() === appointment.start.getTime();
      });

      if (!isOverlap) {
        times.push(timeString);
      }

      start.setMinutes(start.getMinutes() + 60 / timesPerHour);
    }

    return times;
  };

  if (!user) {
    return (
      <div className="w-full rounded-lg border bg-background p-6 shadow-lg dark:border-gray-700 dark:shadow-none md:w-1/3">
        <p className="text-text mb-4 font-bold">
          Por favor, ingrese tus datos para ver los horarios disponibles
        </p>

        <FormContactInfo
          button="Continuar"
          user={null}
          submitRef={null}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }

  const handleCreateAppointment = async (
    startTime: string,
    endTime: string,
  ) => {
    const data: Omit<Appointment, "id" | "createdAt" | "updatedAt" | "status"> =
      {
        date,
        userId: user.id,
        startTime,
        endTime,
        serviceId: service.id,
      };
    // console.log("🚀 ~ handleSubmit ~ data:", data);
    const res = await createAppointment(data);
    console.log("🚀 ~ handleCreateAppointment ~ res:", res);
    if (res.status === 201) {
      toast({
        title: "Confirmado",
        description: res.message,
      });
      getData(date);
    } else {
      toast({
        title: "Error al agendar turno",
        description: res.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-6 shadow-lg dark:border-gray-700 dark:shadow-none md:w-2/5">
      <div className="flex items-center justify-between">
        <h2 className="text-text mb-4 text-xl font-bold">
          {service.name} -{" "}
          {capitalizeFirstLetter(
            date.toLocaleDateString("es-ES", { weekday: "long" }),
          )}{" "}
          {date.toLocaleDateString("es-ES")}
        </h2>
      </div>
      <p className="text-text mb-2">Duracion: {service.duration} minutes</p>
      <p className="text-text mb-2">Precio: ${service.price.toFixed(2)}</p>
      <p className="text-text my-4 font-bold">Horarios disponibles</p>

      {service.availableTimes.map((availableTime, index) => (
        <div key={index} className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time, idx) => {
              if (availableTime.startHour) {
                return (
                  <ConfirmModal
                    handleSubmit={() => {
                      handleCreateAppointment(time, time);
                    }}
                    date={date}
                    key={idx}
                    item={user}
                    text={time}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export const AvailableTimesSkeleton = () => (
  <Skeleton className="h-[55vh] w-full space-y-2 p-4 md:w-2/5">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
    <div className="grid grid-cols-3 gap-2">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  </Skeleton>
);

export default Page;

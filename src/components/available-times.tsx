import { ServiceWithAvailability } from "@/app/actions/services";
import { Appointment, ServiceAvailability, User } from "@prisma/client";
import { FormContactInfo, FormContactInfoSchema } from "./forms/form-contact-info";
import { capitalizeFirstLetter, cleanAndFixPhone } from "@/lib/utils";
import { create_user } from "@/app/actions/users";
import { toast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { createAppointment } from "@/app/actions/appoinments";
import { ConfirmModal } from "./modal/confirm-modal";
import { Skeleton } from "./ui/skeleton";
import { z } from "zod";

const Display = ({
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
    const [loading, setLoading] = useState(false);
    const handleCreateAppointment = async (
      startTime: string,
      endTime: string,
    ) => {
        setLoading(true);
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
      if (res.status === 200) {
        toast({
          title: "Confirmado",
          description: res.message,
        });
      } else {
        toast({
          title: "Error al agendar turno",
          description: res.message,
        });
      }
      getData(date);
      setLoading(false);

    };
  
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-6 shadow-lg dark:border-gray-700 dark:shadow-none ">
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
                      loading={loading}
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
  
  const SkeletonDisplay = () => (
    <Skeleton className="h-[55vh] w-full space-y-2 p-4 ">
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

export default {Display, SkeletonDisplay};
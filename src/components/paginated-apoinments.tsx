"use client";
import React, { useState, useEffect } from "react";
import { format, set } from "date-fns";
import { Appointment, AppointmentStatus } from "@prisma/client";
import { capitalizeFirstLetter, translateStatusToSpanish } from "@/lib/utils";
import { Button } from "./ui/button";
import { AlertModal } from "./modal/alert-modal";
import { cancelAppointment } from "@/app/actions/appoinments";
import { toast } from "./ui/use-toast";
import { log } from "console";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

interface PaginatedAppointmentsProps {
  appointments: Appointment[];
  itemsPerPage: number;
}

const PaginatedAppointments: React.FC<PaginatedAppointmentsProps> = ({
  appointments,
  itemsPerPage,
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedAppointments, setPaginatedAppointments] = useState<
    Appointment[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | null>(null);


  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const filteredAppointments = selectedStatus
      ? appointments.filter(app => app.status === selectedStatus)
      : appointments;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedAppointments(filteredAppointments.slice(startIndex, endIndex));
  }, [currentPage, appointments, itemsPerPage, selectedStatus]);

  const totalPages = Math.ceil(
    (selectedStatus ? appointments.filter(app => app.status === selectedStatus).length : appointments.length) 
    / itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDeleteAppointment = async (id: string) => {
    setIsLoading(true);
    const result = await cancelAppointment(id);
    if (result.status === 200) {
      router.refresh();
      setIsOpen(false);
      toast({
        title: "Turno cancelado",
        description: result.message,
      });
    } else {
      setIsOpen(false);
      toast({
        title: "Error al cancelar el turno",
        description: result.message,
      });
    }

    setIsLoading(false);
  };

  const handleStatusFilter = (status: AppointmentStatus | null) => {
    if (status === selectedStatus) {
      setSelectedStatus(null);
      return;
    }
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when changing filter
  };


  return (
    <div className="space-y-4 flex flex-col items-center gap-y-5 ">
      <div className="text-text text-2xl text-center">
        <span className="font-semibold ">Mis Turnos</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Badge
          onClick={() => handleStatusFilter(null)}
          className={`px-3 py-1 hover:bg-primary hover:text-white  ${selectedStatus === null ? 'bg-primary text-white' : 'bg-white text-black '}`}
        >
          Todos
        </Badge>
        {Object.values(AppointmentStatus).map((status) => (
          <Badge
            key={status}
            onClick={() => handleStatusFilter(status)}
            className={` p-2 hover:bg-primary hover:text-white ${selectedStatus === status ? 'bg-primary text-white' : 'bg-white text-black'}`}
          >
            {translateStatusToSpanish(status)}
          </Badge>
        ))}
      </div>
      <div className={`w-full grid grid-cols-1 gap-4 ${(!(paginatedAppointments.length > 0) || (currentPage === totalPages)) ? "md:grid-cols-1" : "md:grid-cols-2"}  `}>
        {paginatedAppointments.length > 0 
        ?
         paginatedAppointments.map((appointment) => {
          console.log("🚀 ~ appointment:", appointment.id);
          return (
            <>
              <AlertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => {}}
                loading={isLoading}
              />
              <div
                key={appointment.id}
                className="flex flex-col rounded-lg border border-gray-200 bg-background p-6 shadow-md"
              >
                <div className="mb-2 text-lg font-bold text-primary">
                  {capitalizeFirstLetter(
                    appointment.date.toLocaleDateString("es-ES", {
                      weekday: "long",
                    }),
                  )}{" "}
                  {appointment.date.toLocaleDateString("es-ES")}
                </div>
                <div className="text-text mb-2">
                  <span className="font-semibold">Hora:</span>{" "}
                  {appointment.startTime}
                </div>

                <div className="text-text mb-2 font-semibold">
                  Estado: {translateStatusToSpanish(appointment.status)}
                </div>
                {appointment.status !== "CANCELED" && appointment.status === "COMPLETED" && (
                  <Button
                    onClick={() => {
                      handleDeleteAppointment(appointment.id);
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </>
          );
        })
        :
        <div className="flex flex-col justify-center w-full rounded-lg border border-gray-200 bg-background p-6 shadow-md">
          <span className="font-semibold text-center">No hay turnos pendientes</span>
        </div>
    }
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md bg-primary px-4 py-2 text-white disabled:opacity-50"
        >
          <ChevronLeft />
        </Button>
        <span className="text-text">{`${currentPage} de ${totalPages}`}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md bg-primary px-4 py-2 text-white disabled:opacity-50"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default PaginatedAppointments;

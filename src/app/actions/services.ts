"use server"

import { db } from "@/server/db";
import { Appointment, Service, ServiceAvailability } from "@prisma/client";

export type ServiceWithAvailability = Service & {
  availableTimes: ServiceAvailability[]; // Replace 'any' with your actual ServiceAvailability type
  appointments: Appointment[]; // Replace 'any' with your actual Appointment type
}

type SuccessResponse = {
  status: 200;
  data: ServiceWithAvailability[];
}

type ErrorResponse = {
  status: 500;
  message: string;
}

type ServicesResponse = SuccessResponse | ErrorResponse

export const getAllServices = async (date: Date): Promise<ServicesResponse> => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const dayOfWeek = date.getDay() ;
    console.log("🚀 ~ getAllServices ~ dayOfWeek:", dayOfWeek)


    const services = await db.service.findMany({
      include: {
        availableTimes: {
          where: {
            dayOfWeek:{
              has: dayOfWeek
            },
          },
        },
        appointments: {
          where: {
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return {
      status: 200,
      data: services,
    };
  } catch (error) {
    console.error("Error in getAllServices:", error);
    return {
      status: 500,
      message: `Error al obtener servicios`,
    };
  }
}

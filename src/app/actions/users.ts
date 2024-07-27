"use server"
import { User, PrismaClient, Appointment } from '@prisma/client'
import { setToken } from './auth' // Assuming this function exists
import { db } from '@/server/db'
import { addDays } from 'date-fns'


// Types
type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'| "email" | "role">

type UserWithToken = User & { token: string }

type UserWithAppointments = User & { appointments: Appointment[] }

type SuccessResponse<T> = {
  status: 200 | 201;
  data: T;
  message?: string;
}

type ErrorResponse = {
  status: 400 | 404 | 500;
  message: string;
}

type CreateUserResponse = SuccessResponse<UserWithToken> | ErrorResponse
type UserResponse = SuccessResponse<User | null> | ErrorResponse
type UserResponseWithAppointments = SuccessResponse<UserWithAppointments | null> | ErrorResponse


// Helper function to create error responses
function createErrorResponse(status: 400 | 404 | 500, message: string): ErrorResponse {
  return { status, message }
}

// Create or login user
export const create_user = async (input: NewUser): Promise<CreateUserResponse> => {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { phone: input.phone }
    });

    if (existingUser) {
      // User exists, generate token and return
      const token = await setToken(existingUser.phone);
      if (!token) {
        return createErrorResponse(500, "Error al generar el token");
      }
      return {
        status: 200,
        data: { ...existingUser, token },
        message: "Usuario existente, inicio de sesión exitoso"
      };
    }

    // Create new user
    const newUser = await db.user.create({
      data: input
    });

    // Generate token for new user
    const token = await setToken(newUser.phone);
    if (!token) {
      return createErrorResponse(500, "Error al generar el token para el nuevo usuario");
    }

    return {
      status: 201,
      data: { ...newUser, token },
      message: "Nuevo usuario creado exitosamente"
    };

  } catch (error) {
    console.error("Error en create_user:", error);
    return createErrorResponse(500, `Error al procesar la solicitud: ${error instanceof Error ? error.message : String(error)}`);
  }
}



export const get_user_phone = async (phone: string): Promise<UserResponse> => {
    try {
      const user = await db.user.findUnique({
        where: { phone }
      });
  
      if (user) {
        return {
          status: 200,
          data: user
        };
      } else {
        return {
          status: 404,
          message: "Usuario no encontrado"
        };
      }
    } catch (error) {
      console.error("Error en get_user_email:", error);
      return {
        status: 500,
        message: `Error al buscar usuario: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

export const get_user_phone_whit_apointments = async (phone: string): Promise<UserResponseWithAppointments> => {
    try {
      const user = await db.user.findUnique({
        where: { phone },
        include: {
          appointments: {
            orderBy: {
              date: "desc"
            }
          }
        }
      });
  
      if (user) {
        return {
          status: 200,
          data: user
        };
      } else {
        return {
          status: 404,
          message: "Usuario no encontrado"
        };
      }
    } catch (error) {
      console.error("Error en get_user_email:", error);
      return {
        status: 500,
        message: `Error al buscar usuario: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

 export async function checkUpcomingAppointments(userId: string): Promise<boolean> {
    const today = new Date();
    const fifteenDaysLater = addDays(today, 15);
  
    const appointments = await db.appointment.findMany({
      where: {
        userId: userId,
        date: {
          gte: today,
          lte: fifteenDaysLater
        },
        NOT: {
          status: "CANCELED"
        }
      }
    });
  
    return appointments.length > 0;
  }
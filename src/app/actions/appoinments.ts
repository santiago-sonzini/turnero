"use server"
import { Prisma } from '@prisma/client';
import { db } from "@/server/db";

import { Appointment, PrismaClient } from '@prisma/client'


// Response types
type SuccessResponse<T> = {
  status: 200 | 201 | 204;
  data: T;
  message?: string;
}

type ErrorResponse = {
  status: 400 | 404 | 500;
  message: string;
}

type CrudResponse<T> = SuccessResponse<T> | ErrorResponse

// Helper function to create error responses
function createErrorResponse(status: 400 | 404 | 500, message: string): ErrorResponse {
  return { status, message }
}

// Create
export async function createAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | "status">): Promise<CrudResponse<Appointment>> {
  try {
    const appointment = await db.appointment.create({
      data: appointmentData,
    })
    return {
      status: 201,
      data: appointment,
      message: 'Appointment created successfully',
    }
  } catch (error) {
    return createErrorResponse(500, `Failed to create appointment: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Read
async function getAppointment(id: string): Promise<CrudResponse<Appointment>> {
  try {
    const appointment = await db.appointment.findUnique({
      where: { id },
    })
    if (!appointment) {
      return createErrorResponse(404, 'Appointment not found')
    }
    return {
      status: 200,
      data: appointment,
    }
  } catch (error) {
    return createErrorResponse(500, `Failed to retrieve appointment: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Update
async function updateAppointment(id: string, updateData: Partial<Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>>): Promise<CrudResponse<Appointment>> {
  try {
    const updatedAppointment = await db.appointment.update({
      where: { id },
      data: updateData,
    })
    return {
      status: 200,
      data: updatedAppointment,
      message: 'Appointment updated successfully',
    }
  } catch (error) {
    return createErrorResponse(500, `Failed to update appointment: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Delete
async function deleteAppointment(id: string): Promise<CrudResponse<null>> {
  try {
    await db.appointment.delete({
      where: { id },
    })
    return {
      status: 204,
      data: null,
      message: 'Appointment deleted successfully',
    }
  } catch (error) {
    return createErrorResponse(500, `Failed to delete appointment: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// List (with pagination)
type PaginatedAppointments = {
  appointments: Appointment[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

async function listAppointments(page: number = 1, pageSize: number = 10): Promise<CrudResponse<PaginatedAppointments>> {
  try {
    const skip = (page - 1) * pageSize
    const [appointments, totalCount] = await Promise.all([
      db.appointment.findMany({
        skip,
        take: pageSize,
        orderBy: { date: 'asc' },
      }),
      db.appointment.count(),
    ])
    
    return {
      status: 200,
      data: {
        appointments,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      },
    }
  } catch (error) {
    return createErrorResponse(500, `Failed to list appointments: ${error instanceof Error ? error.message : String(error)}`)
  }
}
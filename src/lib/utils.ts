import { AppointmentStatus } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addDays(date: Date, days: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);  // Set to start of day for accurate comparison
  
  const isTodayOrFuture = date >= today;

  if (isTodayOrFuture && days < 0) {
    return date
  }
  
  return new Date(
    date.valueOf()                 // convert to milliseconds
    + days * 24 * 60 * 60 * 1000   // add number of days in milliseconds
  )
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function addMinutesToTime(timeString: string, minutesToAdd: number): string|null {
  // Parse the input time string
  const [hoursStr, minutesStr] = timeString.split(':');
 if (hoursStr && minutesStr) {
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error('Invalid time format. Expected "HH:mm"');
  }
  
  // Convert everything to minutes
  let totalMinutes = hours * 60 + minutes + minutesToAdd;
  
  // Handle overflow
  totalMinutes = totalMinutes % (24 * 60);  // Wrap around at midnight
  
  // Convert back to hours and minutes
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  
  // Format the result
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
 } else {
   return null
 }
}


export function translateStatusToSpanish(status: AppointmentStatus): string {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return "Programado";
    case AppointmentStatus.CONFIRMED:
      return "Confirmado";
    case AppointmentStatus.CANCELED:
      return "Cancelado";
    case AppointmentStatus.COMPLETED:
      return "Completado";
    default:
      return "Estado desconocido";
  }
}
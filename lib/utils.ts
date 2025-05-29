import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function laravelBcryptToNode(hash: string): string {
  // Convierte hash $2y$ de Laravel a $2a$ para Node.js
  return hash.replace(/^\$2y(.+)$/i, '$2a$1');
}

/**
 * Convierte un valor decimal de Excel (fracción de día) a string formato "HH:mm".
 * Si el valor ya es string con formato HH:mm, lo retorna igual.
 * Si el valor es inválido, retorna null.
 */
export function excelTimeToHHMM(value: any): string | null {
  if (typeof value === "number" && !isNaN(value)) {
    const totalMinutes = Math.round(value * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
  if (typeof value === "string" && /^\d{1,2}:\d{2}$/.test(value)) {
    return value;
  }
  return null;
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function laravelBcryptToNode(hash: string): string {
  // Convierte hash $2y$ de Laravel a $2a$ para Node.js
  return hash.replace(/^\$2y(.+)$/i, '$2a$1');
}

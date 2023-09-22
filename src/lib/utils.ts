import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const MOOD_INTENSITY = ["low", "moderate", "high"]
export const TEMPO = ["slow", "moderate", "fast"]
export const GENRE = ["rock", "pop", "classical", "jazz", "ambient", "electronic", "hip-hop"]

export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

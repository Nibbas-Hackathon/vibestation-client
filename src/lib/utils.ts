import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const MOOD_INTENSITY = ["low", "moderate", "high"]
export const TEMPO = ["slow", "moderate", "fast"]
export const GENRE = ["rock", "pop", "classical", "jazz", "ambient", "electronic", "hip-hop"]

export function dataURLtoBlob(dataURL: any) {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const byteCharacters = atob(parts[1]);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

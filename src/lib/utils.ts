import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { gradients } from "@/styles/gradients";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomGradient() {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex] ?? "from-blue-400 to-blue-600";
}

export function getFirstLetter(string: string) {
  return string.charAt(0).toUpperCase();
}

export function formatString(string: string) {
  return string.toLowerCase().replace(/\s/g, "-");
}

export function removeLanguageFromUrl(url: string): string {
  return url.replace(/^\/[a-z]{2}\//, "/");
}

export function getLastSegmentFromUrl(url: string): string {
  const segments = url.split("/");
  return segments.pop() ?? "";
}

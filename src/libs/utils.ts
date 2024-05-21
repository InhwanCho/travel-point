import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterArray = (arr: (string | null)[]): string[] => {
  return arr.filter((item): item is string => item !== null && item !== '');
};

// Marking as Server Actions to allow these functions to be called securely from the browser.
"use server";

// Next.js helper to interact with the request/response cookies.
import { cookies } from "next/headers";

// Check if a specific cookie exists and return its value (e.g., for showing notifications on page load).
export const getCookieByKey = async (key: string) => {
  const cookie = (await cookies()).get(key);

  return cookie?.value ?? null;
};

export const setCookieByKey = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};

// Necessary to clear the cookie after consumption to prevent duplicate notifications on subsequent page renders.
export const deleteCookieByKey = async (key: string) => {
  (await cookies()).delete(key);
};

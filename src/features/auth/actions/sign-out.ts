"use server";

import { redirect } from "next/navigation";
import { invalidateSession } from "@/lib/lucia";
import { signInPath } from "@/paths";
import { getAuth } from "../queries/get-auth";
import { deleteSessionCookie } from "../utils/session-cookie";

export const signOut = async () => {
  // we get the session returned from the getAuth function.
  // getAuth also returns the user but we only need the session
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  // this invalidates the session in the db
  await invalidateSession(session.id);

  // clear the session cookie in the browser
  await deleteSessionCookie();

  redirect(signInPath());
};

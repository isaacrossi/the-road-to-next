"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/lucia";
import { signInPath } from "@/paths";
import { getAuth } from "../queries/get-auth";

export const signOut = async () => {
  // we get the session returned from the getAuth function.
  // getAuth also returns the user but we only need the session
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  // this invalidates the session in the db
  await lucia.invalidateSession(session.id);

  // create a new session cookie
  const sessionCookie = lucia.createBlankSessionCookie();

  const cookiesStore = await cookies();
  // set the cookie for the user as the blank cookie
  cookiesStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect(signInPath());
};

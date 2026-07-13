"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "@/lib/lucia";

export const getAuth = cache(async () => {
  // we can get the session from the cookies using the next cookies api
  // we get the cookie with a key provided by lucia
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get(lucia.sessionCookieName)?.value ?? null;

  // when we call getAuth and theres no active session
  // for this user we return an empty user and session object
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  // if there is a session id we call lucias validate session function which will return us either the user
  // and session or an error if the session is invalid (ex. expired)
  const result = await lucia.validateSession(sessionId);

  try {
    // if there is a session and its no expired
    if (result.session && result.session.fresh) {
      // create a new session with same session id. i.e replace the old session with the new session
      // in the db. We are refreshing our cookie so that it gets an new expiry date
      // otherwise the cookie would expire at some point and the user be locked out even if
      // the session in the db is valid. This also helps against cookie hijacking
      // by ensuring that the session cookies don't live forever
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      // set the cookie for the user
      cookiesStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    // if there is no session
    if (!result.session) {
      // create a new session for the user
      const sessionCookie = lucia.createBlankSessionCookie();
      // set the cookie for the user
      cookiesStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // do nothing if used in a RSC
  }

  return result;
});

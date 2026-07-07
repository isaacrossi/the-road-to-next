"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signInSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
  password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    // get user from db where the email matches our user
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // if the user doesn't exist return error
    if (!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    // check if user shares the same password that the user has put into the form
    // we use argons verify function for this so can compare the hash againts the regular password
    // we pass passwordHash because that is what is stored in the db
    const validPassword = await verify(user.passwordHash, password);

    // if no valid password return an error
    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }
    // creating the session (with no additional data since we don't need anything else at the moment)
    const session = await lucia.createSession(user.id, {});

    // create a session cookie to persist the session for the user
    const sessionCookie = lucia.createSessionCookie(session.id);

    // setting the cookie with the next js cookie api
    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};

"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { hashPassword } from "@/features/password/utils/hash-and-verify";
import { createSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { generateRandomToken } from "@/utils/crypto";
import { setSessionCookie } from "../utils/session-cookie";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      // matches default max in prisma schema
      .max(191)
      // ensure no spaces in username
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces",
      ),
    // min 1 ensures that the user can't submit an empty string
    // matches default max in prisma schema. Email is a helper function from zod to check for @ etc.
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  // get password and confirm password from signUpSchema and compare them
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// takes our action state even though we don't use it (prevents issues when using useActionState hook) and our form data from our form
export const signUp = async (_actionState: ActionState, formData: FormData) => {
  // will check for confirmed password in validation schema
  // username, email, password are the entries we want to store in our database. confirmPassword is just for validation.
  try {
    const { username, email, password } = signUpSchema.parse(
      // shortcut to get object from formData
      Object.fromEntries(formData),
    );

    const passwordHash = await hashPassword(password);

    // using our prisma client to create a new user in our database
    // notice password is passwordHash not password.
    // This ensures we don't store plain passwords
    // and also in our schema it says passwordHash in our User model
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }

    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};

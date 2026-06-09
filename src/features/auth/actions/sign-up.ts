"use server";

import { z } from "zod";
import { ActionState } from "@/components/form/utils/to-action-state";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";

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

  try {
    const { username, email, password } = signUpSchema.parse(
      // shortcut to get object from formData
      Object.fromEntries(formData),
    );

    // TODO store in database
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Sign up successful");
};

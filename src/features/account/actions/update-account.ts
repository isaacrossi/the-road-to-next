"use server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

const updateAccountSchema = z.object({
  username: z
    .string()
    .min(1)
    // matches default max in prisma schema
    .max(191)
    // ensure no spaces in username
    .refine((value) => !value.includes(" "), "Username cannot contain spaces"),
  firstName: z.string().min(1).max(191),
  lastName: z.string().min(1).max(191),
});

export const updateAccount = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const { username, firstName, lastName } = updateAccountSchema.parse(
      Object.fromEntries(formData),
    );
    await prisma.user.update({
      where: { id: user.id },
      data: { username, firstName, lastName },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        status: "ERROR",
        message: "",
        fieldErrors: {
          username: ["Username is already in use"],
        },
        payload: formData,
        timestamp: Date.now(),
      } as ActionState;
    }

    return fromErrorToActionState(error, formData);
  }

  revalidatePath("/", "layout");

  return toActionState("SUCCESS", "Account updated");
};

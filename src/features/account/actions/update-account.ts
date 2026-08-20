"use server";
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
});

export const updateAccount = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = updateAccountSchema.parse({
      username: formData.get("username"),
    });
    await prisma.user.update({
      where: { id: user.id },
      data: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath("/", "layout");

  return toActionState("SUCCESS", "Account updated");
};

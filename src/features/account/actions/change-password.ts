"use server";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import {
  hashPassword,
  verifyPasswordHash,
} from "@/features/password/utils/hash-and-verify";
import { prisma } from "@/lib/prisma";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(6).max(191),
    confirmNewPassword: z.string().min(6).max(191),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });

export const changePassword = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(
      Object.fromEntries(formData),
    );

    const isCurrentPasswordCorrect = await verifyPasswordHash(
      user.passwordHash,
      currentPassword,
    );

    if (!isCurrentPasswordCorrect) {
      return {
        status: "ERROR",
        message: "",
        fieldErrors: {
          currentPassword: ["Incorrect current password"],
        },
        payload: formData,
        timestamp: Date.now(),
      } as ActionState;
    }

    const passwordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Password updated");
};

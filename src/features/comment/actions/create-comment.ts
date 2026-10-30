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
import { ticketPath } from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  id: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  // need to define it outside the try catch block so it can be accessed on a wider level
  // namely in the return statement
  let comment;

  try {
    const data = createCommentSchema.parse({
      content: formData.get("content"),
    });

    comment = await prisma.comment.create({
      data: {
        ...data,
        userId: user.id,
        ticketId: id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketPath(id));

  return toActionState("SUCCESS", "comment created", undefined, {
    ...comment,
    isOwner: true,
  });
};

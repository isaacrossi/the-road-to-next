"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";

type CommentCreateFormProps = {
  ticketId: string;
  // optional because if we are using this from in a server component the cache will revalidate anyway
  onCreateComment?: (comment: CommentWithMetadata) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  // we were able to include the result from our server action in the action state and use it in there
  // for the onCreateComment callback handler
  const handleSuccess = (actionState: ActionState) => {
    onCreateComment?.(actionState.data as CommentWithMetadata);
  };

  return (
    // we  tap into the forms optional onSuccess handler previously defined
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind..." />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label="Comment" />
    </Form>
  );
};

export { CommentCreateForm };

"use client";

import { useActionState } from "react";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";

type CommentCreateFormProps = {
  id: string;
};

const CommentCreateForm = ({ id }: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, id),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Textarea id="content" name="content" placeholder="leave a comment" />
      <SubmitButton label="post comment" />
    </Form>
  );
};

export { CommentCreateForm };

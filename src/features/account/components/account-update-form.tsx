"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAccount } from "../actions/update-account";

const AccountUpdateForm = () => {
  const [actionState, action] = useActionState(
    updateAccount,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input type="text" id="username" name="username"></Input>
      <FieldError actionState={actionState} name="username" />
      <SubmitButton label="Update Account" />
    </Form>
  );
};

export { AccountUpdateForm };

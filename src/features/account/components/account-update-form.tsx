"use client";

import { User as AuthUser } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAccount } from "../actions/update-account";

type AccountUpdateFormProps = { user: AuthUser };

const AccountUpdateForm = ({ user }: AccountUpdateFormProps) => {
  const router = useRouter();
  const [actionState, action] = useActionState(
    updateAccount,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form
      action={action}
      actionState={actionState}
      onSuccess={() => {
        window.dispatchEvent(new Event("auth-changed"));
        router.refresh();
      }}
    >
      <Label htmlFor="username">Username</Label>
      <Input
        type="text"
        id="username"
        name="username"
        defaultValue={user.username}
      ></Input>
      <FieldError actionState={actionState} name="username" />
      <SubmitButton label="Update Account" />
    </Form>
  );
};

export { AccountUpdateForm };

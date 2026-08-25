"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "../actions/change-password";

export const AccountPasswordForm = () => {
  const [actionState, action] = useActionState(
    changePassword,
    EMPTY_ACTION_STATE,
  );
  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="currentPassword">Current Password</Label>
      <Input type="password" id="currentPassword" name="currentPassword" />
      <FieldError actionState={actionState} name="currentPassword" />

      <Label htmlFor="newPassword">New Password</Label>
      <Input type="password" id="newPassword" name="newPassword" />
      <FieldError actionState={actionState} name="newPassword" />

      <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
      <Input
        type="password"
        id="confirmNewPassword"
        name="confirmNewPassword"
      />
      <FieldError actionState={actionState} name="confirmNewPassword" />

      <SubmitButton label="Update Password" />
    </Form>
  );
};

// using a hook
"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/actions/sign-up";

const SignUpForm = () => {
  // passing in our sign-up action and initial state
  // we have access to the returned action state of our signUp action with actionState
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    // our custom Form component gives us our styling and will also show a toast message on error or success
    <Form action={action} actionState={actionState}>
      <Input
        name="username"
        placeholder="username"
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} name="username" />

      <Input
        name="email"
        placeholder="email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />

      <Input
        name="password"
        placeholder="password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };

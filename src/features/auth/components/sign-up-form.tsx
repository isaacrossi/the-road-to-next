// using a hook
"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
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
      <Input name="username" placeholder="username" />
      <FieldError actionState={actionState} name="username" />

      <Input name="email" placeholder="email" />
      <FieldError actionState={actionState} name="email" />

      <Input name="password" placeholder="password" type="password" />
      <FieldError actionState={actionState} name="password" />

      <Input
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };

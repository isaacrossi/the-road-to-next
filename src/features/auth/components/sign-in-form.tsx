"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signIn } from "../actions/sign-in";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="email"
        placeholder="Email"
        // this is to preserver the email after the page reloads
        // due to the user having made an error with the other parts of the form
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        // this is to preserver the password after the page reloads
        // due to the user having made an error with the other parts of the form
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };

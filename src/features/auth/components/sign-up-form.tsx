// using a hook
"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/features/auth/actions/sign-up";

const SignUpForm = () => {
  // passing in our sign-up action and initial state
  // we have access to the returned action state of our signUp action with actionState
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    // our custom Form component gives us our styling and will also show a toast message on error or success
    <Form action={action} actionState={actionState}>
      <div className="flex flex-row space-x-2 space-y-2">
        <div>
          <Label htmlFor="firstName" className="mb-2">
            First Name
          </Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="first name"
            defaultValue={actionState.payload?.get("firstName") as string}
          ></Input>
          <FieldError actionState={actionState} name="firstName" />
        </div>
        <div>
          <Label htmlFor="lastName" className="mb-2">
            Last Name
          </Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="last name"
            defaultValue={actionState.payload?.get("lastName") as string}
          ></Input>
          <FieldError actionState={actionState} name="username" />
        </div>
      </div>

      <Label htmlFor="username">Username</Label>
      <Input
        name="username"
        placeholder="username"
        defaultValue={actionState.payload?.get("username") as string}
        className="mb-2"
      />
      <FieldError actionState={actionState} name="username" />

      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        placeholder="email"
        defaultValue={actionState.payload?.get("email") as string}
        className="mb-2"
      />
      <FieldError actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        placeholder="password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
        className="mb-2"
      />
      <FieldError actionState={actionState} name="password" />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
        className="mb-2"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };

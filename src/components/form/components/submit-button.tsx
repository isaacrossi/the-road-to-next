"use client";

import clsx from "clsx";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../../ui/button";

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement<{ className?: string }>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

const SubmitButton = ({ label, icon, variant, size }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {label}
      {pending && (
        <LucideLoaderCircle
          className={clsx("h-4 w-4 animate-spin", {
            "mr-2": !!label,
          })}
        />
      )}
      {/* This is a React pattern where the caller passes an element prop as opposed to a component reference.
          We clone the element to inject the sizing classes, while preserving any custom props/styles 
          set by the caller without needing to define and pass them down. */}
      {pending ? null : icon ? (
        <span
          className={clsx({
            // only apply margin-left if there is a label.
            // We have to flip the label to a boolean to please typescript
            // as it expects label to be a string not a truthy value.
            // Then we flip it back to its original truthy value
            "ml-2": !!label,
          })}
        >
          {cloneElement(icon, {
            className: "h-4 w-4",
          })}
        </span>
      ) : null}
    </Button>
  );
};

export { SubmitButton };

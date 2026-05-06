import { flattenError, ZodError } from "zod";

export type ActionState = {
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  payload?: FormData;
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    return {
      message: "",
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  } else {
    return {
      message: "An unknown error occurred.",
      fieldErrors: {},
      payload: formData,
    };
  }
};

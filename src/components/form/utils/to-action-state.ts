import { flattenError, ZodError } from "zod";

// make ActionState a generic with a type default of unknown and then data is our provided generic
export type ActionState<T = unknown> = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  payload?: FormData;
  timestamp: number;
  data?: T;
};

// `never` data makes this assignable to ActionState<T> for any T
export const EMPTY_ACTION_STATE: ActionState<never> = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToActionState = <T = unknown>(
  error: unknown,
  formData?: FormData,
): ActionState<T> => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occurred.",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

export const toActionState = <T = unknown>(
  status: ActionState["status"],
  message: string,
  formData?: FormData,
  data?: T,
): ActionState<T> => {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
    data,
  };
};

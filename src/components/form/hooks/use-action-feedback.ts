import { useEffect, useRef } from "react";
import { ActionState } from "@/src/components/form/utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (args: OnArgs) => void;
  onError?: (args: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const prevTimestamp = useRef(actionState.timestamp);

  useEffect(() => {
    if (actionState.timestamp === prevTimestamp.current) {
      return;
    }

    prevTimestamp.current = actionState.timestamp;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
  }, [actionState, options]);
};

export { useActionFeedback };

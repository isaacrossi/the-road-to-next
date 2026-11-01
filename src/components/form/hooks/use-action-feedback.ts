import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs<T> = {
  actionState: ActionState<T>;
};

type UseActionFeedbackOptions<T> = {
  onSuccess?: (args: OnArgs<T>) => void;
  onError?: (args: OnArgs<T>) => void;
};

const useActionFeedback = <T,>(
  actionState: ActionState<T>,
  options: UseActionFeedbackOptions<T>,
) => {
  const prevTimestamp = useRef(actionState.timestamp);

  useEffect(() => {
    const isUpdate = actionState.timestamp !== prevTimestamp.current;

    if (!isUpdate) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options]);
};

export { useActionFeedback };

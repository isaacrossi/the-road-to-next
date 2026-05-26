import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePencil />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

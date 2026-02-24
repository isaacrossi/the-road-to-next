import { LucideIcon, LucideMessageSquareWarning } from "lucide-react";
import React from "react";

type PlaceholderProps = {
  label: string;
  Icon?: LucideIcon;
  button?: React.ReactNode;
};

const Placeholder = ({
  label,
  Icon = LucideMessageSquareWarning,
  button = null,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      <Icon className="w-16 h-16" />
      <h2 className="text-lg text-center">{label}</h2>
      <div className="h-10 flex items center- justify-center">{button}</div>
    </div>
  );
};

export { Placeholder };

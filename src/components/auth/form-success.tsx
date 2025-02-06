import { CircleCheck } from "lucide-react";
import React from "react";

interface FormSuccessPRops {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessPRops) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-400">
      <CircleCheck className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

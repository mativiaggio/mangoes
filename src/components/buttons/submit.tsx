"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Stars } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  label?: string;
}

export function Submit({
  isLoading,
  className,
  label = "Guardar",
  ...props
}: SubmitProps) {
  return (
    <Button
      disabled={isLoading}
      className={cn(
        "w-28 overflow-hidden", // Ancho fijo
        className
      )}
      {...props}>
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              // exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center">
              <span className="flex gap-2 items-center">
                {label} <Stars />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
}

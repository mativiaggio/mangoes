/* eslint-disable @typescript-eslint/no-unused-expressions */
import { X, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ErrorAlertProps {
  title: string;
  message: string;
  onClose?: () => void;
  timeToClose?: number;
}

export function ErrorAlert({
  title,
  message,
  onClose,
  timeToClose,
}: ErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsVisible(false);
        onClose && onClose();
      },
      timeToClose ? timeToClose : 15000
    );

    return () => clearTimeout(timer);
  }, [onClose, timeToClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 w-full max-w-sm animate-in slide-in-from-top-2 duration-300 z-50">
      <div className="bg-red-50 border-l-4 border-red-500 rounded-md shadow-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-bold text-red-800">{title}</p>
            <p className="text-sm font-medium text-red-800">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => {
                setIsVisible(false);
                onClose && onClose();
              }}
              className="bg-red-50 rounded-md inline-flex text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

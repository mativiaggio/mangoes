import { Loader } from "lucide-react";
import React from "react";

const LoadingAgencyPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default LoadingAgencyPage;

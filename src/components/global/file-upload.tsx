"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";

type Props = {
  //   apiEndpoint: "agencyLogo" | "avatar" | "subAccountLogo";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload = ({ onChange, value }: Props) => {
  // const type = value?.split(".").pop();

  // if (value) {
  //   return (
  //     <div className="flex flex-col justify-center items-center">
  //       {type !== "pdf" ? (
  //         <div className="relative w-40 h-40">
  //           <Image
  //             src={value}
  //             alt="uploaded image"
  //             className="object-contain"
  //             fill
  //           />
  //         </div>
  //       ) : (
  //         <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
  //           <FileIcon />
  //           <a
  //             href={value}
  //             target="_blank"
  //             rel="noopener_noreferrer"
  //             className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
  //             Ver PDF
  //           </a>
  //         </div>
  //       )}
  //       <Button variant={"ghost"} type="button" onClick={() => onChange("")}>
  //         <X className="h-4 w-4" />
  //         Eliminar logo
  //       </Button>
  //     </div>
  //   );
  // }
  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={`imageUploader`}
        appearance={{
          button: {
            background: "hsl(34, 95%, 49%)",
            color: "#FFF",
          },
          label: {
            color: "#FFF",
          },
        }}
        // onClientUploadComplete={(res) => {
        //   if (res && res[0]) {
        //     onChange(res[0].url); // Actualiza el valor del formulario con la URL
        //   }
        // }}
        // onUploadError={(error: Error) => {
        //   console.log(error);
        // }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          // onChange(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
        onChange={(acceptedFiles) => {
          // Do something with the accepted files
          console.log("Accepted files: ", acceptedFiles);
          onChange(acceptedFiles[0].name);
        }}
      />
    </div>
  );
};

export default FileUpload;

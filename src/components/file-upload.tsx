"use client";
import { FileIcon, Loader, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "./ui/button";
import { deleteFile } from "@/app/api/uploadthing/deleteFile";
import { useToast } from "@/hooks/use-toast";

type Props = {
  apiEndpoint:
    | "agencyLogo"
    | "avatar"
    | "subaccountLogo"
    | "products"
    | "websiteLogo";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const [deletingFile, setDeletingFile] = useState(false);
  const type = value?.split(".").pop();

  const { toast } = useToast();

  if (value) {
    const handleDelete = async () => {
      try {
        const fileKey = value?.split("/").pop();
        console.log(fileKey);

        if (!fileKey) {
          toast({
            title: "Error",
            description: "No se pudo eliminar el archivo.",
            variant: "destructive",
          });
          return;
        }

        setDeletingFile(true);
        await deleteFile(fileKey);

        toast({
          title: "Archivo eliminado",
          description:
            "El archivo se eliminó correctamente. Todavía debes guardar el registro.",
          variant: "success",
        });

        onChange(""); // Limpia el estado del archivo
        setDeletingFile(false);
      } catch (error) {
        console.error("Error eliminando el archivo:", error);
        alert("Hubo un error eliminando el archivo. Intenta nuevamente.");
      }
    };

    return (
      <div className="flex flex-col justify-center items-center">
        {type !== "pdf" ? (
          <div className="flex justify-center items-center w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mt-4 md:mt-0">
            <div className="relative w-40 h-40">
              <Image
                src={value}
                alt="uploaded image"
                className="object-contain"
                fill
              />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-main-secondary hover:underline">
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={handleDelete}
          variant="ghost"
          type="button"
          disabled={deletingFile}>
          {deletingFile ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Eliminando
            </>
          ) : (
            <>
              <X className="h-4 w-4" />
              Eliminar Imagen
            </>
          )}
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        className="uploadthing-custom-class"
        endpoint={apiEndpoint}
        content={{
          button: "Subir archivo",
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          onChange(res?.[0].url);
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
        }}
      />
    </div>
  );
};

export default FileUpload;

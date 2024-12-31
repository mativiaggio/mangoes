"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function RedirectingPage() {
  useEffect(() => {
    // Aquí puedes añadir la lógica para redirigir al usuario después de un tiempo
    // Por ejemplo:
    // const timer = setTimeout(() => router.push('/destino'), 5000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br w-full p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-main-oranger mb-4">
          Redirigiendo
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Por favor, espera un momento...
        </p>
      </div>

      <div className="w-64 h-64 relative mb-8">
        <Image
          src="/static/svg/redirecting.svg"
          alt="Redirecting"
          layout="fill"
        />
      </div>

      <Loader2 className="w-12 h-12 text-main-oranger animate-spin" />
    </div>
  );
}

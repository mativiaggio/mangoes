"use client";
import { CompleteWebsiteInfo } from "@/database/website/types";
import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";
import ContactForm from "../_components/contact-form";
type Props = {
  website: CompleteWebsiteInfo;
};
export default function DefaultContactPage({ website }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar website={website} />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>
          <p className="mb-8 text-gray-600">
            ¿Tienes alguna pregunta o comentario? No dudes en dejarnos un
            mensaje.
          </p>
          <div className="flex justify-center">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer website={website} />
    </div>
  );
}

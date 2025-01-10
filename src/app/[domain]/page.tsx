import { notFound } from "next/navigation";
import { getWebsiteByDomain } from "@/lib/queries";
import React from "react";
import HomeDefault from "@/templates/default/home";
import { CompleteWebsiteInfo } from "@/lib/types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ domain: string }>;
};

const templateComponents: Record<
  string,
  React.FC<{ website: CompleteWebsiteInfo }> | undefined
> = {
  DEFAULT: HomeDefault,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const domain = (await params).domain.slice(0, -1);
  const website = await getWebsiteByDomain(domain);

  if (!website) {
    return {
      title: "Página no encontrada",
      description: "El dominio especificado no corresponde a ninguna página.",
    };
  }

  return {
    title: website.name,
    description: website.description,
    authors: [{ name: "Matías Viaggio" }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: `https://${website.domain}.mangoes.com.ar/`,
      title: website.name,
      description: website.description,
      images: [
        {
          url: website.websiteLogo,
          width: 1200,
          height: 630,
          alt: website.name,
        },
      ],
      siteName: website.name,
    },
    twitter: {
      card: "summary_large_image",
      title: website.name,
      description: website.description,
      images: [website.websiteLogo],
    },
    icons: {
      icon: website.websiteLogo, // Ícono principal
      shortcut: website.websiteLogo, // Ícono para accesos directos
      apple: website.websiteLogo, // Ícono para dispositivos Apple
    },
  };
}

const Page = async ({ params }: Props) => {
  const domain = (await params).domain.slice(0, -1);

  const website = await getWebsiteByDomain(domain);

  // Si no se encuentra el dominio, redirigir a 404
  if (!website) return notFound();

  // Obtener el componente correspondiente al template
  const TemplateComponent = templateComponents[website.template];

  // Renderizar el componente o mostrar error
  if (TemplateComponent) {
    return <TemplateComponent website={website} />;
  }

  return <div>Ocurrió un error</div>;
};

export default Page;

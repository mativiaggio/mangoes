import NotFound from "@/components/pages/not-found";
import { getWebsiteByDomain } from "@/lib/queries";
import { CompleteWebsiteInfo } from "@/lib/types";
import DefaultProductsPage from "@/templates/ecommerce/default/products/products";
import DefaultContactPage from "@/templates/ecommerce/default/contact/contact";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ domain: string; path: string }>;
};

const productsTemplate: Record<
  string,
  React.FC<{ website: CompleteWebsiteInfo }> | undefined
> = {
  DEFAULT: DefaultProductsPage,
};

const contactTemplate: Record<
  string,
  React.FC<{ website: CompleteWebsiteInfo }> | undefined
> = {
  DEFAULT: DefaultContactPage,
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
          url: website.Agency.agencyLogo,
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
      images: [website.Agency.agencyLogo],
    },
    icons: {
      icon: website.Agency.agencyLogo, // Ícono principal
      shortcut: website.Agency.agencyLogo, // Ícono para accesos directos
      apple: website.Agency.agencyLogo, // Ícono para dispositivos Apple
    },
  };
}

const Page = async ({ params }: Props) => {
  const domain = (await params).domain.slice(0, -1);
  const path = (await params).path;

  const website = await getWebsiteByDomain(domain);

  if (!website) return notFound();

  if (path === "products") {
    const TemplateComponent = productsTemplate[website.template];
    if (TemplateComponent) return <TemplateComponent website={website} />;
  }

  if (path === "contact") {
    const TemplateComponent = contactTemplate[website.template];
    if (TemplateComponent) return <TemplateComponent website={website} />;
  }

  return <NotFound />;
};

export default Page;

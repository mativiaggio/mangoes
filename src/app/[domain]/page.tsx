import { notFound } from "next/navigation";
import React from "react";
import EcommerceHomeDefault from "@/templates/ecommerce/default/home";
import RestaurantHomeDefault from "@/templates/restaurant/default/home";
import { CompleteWebsiteInfo } from "@/database/website/types";
import { Metadata } from "next";
import NotFound from "@/components/pages/not-found";
import { getWebsiteByDomain } from "@/database/website/queries";

type Props = {
  params: Promise<{ domain: string }>;
};

// Definir los componentes de templates organizados por industria
const TemplateComponents: Record<
  string,
  Record<string, React.FC<{ website: CompleteWebsiteInfo }> | undefined>
> = {
  ECOMMERCE: {
    DEFAULT: EcommerceHomeDefault,
  },
  RESTAURANT: {
    DEFAULT: RestaurantHomeDefault,
  },
};

// Función para obtener el componente correspondiente según industria y template
const getTemplateComponent = (
  industry: string,
  template: string
): React.FC<{ website: CompleteWebsiteInfo }> | undefined => {
  return TemplateComponents[industry]?.[template];
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
      icon: website.Agency.agencyLogo,
      shortcut: website.Agency.agencyLogo,
      apple: website.Agency.agencyLogo,
    },
  };
}

const Page = async ({ params }: Props) => {
  const domain = (await params).domain.slice(0, -1);
  const website = await getWebsiteByDomain(domain);

  // Si no se encuentra el dominio, redirigir a 404
  if (!website) return notFound();

  // Obtener el componente del template según industria y template
  const TemplateComponent = getTemplateComponent(
    website.industry,
    website.template
  );

  // Renderizar el componente o mostrar error si no existe
  if (TemplateComponent) {
    return <TemplateComponent website={website} />;
  }

  return <NotFound />;
};

export default Page;

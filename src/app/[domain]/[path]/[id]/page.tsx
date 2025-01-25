import { getWebsiteByDomain } from "@/lib/queries";
import { CompleteWebsiteInfo } from "@/lib/types";
import DefaultProductsPage from "@/templates/ecommerce/default/products/products";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ domain: string; path: string; id: string }>;
};

const templateComponents: Record<
  string,
  React.FC<{ website: CompleteWebsiteInfo }> | undefined
> = {
  DEFAULT: DefaultProductsPage,
};
const Page = async ({ params }: Props) => {
  const domain = (await params).domain.slice(0, -1);
  const path = (await params).path;

  const website = await getWebsiteByDomain(domain);

  if (!website) return notFound();

  if (path === "products") {
    const TemplateComponent = templateComponents[website.template];
    if (TemplateComponent) return <div>Pagina del producto</div>;
  }

  return <div>Ocurrió un error</div>;
};

export default Page;

"use client";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PricingSkeleton from "./_components/pricing-skeleton";
import { Check } from "lucide-react";
import { formatPriceToARS } from "@/lib/utils";
import { useGetPlans } from "@/features/plans/api/use-get-plans";

export default function Home() {
  const { data, isLoading } = useGetPlans();

  return (
    <>
      <PageWrapper className="!px-0 !pt-[54px]">
        <div className="min-h-screen bg-gradient-to-b from-[#fff8f0] to-white dark:from-main dark:to-main w-full">
          {/* Hero Section */}
          <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-[#e75b04] mb-6">
                Crea tu tienda online con Mangoes
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                La plataforma perfecta para pymes y emprendedores que quieren
                llevar su negocio al siguiente nivel
              </p>

              <div className="flex gap-2 items-center justify-center">
                <a href={"#pricing"}>
                  <Button className="bg-[#f48d06] hover:bg-[#e75b04] text-white text-lg py-6 px-8 rounded-full transition-colors duration-300">
                    Comenzar ya
                  </Button>
                </a>
                <a href={"#features"}>
                  <Button
                    variant={"ghost"}
                    className="!border-[#f48d06] hover:!border-[#e75b04] text-primary text-lg py-6 px-8 rounded-full transition-colors duration-300">
                    Saber más
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-16">
              <Image
                src="/static/images/landing-example.png"
                alt="Mangoes Dashboard"
                width={1366}
                height={1366}
                className="rounded-lg mx-auto"
              />
            </div>
          </section>

          {/* Features Section */}
          <section
            className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
            id="features">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#e75b04] mb-12">
              ¿Por qué elegir Mangoes?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Diseños profesionales",
                  description:
                    "Elige entre una variedad de templates prediseñadas y personalizables",
                  icon: "🎨",
                },
                {
                  title: "Fácil de usar",
                  description:
                    "Interfaz intuitiva que te permite crear y gestionar tu tienda sin conocimientos técnicos",
                  icon: "🚀",
                },
                {
                  title: "Soporte 24/7",
                  description:
                    "Nuestro equipo está siempre disponible para ayudarte en cada paso del camino",
                  icon: "🛟",
                },
                {
                  title: "Gestión de inventario",
                  description:
                    "Nuestro aplicación tiene integrada un sistema de gestión de inventario ideal para vos.",
                  icon: "📦",
                },
                {
                  title: "Órdenes de Compra/Venta",
                  description:
                    "Gestiona fácilmente todas tus órdenes de compra y venta llevando un control detallado de todos tus movimientos comerciales.",
                  icon: "📋",
                },
                {
                  title: "Comprobantes de Compra/Venta",
                  description:
                    "Genera comprobantes internos de compra y venta al instante para un registro organizado de tus transacciones.",
                  icon: "📄",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-[#f48d06] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-[#fff8f0] dark:bg-card rounded-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#e75b04] mb-12">
                Cómo funciona
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Crea tu cuenta",
                    description:
                      "Regístrate en Mangoes y elige el plan que mejor se adapte a tus necesidades",
                  },
                  {
                    step: "2",
                    title: "Personaliza tu tienda",
                    description:
                      "Selecciona una template y personalízala con tus productos y marca",
                  },
                  {
                    step: "3",
                    title: "¡Lanza tu negocio online!",
                    description:
                      "Publica tu tienda y empieza a vender a clientes de todo el país",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#f48d06] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-[#e75b04] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section
            className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
            id="pricing">
            <div className="w-full flex flex-col items-center">
              <h1 className="text-4xl md:text-2xl font-bold mb-2 text-center">
                Elige tu plan perfecto
              </h1>
              <p className="max-w-6xl text-sm mb-8 text-muted-foreground">
                Nuestros planes están diseñados para ofrecerte las herramientas
                y el soporte que necesitas para hacer crecer tu negocio. Ya sea
                que estés comenzando o busques expandir tu empresa, tenemos la
                opción perfecta para ti. Elige el plan que mejor se adapte a tus
                necesidades y empieza a disfrutar de los beneficios desde el
                primer día.
              </p>
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl w-full">
                  <PricingSkeleton />
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-6xl w-full">
                  {data?.plans.documents.map((plan) => (
                    <Card
                      key={plan.name}
                      className="w-full h-fit backdrop-blur-sm hover:shadow-xl border-0">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-main-oranger">
                          {plan.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold mb-4">
                          {formatPriceToARS(plan.price || 0)}/mes
                        </p>
                        <ul className="space-y-2">
                          {plan.features?.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="mr-2 h-5 w-5 text-main-oranger" />
                              <span className="text-sm text-primary">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/plans/${plan.$id}/checkout`}>
                          <Button className="w-full bg-main-orange hover:bg-main-oranger text-white">
                            Empezar ahora
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#e75b04] mb-6">
              ¿Todavía estas dudando?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explora las tiendas de los emprendedores que ya están creciendo
              con Mangoes
            </p>
            <Link href={"/stores"}>
              <Button className="bg-[#f48d06] hover:bg-[#e75b04] text-white text-lg py-6 px-8 rounded-full">
                Ver tiendas
              </Button>
            </Link>
          </section>
        </div>
      </PageWrapper>
    </>
  );
}

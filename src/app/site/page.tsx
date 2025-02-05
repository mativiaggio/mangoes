"use client";
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
import {
  Armchair,
  Check,
  ChevronRight,
  Drill,
  ShoppingBag,
} from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { formatPriceToARS } from "@/lib/utils";

export default function Home() {
  const { t } = useLanguage();
  const plans = [
    {
      id: 1,
      name: "Basic",
      description: "Perfecto para empezar",
      price: 9999.99,
      features: [
        "Acceso a funciones básicas",
        "Soporte por WhatsApp",
        "Hasta 20 productos/servicios",
      ],
    },
    {
      id: 2,
      name: "Premium",
      description: "Ideal para negocios en crecimiento",
      price: 19999.99,
      features: [
        "Todas las funciones de Basic",
        "Soporte prioritario",
        "Hasta 50 productos/servicios",
        "Acceso a funciones de inventario básicas",
        "Acceso a funciones de órdenes de compra/venta básicas",
      ],
    },
    {
      id: 3,
      name: "Enterprise",
      description: "Para grandes empresas",
      price: 49999.99,
      features: [
        "Todas las funciones de Premium",
        "Productos/servicios ilimitados",
        "Acceso completo a funciones de inventario",
        "Acceso completo a funciones de reportes y estadísticas",
        "Acceso  completo a funciones de órdenes de compra/venta",
        "Acceso  completo a funciones de comprobantes de compra/venta",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
        id="#home">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-main-secondary mb-6">
            {t.createYourOnlineStore}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t.perfectPlatform}
          </p>

          <div className="flex gap-2 items-center justify-center">
            <a href={"#pricing"}>
              <Button className="bg-main-primary hover:bg-main-secondary text-white text-lg py-6 px-8 rounded-full transition-colors duration-300">
                {t.startNow}
              </Button>
            </a>
            <Link href={"/agency"}>
              <Button
                variant={"ghost"}
                className="!border-main-primary hover:!border-main-secondary text-primary text-lg py-6 px-8 rounded-full transition-colors duration-300 flex justify-center items-center gap-2">
                {t.dashboard}
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <Image
            src="https://cdn.dribbble.com/userupload/17340975/file/original-8d77f6fac42fbb1dd9cf8ca86f982470.png?resize=1024x768&vertical=center"
            alt={t.dashboardImageAlt}
            width={1366}
            height={1366}
            className="rounded-lg mx-auto"
          />
        </div>
      </section>

      {/* Trusted */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-[#ebedee] dark:bg-card rounded-lg w-full flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-main-secondary">
            {t.someBusinessesUsing}
          </h2>
          <div className="flex justify-between items-center font-extrabold text-3xl w-full text-muted-foreground">
            <p className="flex gap-2 items-center">
              <Drill size={32} /> {t.toolsOtol}
            </p>
            <p className="flex gap-2 items-center">
              <ShoppingBag size={32} />
              {t.buyEverywhere}
            </p>
            <p className="flex gap-2 items-center">
              <Armchair size={32} />
              {t.deaconDesigner}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
        id="features">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-main-secondary mb-12">
          {t.whyChoose}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t.professionalDesigns,
              description: t.chooseTemplates,
              icon: "🎨",
            },
            {
              title: t.easyToUse,
              description: t.intuitiveInterface,
              icon: "🚀",
            },
            {
              title: t.support247,
              description: t.alwaysAvailable,
              icon: "🛟",
            },
            {
              title: t.inventoryManagement,
              description: t.inventorySystem,
              icon: "📦",
            },
            {
              title: t.purchaseOrders,
              description: t.manageOrders,
              icon: "📋",
            },
            {
              title: t.purchaseReceipts,
              description: t.generateReceipts,
              icon: "📄",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-card p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-main-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-[#ebedee] dark:bg-card rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-main-secondary mb-12">
            {t.howItWorks}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: t.createAccount,
                description: t.registerAndChoosePlan,
              },
              {
                step: "2",
                title: t.customizeStore,
                description: t.selectTemplate,
              },
              {
                step: "3",
                title: t.launchBusiness,
                description: t.publishAndSell,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-main-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-main-secondary mb-2">
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
            {t.choosePerfectPlan}
          </h1>
          <p className="max-w-6xl text-sm mb-8 text-muted-foreground">
            {t.pricingDescription}
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-6xl w-full">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className="w-full h-fit backdrop-blur-sm hover:shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-main-secondary">
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
                        <Check className="mr-2 h-5 w-5 text-main-secondary" />
                        <span className="text-sm text-primary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={`/plans/${plan.id}/checkout`}>
                    <Button className="w-full bg-main-primary hover:bg-main-secondary text-white">
                      Empezar ahora
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

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
import { formatPriceToARS } from "@/lib/utils";

export default function Home() {
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
          <h1 className="text-4xl md:text-6xl font-bold text-[#e75b04] mb-6">
            Crea tu tienda online con Mangoes
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            La plataforma perfecta para pymes y emprendedores que quieren llevar
            su negocio al siguiente nivel
          </p>

          <div className="flex gap-2 items-center justify-center">
            <a href={"#pricing"}>
              <Button className="bg-[#f48d06] hover:bg-[#e75b04] text-white text-lg py-6 px-8 rounded-full transition-colors duration-300">
                Comenzar ya
              </Button>
            </a>
            <Link href={"/agency"}>
              <Button
                variant={"ghost"}
                className="!border-[#f48d06] hover:!border-[#e75b04] text-primary text-lg py-6 px-8 rounded-full transition-colors duration-300 flex justify-center items-center gap-2">
                Dashboard
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <Image
            src="https://cdn.dribbble.com/userupload/17340975/file/original-8d77f6fac42fbb1dd9cf8ca86f982470.png?resize=1024x768&vertical=center"
            alt="Mangoes Dashboard"
            width={1366}
            height={1366}
            className="rounded-lg mx-auto"
          />
        </div>
      </section>

      {/* Tusted  */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-[#fff8f0] dark:bg-card rounded-lg w-full flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-main-oranger">
            Algunas empresas que están usando Mangoes
          </h2>
          <div className="flex justify-between items-center font-extrabold text-3xl w-full text-muted-foreground">
            <p className="flex gap-2 items-center">
              <Drill size={32} /> Herramientas OTOL
            </p>
            <p className="flex gap-2 items-center">
              <ShoppingBag size={32} />
              Buy Everywhere
            </p>
            <p className="flex gap-2 items-center">
              <Armchair size={32} />
              Deacon Diseñadora
            </p>
          </div>
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
            Nuestros planes están diseñados para ofrecerte las herramientas y el
            soporte que necesitas para hacer crecer tu negocio. Ya sea que estés
            comenzando o busques expandir tu empresa, tenemos la opción perfecta
            para ti. Elige el plan que mejor se adapte a tus necesidades y
            empieza a disfrutar de los beneficios desde el primer día.
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-6xl w-full">
            {plans.map((plan) => (
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
                        <span className="text-sm text-primary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={`/plans/${plan.id}/checkout`}>
                    <Button className="w-full bg-main-orange hover:bg-main-oranger text-white">
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

import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { env } from "@/env.config";

// Define metadata for the page
export const metadata: Metadata = {
  title: env.APP_TITLE,
  description:
    "MangoShop es un marketplace digital donde puedes descubrir y comprar productos de tus marcas favoritas en un solo lugar, desde moda hasta tecnología, con una experiencia de compra segura y conveniente.",
  keywords: [
    "marketplace digital",
    "tienda en línea",
    "compras en línea",
    "productos de marca",
    "marketplace de marcas",
    "tiendas virtuales",
    "comprar online",
    "compras seguras",
    "productos de moda",
    "tiendas de ropa online",
    "tecnología en línea",
    "marketplace de ropa",
    "mango shop",
    "plataforma de compras",
    "comprar productos",
    "shopping digital",
    "tiendas de marcas",
    "productos electrónicos online",
    "tienda digital de marcas",
    "compras en marketplace",
  ],
  authors: [{ name: "Matías Viaggio" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://mangoes.vercel.app/",
    title: env.APP_TITLE,
    description: "Shopping Online. Tu sitio al alcance de tu bolsillo.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1552070406-cd6666523132?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1200,
        height: 630,
        alt: env.APP_TITLE,
      },
    ],
    siteName: "Mangoes",
  },
  twitter: {
    card: "summary_large_image",
    title: env.APP_TITLE,
    description: "Shopping Online. Tu sitio al alcance de tu bolsillo.",
    images: [
      "https://images.unsplash.com/photo-1552070406-cd6666523132?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "",
  },
  manifest: "/manifest.json",
};

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          plusJakartaSans.className,
          "antialiased text-lg print:!mt-0 bg-main"
        )}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

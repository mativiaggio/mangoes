import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const IndustriesPage = async () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="container">
        <h1 className="text-2xl text-main-primary font-extrabold text-center">
          Rubros
        </h1>
        <br />
        <p className="text-lg">
          En Mangoes®, entendemos que cada negocio es único y tiene necesidades
          específicas que deben reflejarse en su presencia digital. Por esta
          razón, hemos desarrollado una funcionalidad innovadora que permite a
          los usuarios seleccionar el rubro o sector al que pertenece su negocio
          durante el proceso de configuración inicial. Esta elección no solo
          optimiza la experiencia del usuario, sino que también asegura que la
          página web generada automáticamente esté alineada con la identidad
          visual y las expectativas del mercado objetivo.
        </p>
        <br />
        <br />
        <h2 className="text-xl text-main-primary font-extrabold text-center">
          Lógica consistente, diseño mediante templates
        </h2>
        <p className="text-lg decora">
          Lo que realmente distingue a Mangoes® es nuestro eficiente sistema de
          templates. Cada rubro cuenta con un diseño predefinido que ha sido
          cuidadosamente desarrollado para satisfacer las necesidades visuales y
          funcionales de ese sector. Este enfoque basado en templates no solo
          garantiza resultados profesionales, sino que también permite mantener
          costos accesibles, lo cual lo convierte en la opción ideal para
          emprendedores y pequeñas empresas (pymes) que buscan destacarse en el
          mundo digital sin comprometer su presupuesto.
        </p>
        <br />
        <br />
        <h2 className="text-xl text-main-primary font-extrabold text-center">
          Características del sistema de templates
        </h2>
        <ol className="list-decimal px-6 flex flex-col space-y-6 text-lg styled-list">
          <li>
            <span className="font-bold">
              Diseños especializados para cada rubro:
            </span>{" "}
            Disponemos de una selección de templates diseñados específicamente
            para sectores como gastronomía, moda, consultoría, servicios y
            muchos más. Cada template incluye elementos visuales y estructurales
            relevantes para captar la atención del público objetivo de cada
            sector.
          </li>
          <li>
            <span className="font-bold">Economía sin sacrificar calidad:</span>{" "}
            Al utilizar un enfoque basado en templates, reducimos
            significativamente los costos de desarrollo personalizado,
            manteniendo un alto estándar de calidad en cada página web.
          </li>
          <li>
            <span className="font-bold">Fácil personalización:</span> Aunque los
            templates están predefinidos, los usuarios tienen la flexibilidad de
            ajustar ciertos aspectos, como colores, logotipos e imágenes, para
            reflejar la identidad específica de su marca.
          </li>
        </ol>
        <br />
        <br />
        <h2 className="text-xl text-main-primary font-extrabold text-center">
          Beneficios para los usuarios
        </h2>
        <ol className="list-decimal px-6 flex flex-col space-y-6 text-lg styled-list">
          <li>
            <span className="font-bold">Optimización del tiempo:</span> El
            usuario no necesita preocuparse por diseñar desde cero, ya que la
            plataforma hace el trabajo pesado al generar automáticamente una
            estética alineada con su rubro.
          </li>
          <li>
            <span className="font-bold">Identidad visual coherente:</span> Cada
            diseño está cuidadosamente creado para transmitir profesionalismo y
            atraer al público objetivo del sector.
          </li>
          <li>
            <span className="font-bold">Flexibilidad:</span> Aunque el diseño
            inicial está basado en el rubro seleccionado, el usuario tiene la
            opción de personalizar elementos adicionales según sus preferencias.
          </li>
        </ol>
        <br />
        <br />
        <Accordion type="single" collapsible className="w-full mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">
              Tienda Online
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <p>
                En Mangoes®, el rubro de Tienda Online está diseñado
                específicamente para emprendedores y pymes que desean establecer
                o mejorar su presencia en el comercio electrónico. Entendemos
                que las tiendas online requieren una plataforma funcional,
                atractiva y optimizada para generar ventas, por lo que hemos
                creado un template que combina diseño moderno y herramientas
                prácticas para lograrlo.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">Restaurnte</AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default IndustriesPage;

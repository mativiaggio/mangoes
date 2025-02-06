"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { ModeToggle } from "../mode-toggle";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <span className="float-right pt-2 pr-2">
        <ModeToggle />
      </span>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <>
          <div className="relative mb-6 w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                o inica sesión con
              </span>
            </div>
          </div>
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

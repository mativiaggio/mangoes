"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useCurrent } from "@/features/auth/api/use-current";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import React, { ReactNode, useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  adminLinks?: Links[];
  links: Links[];
}

interface Links {
  label: string;
  href: string;
  icon: ReactNode;
}

export default function SidebarComponent({
  children,
  links,
  adminLinks,
}: RootLayoutProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useCurrent();

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-none md:flex-row",
        "h-fit min-h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 !h-screen">
          <div
            className={cn(
              "flex flex-2 flex-col mt-16",
              (isLoading && "overflow-hidden") ||
                "overflow-y-auto overflow-x-hidden"
            )}>
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    (!data?.labels.includes("admin") && "hidden") || "block"
                  )}>
                  {adminLinks?.map((link, idx) => (
                    <SidebarLink
                      key={idx}
                      link={link}
                      labelClassName="text-xl md:text-base"
                    />
                  ))}
                </span>
                {links?.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    labelClassName="text-xl md:text-base"
                  />
                ))}
              </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full flex-1 border-l border-muted-foregroun">
      <div className="page-wrapper">{children}</div>
    </div>
  );
};

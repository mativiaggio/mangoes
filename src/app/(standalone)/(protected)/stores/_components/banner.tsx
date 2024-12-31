import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface BannerProps {
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  image?: string;
}

function Banner({
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  image,
}: BannerProps) {
  return (
    <div className="border w-full min-h-[100px] h-fit rounded-xl bg-main-orange flex flex-col xl:flex-row justify-between items-center xl:items-start p-10">
      <span className="flex flex-col gap-2 text-primary-foreground">
        <h1
          className={cn(
            "text-4xl font-bold text-center xl:text-left",
            titleClassName
          )}>
          {title}
        </h1>
        <p className={cn("text-center xl:text-left", subtitleClassName)}>
          {subtitle}
        </p>
      </span>
      <Image
        src={image || "/static/svg/shopping-banner.svg"}
        height={250}
        width={250}
        alt="Shopping Banner"
      />
    </div>
  );
}

export default Banner;

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSkeleton() {
  return (
    <>
      <Card className="w-full bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 border-0">
        <CardHeader>
          <div className="tracking-tight text-xl font-bold text-[#e75b04]">
            <Skeleton className="h-5 w-1/3" />
          </div>
          <div className="text-muted-foreground text-sm">
            <Skeleton className="h-[14px] w-2/3" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#f48d06] mb-4 flex items-center">
            <span>$</span>
            <Skeleton className="h-6 w-1/3" />
            <span>/mes</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#f48d06] hover:bg-[#e75b04] text-white transition-colors duration-300">
            Empezar ahora
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 border-0">
        <CardHeader>
          <div className="tracking-tight text-xl font-bold text-[#e75b04]">
            <Skeleton className="h-5 w-1/3" />
          </div>
          <div className="text-muted-foreground text-sm">
            <Skeleton className="h-[14px] w-2/3" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#f48d06] mb-4 flex items-center">
            <span>$</span>
            <Skeleton className="h-6 w-1/3" />
            <span>/mes</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#f48d06] hover:bg-[#e75b04] text-white transition-colors duration-300">
            Empezar ahora
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 border-0">
        <CardHeader>
          <div className="tracking-tight text-xl font-bold text-[#e75b04]">
            <Skeleton className="h-5 w-1/3" />
          </div>
          <div className="text-muted-foreground text-sm">
            <Skeleton className="h-[14px] w-2/3" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#f48d06] mb-4 flex items-center">
            <span>$</span>
            <Skeleton className="h-6 w-1/3" />
            <span>/mes</span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-[#e75b04]" />
              <span className="w-full">
                <Skeleton className="h-[14px] w-2/3" />
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#f48d06] hover:bg-[#e75b04] text-white transition-colors duration-300">
            Empezar ahora
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    agencyId: string;
  };
};

const LaunchPadPage = async ({ params }: Props) => {
  const { agencyId } = await params;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: agencyId,
    },
  });

  if (!agencyDetails) return <div>Ocurrio un error</div>;

  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Comencemos!</CardTitle>
            <CardDescription>
              Sigue los pasos a continuación para configurar tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="https://www.svgrepo.com/show/508761/apple.svg"
                  alt="app logo"
                  height={40}
                  width={40}
                  className="rounded-full object-contain bg-white p-2"
                />
                <Image
                  src="https://www.svgrepo.com/show/508764/android.svg"
                  alt="app logo"
                  height={40}
                  width={40}
                  className="rounded-full object-contain bg-white p-2"
                />
                <p>
                  {" "}
                  Guardar el sitio web como un acceso directo en tu dispositivo
                  móvil
                </p>
              </div>
              <Button>Comenzar</Button>
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src={agencyDetails.agencyLogo}
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain bg-gray-200 h-[40px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mt-4 md:mt-0"
                />
                <p> Fill in all your bussiness details</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={40}
                  className="text-emerald-500 p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  href={`/agency/${agencyId}/settings`}>
                  Comenzar
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;

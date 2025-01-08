import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { SubAccount } from "@prisma/client";
import { AlertDescription } from "@/components/ui/alert";
import CreateSubaccountButton from "./_components/create-subaccount-btn";
import DeleteButton from "./_components/delete-button";
import { HelpCircle } from "lucide-react";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const AllSubaccountsPage = async ({ params }: Props) => {
  const agencyId = (await params).agencyId;
  const user = await getAuthUserDetails();
  if (!user) return;

  return (
    <AlertDialog>
      <div className="flex flex-col ">
        <CreateSubaccountButton
          user={user}
          id={agencyId}
          className="w-[200px] self-end m-6"
        />
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Buusca una subcuenta..." />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup heading="Subcuentas">
              {!!user.Agency?.SubAccount.length ? (
                user.Agency.SubAccount.map((subaccount: SubAccount) => (
                  <CommandItem
                    key={subaccount.id}
                    className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all">
                    <Link
                      href={`/subaccount/${subaccount.id}`}
                      className="flex gap-4 w-full h-full">
                      {subaccount.subAccountLogo !== "" ? (
                        <div className="relative w-32">
                          <Image
                            src={subaccount.subAccountLogo}
                            alt="subaccount logo"
                            fill
                            className="rounded-md object-contain bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mt-4 md:mt-0 p-4"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-full flex items-center justify-center">
                          <HelpCircle className="!h-16 !w-16" />
                        </div>
                      )}
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {subaccount.name}
                          <span className="text-muted-foreground text-xs">
                            {subaccount.address}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        className="w-20 hover:bg-red-600 hover:text-white !text-white">
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                          ¿Estás absolutamente seguro?
                        </AlertDialogTitle>
                        <AlertDescription className="text-left">
                          Esta acción no se puede deshacer. Esto eliminará la
                          subcuenta y todos los datos relacionados con ella.
                        </AlertDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive">
                          <DeleteButton subAccountId={subaccount.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </CommandItem>
                ))
              ) : (
                <div className="text-muted-foreground text-center p-4">
                  No se encontraron subcuentas
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default AllSubaccountsPage;

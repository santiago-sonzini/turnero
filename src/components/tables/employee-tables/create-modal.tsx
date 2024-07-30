"use client"
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Edit, Plus } from "lucide-react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  FormContactInfo,
  FormContactInfoSchema,
} from "@/components/forms/form-contact-info";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
import { User } from "@prisma/client";
import { create_user } from "@/app/actions/users";
import { cleanAndFixPhone } from "@/lib/utils";


export function CreateClientModal({
  text,
}: {
  text: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useClientMediaQuery("(min-width: 768px)");

  const handleSubmit = async (input: z.infer<typeof FormContactInfoSchema>) => {
    const phone = cleanAndFixPhone(input.phone);
    const data = {
      ...input,
      phone
    }
    console.log("🚀 ~ handleSubmit ~ data:", data);
    const res = await create_user(input)
    console.log("🚀 ~ handleSubmit ~ res:", res)
    if (res.status === 200) {
      toast({
        title: "Exito.",
        description: res.message,
      });
    } else {
      toast({
        title: "Error al actualizar datos",
        description: res.message,  
      });
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:w-[50vw] md:max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>
              <h4 className="text-text font-arvo m-2 text-center text-2xl md:text-3xl">
                Agregar cliente
              </h4>
            </DialogTitle>
            <DialogDescription className="font-arvo flex h-[55vh] flex-col overflow-y-scroll font-normal">
            <FormContactInfo button="Continuar" user={null} submitRef={null} onSubmit={handleSubmit} />

             
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <Button>
            <Plus className="mr-2 h-4 w-4" />
            {text}
      </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="mb-10 text-left">
          <DrawerTitle>
            <h4 className="text-text m-2 text-center text-2xl font-bold md:text-xl">
            Agregar cliente
            </h4>
          </DrawerTitle>
          <DrawerDescription className="font-arvo h-[55vh] overflow-y-scroll font-normal">
          <FormContactInfo button="Continuar" user={null} submitRef={null} onSubmit={handleSubmit} />
          </DrawerDescription>

          <DrawerClose asChild className="mb-24">
            {/* <Button>Cerrar</Button> */}
          </DrawerClose>
        </DrawerHeader>

        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

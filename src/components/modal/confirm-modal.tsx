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
import { Edit } from "lucide-react";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  FormContactInfo,
  FormContactInfoSchema,
} from "@/components/forms/form-contact-info";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
import { User } from "@prisma/client";
import { create_user } from "@/app/actions/users";
import { FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createAppointment } from "@/app/actions/appoinments";
import { start } from "repl";
import { ServiceWithAvailability } from "@/app/actions/services";

export function ConfirmModal({
  item,
  text,
  date,
  handleSubmit,
}: {
  item: User ;
  text: string;
  date: Date;
  handleSubmit: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useClientMediaQuery("(min-width: 768px)");
  const submitRef: React.Ref<HTMLButtonElement> = React.useRef(null);

  

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{text}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:w-[50vw] md:max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>
              <h4 className="text-text font-arvo m-2 text-center text-2xl md:text-3xl">
                Agendar
              </h4>
            </DialogTitle>
            <DialogDescription className="font-arvo flex h-[55vh] flex-col overflow-y-scroll font-normal">
            <p className="text-text my-4 text-center text-base font-bold">
              Turno a las {text} el {date.toLocaleDateString("es-ES")}
            </p>
            <div className="flex w-full flex-col items-start justify-center gap-y-5">
              <div className="flex w-full flex-col items-start justify-center gap-4">
                <Label className="text-text">Nombre</Label>
                <Input
                  className="text-text"
                  type="text"
                  placeholder="5490000000"
                  value={item?.name}
                  disabled
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-4">
                <Label className="text-text">Numero de telefono</Label>
                <Input
                  className="text-text disabled:text-text"
                  type="phone"
                  placeholder="5490000000"
                  value={item?.phone}
                  disabled
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                Confirmar
              </Button>
            </div>
             
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>{text}</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="mb-10 text-left">
          <DrawerTitle>
            <h4 className="text-text m-2 text-center text-2xl font-bold md:text-xl">
            Agendar
            </h4>
          </DrawerTitle>
          <DrawerDescription className="font-arvo h-[55vh] overflow-y-scroll font-normal">
            <p className="text-text my-4 text-center text-base font-bold">
              Turno a las {text} el {date.toLocaleDateString("es-ES")}
            </p>
            <div className="flex w-full flex-col items-start justify-center gap-y-5">
              <div className="flex w-full flex-col items-start justify-center gap-4">
                <Label className="text-text">Nombre</Label>
                <Input
                  className="text-text"
                  type="text"
                  placeholder="5490000000"
                  value={item?.name}
                  disabled
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-4">
                <Label className="text-text">Numero de telefono</Label>
                <Input
                  className="text-text disabled:text-text"
                  type="phone"
                  placeholder="5490000000"
                  value={item?.phone}
                  disabled
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                Confirmar
              </Button>
            </div>
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

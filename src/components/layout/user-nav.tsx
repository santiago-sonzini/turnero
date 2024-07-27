"use client";
import { logout } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle/theme-toggle";
import { User } from "@prisma/client";
import Link from "next/link";
export function UserNav({ user }: { user: User | null }) {
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="light relative h-8 w-8 rounded-full"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-white">
                {user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex flex-col space-y-1">
                <p className="text-text text-sm font-medium leading-none">
                  {user.name}
                </p>
                <p className="text-text text-xs leading-none">{user.email}</p>
              </div>
              <span className="flex items-center gap-2 md:hidden">
                <ThemeToggle />
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link href={"/usuario"}>
              <DropdownMenuItem>Mis turnos</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logout();
            }}
          >
            Cerrar sesión
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

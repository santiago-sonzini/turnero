"use client";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function HeaderHome({ user }: { user: any }) {
  const path = usePathname();
  console.log("🚀 ~ HeaderHome ~ path:", path)
  const scroll2El = (elID: string) => {
    const element = document.getElementById(elID);
    if (element?.offsetTop) {
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: "smooth",
      });
    }
  };

  const onBtnClick = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      scroll2El("more");
    }, 100);
  };
  return (
    <div className="supports-backdrop-blur:bg-background/60 w-full left-0 right-0 top-0 z-1000 bg-background backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="block md:w-1/3">
          <Link href={"/turnos"} >
            <h1 className="text-2xl font-bold text-text">
              Turnero
            </h1>
          </Link>
        </div>
        <div className="w-1/2  flex items-center justify-end md:justify-between gap-x-2">
          
          <Link  href={"/usuario"}>
          <motion.p 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            className="md:hidden text-text underline font-semibold">
              Mis turnos

            </motion.p>
          </Link>

          <div className="flex items-center gap-x-2">
          <UserNav user={user ?? null} />
          {
            false
            &&
            <Button onClick={(e) => onBtnClick(e)}>
              Mas
            </Button>
          }
          <span className="hidden md:flex items-center gap-2">
          <ThemeToggle />

          </span>
          </div>

          
        </div>
       
        
      </nav>
    </div>
  );
}

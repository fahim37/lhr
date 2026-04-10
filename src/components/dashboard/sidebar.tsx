"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Film,
  MessageSquare,
  Receipt,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Schedule",
      icon: Calendar,
      href: "/dashboard/schedule",
      active: pathname === "/dashboard/schedule",
    },
    {
      label: "Visit Logs",
      icon: ClipboardList,
      href: "/dashboard/visit-logs",
      active: pathname === "/dashboard/visit-logs",
    },
    {
      label: "Media",
      icon: Film,
      href: "/dashboard/media",
      active: pathname === "/dashboard/media",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/dashboard/chat",
      active: pathname === "/dashboard/chat",
    },
    {
      label: "Billing",
      icon: Receipt,
      href: "/dashboard/billing",
      active: pathname === "/dashboard/billing",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-secondary">
      <div className="p-6 flex justify-center">
        <div className="">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/lhasis-logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </Link>
        </div>
      </div>
      <div className="flex-1 px-3 py-2">
        <nav className="flex flex-col gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-md transition-all",
                  route.active
                    ? "bg-primary"
                    : "text-white"
                )}
              >
                <route.icon className="h-5 w-5" />
                <span>{route.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-3 mt-auto">
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-primary text-[#091057]"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden fixed top-4 left-4 z-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <div
      className={cn(
        "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0",
        className
      )}
    >
      <SidebarContent />
    </div>
  );
}

"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "RSVP",
    path: "/about",
  },
  {
    name: "Events",
    path: "/events",
  },
  {
    name: "Seattle",
    path: "/seattle",
  },
  {
    name: "FAQ",
    path: "/faq",
  },
  {
    name: "Registry",
    path: "https://withjoy.com/aubron-and-ethar/registry",
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  return pathName !== "/" ? (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/about"
          >
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="flex-shrink">
        <div className="hidden sm:flex gap-8">
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                color={pathName === item.path ? "primary" : "foreground"}
                href={item.path}
                target={item.path.startsWith("http") ? "_blank" : undefined}
                size="md"
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </div>
        <ThemeSwitch />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathName === item.path ? "primary" : "foreground"}
              className="w-full"
              href={item.path}
              size="lg"
              target={item.path.startsWith("http") ? "_blank" : undefined}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  ) : null;
};

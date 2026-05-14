"use client";

import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Link } from "next-view-transitions";
import { motion } from "motion/react"

export const Navbar = () => {
  return (
    <motion.header 
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
     className="bg-amber-50 border-neutral-300 border-dashed px-2 sm:px-4 py-3  backdrop-blur-3xl border-b fixed top-0 left-0 right-0 z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-1">
        <div className="flex items-center gap-1">
          <Image src="/velora-logo.svg?v=202605142258" loading="eager" alt="Velora" width={36} height={36} />
          <span className="text-xl font-semibold tracking-tight text-[#406AAF] font-serif">
            Velora
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
          <Link
            href="#why-velora"
            className="transition-colors hover:text-neutral-900"
          >
            Why Velora
          </Link>
          <Link
            href="#setup"
            className="transition-colors hover:text-neutral-900"
          >
            Setup
          </Link>
          <Link
            href="/pricing"
            className="transition-colors hover:text-neutral-900"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            asChild
            variant="ghost"
            className="text-neutral-600 md:inline-flex hover:bg-transparent"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-[#406AAF] px-5 text-white hover:bg-[#406AAF] "
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};




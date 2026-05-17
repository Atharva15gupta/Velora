"use client";

import { Link } from "next-view-transitions";
import { Button } from "@workspace/ui/components/button";
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Link as LinkIcon,
  MessageCircle,
  MessageSquareText,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { HeroIllustration } from "./hero-illustration";

export const supportFlow = [
  {
    query: "How many pricing plans do you offer?",
    reply:
      "We offer two plans: Starter and Pro, designed to scale with your needs.",
  },
  {
    query: "Do you offer a free trial?",
    reply: "We currently do not offer a free trial.",
  },
  {
    query: "Can I customize the chat widget?",
    reply:
      "Yes, you can customize the widget to match your brand and product experience.",
  },
];

const heroContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.18,
    },
  },
} as const;

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
} as const;

const lowerSectionVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 1.2,
      staggerChildren: 0.2,
    },
  },
} as const;

const lowerColumnVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const documentTypes = [
  { label: "PDF", icon: FileText, color: "text-red-500" },
  { label: "DOCS", icon: FileText, color: "text-[#406AAF]" },
  { label: "TXT", icon: FileText, color: "text-neutral-500" },
  { label: "URL", icon: LinkIcon, color: "text-emerald-600" },
] as const;

const orbitStars = [
  { className: "left-[11%] top-[43%]", size: "size-5" },
  { className: "left-[17%] bottom-[18%]", size: "size-6" },
  { className: "left-[23%] top-[20%]", size: "size-5" },
  { className: "right-[16%] top-[45%]", size: "size-4" },
  { className: "right-[20%] bottom-[13%]", size: "size-5" },
  { className: "right-[22%] top-[18%]", size: "size-3.5" },
] as const;

export const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 divide-y divide-neutral-300 divide-dashed overflow-hidden border-b border-neutral-300 border-dashed">
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
        className="grid min-h-[620px] grid-cols-1 items-center gap-10 px-7 pb-10 pt-28 sm:min-h-[560px] sm:grid-cols-[0.92fr_1.08fr] sm:px-20 sm:pb-14 sm:pt-24 lg:px-24"
      >
        <div className="flex flex-col items-start gap-5">
          <motion.div
            variants={heroItemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#406AAF]/10 bg-[#406AAF]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2f5593]"
          >
            <Star className="size-3.5 fill-[#406AAF] text-[#406AAF]" />
            AI Support Agent
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="max-w-[620px] font-serif text-[2.8rem] font-medium leading-[0.96] tracking-tight text-[#406AAF] sm:text-[4.45rem] lg:text-[5.1rem]"
          >
            AI support agent that actually{" "}
            <span className="italic">understands</span> your business
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="max-w-[470px] text-base leading-relaxed tracking-tight text-neutral-700 sm:text-lg"
          >
            Transform your product knowledge into an AI agent that answers
            instantly and intelligently.
          </motion.p>

          <motion.div variants={heroItemVariants} className="flex gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#406AAF] px-7 text-base text-white shadow-[0_10px_26px_rgba(64,106,175,0.24)] hover:bg-[#345fa1]"
            >
              <Link href="/sign-up">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={heroItemVariants}
          className="relative mx-auto flex min-h-[360px] w-full max-w-[650px] items-center justify-center sm:min-h-[470px]"
        >
          <div className="absolute inset-x-[4%] top-[8%] aspect-square rounded-[50%] border border-dashed border-[#406AAF]/22" />
          <div className="absolute inset-x-[12%] top-[15%] aspect-square rounded-[50%] border border-dashed border-[#406AAF]/18" />
          <div className="absolute inset-x-[20%] top-[22%] aspect-square rounded-[50%] border border-dashed border-[#406AAF]/14" />
          {orbitStars.map((star) => (
            <Sparkles
              key={star.className}
              className={`absolute ${star.className} ${star.size} text-[#406AAF]`}
              strokeWidth={2}
            />
          ))}
          <HeroIllustration className="relative z-10 h-auto w-full max-w-[560px] drop-shadow-[0_28px_44px_rgba(64,106,175,0.18)]" />
        </motion.div>
      </motion.div>

      <motion.div
        variants={lowerSectionVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 divide-y divide-dashed divide-neutral-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        <motion.div
          variants={lowerColumnVariants}
          className="flex min-h-[260px] flex-col items-center justify-center gap-4 px-7 py-12"
        >
          <div className="flex size-12 items-center justify-center rounded-full border border-[#406AAF]/10 bg-[#406AAF]/10 text-[#406AAF]">
            <MessageCircle className="size-5" />
          </div>
          <div className="flex w-full max-w-[310px] flex-col gap-3">
            {supportFlow.map((item) => (
              <button
                key={item.query}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-neutral-300 bg-white/55 px-4 py-3 text-left text-sm font-semibold tracking-tight text-neutral-600 transition-colors hover:border-[#406AAF]/40 hover:text-[#406AAF]"
              >
                <span>{item.query}</span>
                <ChevronRight className="size-4 shrink-0 text-neutral-500" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={lowerColumnVariants}
          className="flex min-h-[260px] flex-col items-center justify-center gap-5 px-7 py-12 text-center"
        >
          <div className="flex size-12 items-center justify-center rounded-full border border-[#406AAF]/10 bg-[#406AAF]/10">
            <img
              src="/velora-logo.svg?v=202605142258"
              alt=""
              className="size-7"
            />
          </div>
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#1f365c] sm:text-3xl">
              Built on your knowledge
            </h2>
            <p className="mx-auto max-w-[320px] text-sm leading-relaxed tracking-tight text-neutral-600">
              Upload your docs, help center, or website. Velora learns it all to
              deliver accurate, context-aware answers.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {documentTypes.map(({ label, icon: Icon, color }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white/50 px-3 py-2 text-xs font-bold tracking-wide text-neutral-600"
              >
                <Icon className={`size-4 ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={lowerColumnVariants}
          className="flex min-h-[260px] flex-col items-center justify-center gap-4 px-7 py-12"
        >
          <div className="flex size-12 items-center justify-center rounded-full border border-[#406AAF]/10 bg-[#406AAF]/10 text-[#406AAF]">
            <MessageSquareText className="size-5" />
          </div>
          <div className="flex w-full max-w-[310px] flex-col gap-3">
            {supportFlow.map((item) => (
              <div
                key={item.reply}
                className="rounded-xl bg-[#406AAF] px-4 py-3 text-sm font-semibold leading-snug tracking-tight text-white shadow-[0_10px_22px_rgba(64,106,175,0.14)]"
              >
                {item.reply}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

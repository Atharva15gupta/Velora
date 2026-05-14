"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";

type HeroIllustrationProps = {
  className?: string;
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const HeroIllustration = ({ className }: HeroIllustrationProps) => {
  const baseControls = useAnimationControls();
  const strokeControls = useAnimationControls();
  const logoControls = useAnimationControls();

  useEffect(() => {
    let isActive = true;

    const runSequence = async () => {
      await sleep(900);
      if (!isActive) return;

      await baseControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: "easeOut" },
      });

      await sleep(140);
      if (!isActive) return;

      await strokeControls.start({
        opacity: 1,
        y: 0,
        pathLength: 1,
        transition: { duration: 0.75, ease: "easeInOut" },
      });

      await sleep(180);
      if (!isActive) return;

      await logoControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    };

    void runSequence();

    return () => {
      isActive = false;
    };
  }, [baseControls, strokeControls, logoControls]);

  return (
    <svg
      width="606"
      height="409"
      viewBox="0 0 606 409"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="geometricPrecision"
    >
      <motion.g initial={{ opacity: 0, y: -80 }} animate={baseControls}>
        <path
          d="M271.958 65.5C283.915 58.5965 303.302 58.5964 315.259 65.5L594.506 226.724C606.464 233.627 606.464 244.82 594.506 251.723L333.354 402.5C321.396 409.404 302.01 409.404 290.052 402.5L10.8051 241.276C-1.15221 234.373 -1.1522 223.18 10.8051 216.277L271.958 65.5Z"
          stroke="#D4D4D4"
          strokeWidth="3"
        />
        <rect
          width="250"
          height="80"
          transform="matrix(0.866025 -0.5 0 1 330.947 287.5)"
          fill="#406AAF"
          stroke="#406AAF"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M287.646 12.5C299.603 5.59644 318.99 5.59644 330.947 12.5L547.453 137.5C559.411 144.404 559.411 155.596 547.453 162.5L330.947 287.5C318.99 294.404 299.603 294.404 287.646 287.5L71.1393 162.5C59.182 155.596 59.182 144.404 71.1393 137.5L287.646 12.5Z"
          fill="#FFFDF4"
        />
        <rect
          width="250"
          height="80"
          transform="matrix(0.866025 0.5 0 1 71.1393 162.5)"
          fill="#406AAF"
          stroke="#406AAF"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M62.1713 150C62.1713 154.882 65.5984 159.301 71.1393 162.5V242.5C65.5984 239.301 62.1713 234.882 62.1713 230V150Z"
          fill="#406AAF"
          stroke="#406AAF"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M287.646 287.5C299.603 294.404 318.99 294.404 330.947 287.5V367.5C318.99 374.404 299.603 374.404 287.646 367.5V287.5Z"
          fill="#406AAF"
          stroke="#406AAF"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M556.421 150C556.421 154.882 552.994 159.301 547.453 162.5V242.5C552.994 239.301 556.421 234.882 556.421 230V150Z"
          fill="#406AAF"
          stroke="#406AAF"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </motion.g>

      <motion.path
        d="M287.311 12.5C299.269 5.59644 318.655 5.59644 330.613 12.5L547.119 137.5C559.076 144.404 559.076 155.596 547.119 162.5L330.613 287.5C318.655 294.404 299.269 294.404 287.311 287.5L70.8051 162.5C58.8478 155.596 58.8478 144.404 70.8051 137.5L287.311 12.5Z"
        stroke="#406AAF"
        strokeWidth="2"
        initial={{ opacity: 0, y: -46, pathLength: 0 }}
        animate={strokeControls}
      />

      <motion.image
        href="/velora-logo.svg?v=202605142258"
        x="192"
        y="30"
        width="240"
        height="240"
        preserveAspectRatio="xMidYMid meet"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ opacity: 0, y: -72, scale: 0.82 }}
        animate={logoControls}
      />
    </svg>
  );
};


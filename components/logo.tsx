"use client";

import { dolce, layaan } from "@/styles/fonts";
import {
  useSpringRef,
  useTransition,
  animated,
  useSpring,
} from "@react-spring/web";
import { useEffect, useState } from "react";

export const Logo = () => {
  const [arabicSprings, arabicApi] = useSpring(() => ({
    from: { opacity: 0 },
  }));
  const [englishSprings, englishApi] = useSpring(() => ({
    from: { opacity: 1 },
  }));
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const config = {
        duration: 1800,
      };
      setShown(!shown);
      if (shown) {
        arabicApi.start({ opacity: 0, config });
        englishApi.start({ opacity: 1, config });
      } else {
        arabicApi.start({ opacity: 1, config });
        englishApi.start({ opacity: 0, config });
      }
    }, 6400);
    return () => clearInterval(interval);
  }, [arabicApi, englishApi, shown]);

  return (
    <div className="h-full">
      <animated.div
        className={`${layaan.className} text-2xl md:text-3xl absolute bottom-2 left-8`}
        style={{ ...arabicSprings }}
      >
        أوبرون و إيثـــار
      </animated.div>

      <animated.div
        className={`${dolce.className} text-3xl md:text-4xl absolute bottom-2 left-8`}
        style={{ ...englishSprings }}
      >
        Aubron + Ethar
      </animated.div>
    </div>
  );
};

// <div className="text-4xl">Aubron + Ethar</div>;

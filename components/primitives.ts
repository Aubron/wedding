import { tv } from "tailwind-variants";
import { gaultier } from "@/styles/fonts";

export const about = tv({
  base: "",
  variants: {
    variant: {
      label: "text-xs",
      value: "text-xl " + gaultier.className,
      heading: "text-3xl " + gaultier.className,
      date: "text-md " + gaultier.className,
      welcome: "text-lg leading-tight " + gaultier.className,
    },
    padding: {
      true: "pb-2",
    },
    default: {
      padding: false,
    },
  },
});

export const buttons = tv({
  base: "text-center flex flex-col justify-center items-center absolute z-10 top-1 h-full",
});

export const buttonText = tv({
  base: gaultier.className,
  variants: {
    variant: {
      heading: "text-3xl",
      subheading: "text-md -mb-1",
    },
    white: {
      true: "text-white",
    },
  },
});

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

"use client";
import { dolce, layaan } from "@/styles/fonts";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-10 md:py-10 mt-20">
      <div className="inline-block max-w-lg text-center justify-center">
        <Card className="p-12 border-2 border-foreground-300">
          <h1 className={`text-6xl drop-shadow-md ${layaan.className}`}>
            إيثـــار<span className="text-foreground-400"> و </span>أوبرون
          </h1>
          <h1 className={`text-4xl drop-shadow-md pt-6 ${dolce.className}`}>
            ( Aubron<span className="text-foreground-400"> + </span>Ethar )
          </h1>
        </Card>
      </div>

      <div className="w-80 flex gap-0 pt-4 items-center">
        <Input
          className="inline-block"
          classNames={{
            inputWrapper: "rounded-tr-none rounded-br-none",
          }}
          type="text"
          label="Password"
          fullWidth
          size="sm"
        />
        <Button
          className="inline-block rounded-md rounded-tl-none rounded-bl-none text-sm"
          color="primary"
          size="lg"
          onClick={() => router.push("/about")}
        >
          Submit
        </Button>
      </div>
      <div className="text-xs text-foreground-300">
        (Password should be in your digital or physical invitation.)
      </div>
    </section>
  );
}

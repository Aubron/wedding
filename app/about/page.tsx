"use client";
import { dolce, layaan } from "@/styles/fonts";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { gaultier } from "@/styles/fonts";
import { about } from "@/components/primitives";
import Rsvp from "@/components/rsvp";

export default function Home() {
  const router = useRouter();
  return (
    <section className="grid grid-cols-4 gap-2 pt-6">
      <Card isFooterBlurred className="col-span-4">
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-fill"
          src="/images/seattle.jpg"
        />
      </Card>
      <Card className="col-span-4">
        <CardBody>
          <span className={about({ variant: "label" })}>Where</span>
          <span className={about({ variant: "value", padding: true })}>
            Seattle, WA
          </span>
          <span className={about({ variant: "label" })}>When</span>
          <span className={about({ variant: "value" })}>June 29, 2024</span>
        </CardBody>
      </Card>
      <Rsvp />
    </section>
  );
}

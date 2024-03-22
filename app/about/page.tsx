"use client";
import { dolce, layaan } from "@/styles/fonts";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { gaultier } from "@/styles/fonts";
import { about } from "@/components/primitives";
import Rsvp from "@/components/rsvp";
import BottomNav from "@/components/bottomnav";
import seattle3 from "../../public/images/seattle2.webp";

export default function Home() {
  const router = useRouter();
  return (
    <section className="grid grid-cols-8 gap-2 pt-4">
      <Card
        isFooterBlurred
        className="col-span-8 md:col-span-5 md:row-span-2 lg:col-span-6"
      >
        <Image
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={seattle3}
        />
      </Card>
      <Card className="col-span-8 sm:col-span-3 md:col-span-3 lg:col-span-2">
        <CardBody className="justify-center items-center sm:items-start md:items-center">
          <span
            className={
              about({ variant: "label" }) +
              " text-center sm:text-start md:text-center max-w-[150px] pb-4"
            }
          >
            We invite you to join us for our wedding celebration
          </span>
          <span className={about({ variant: "label" })}>Where</span>
          <span className={about({ variant: "value", padding: true })}>
            Seattle, WA
          </span>
          <span className={about({ variant: "label" })}>When</span>
          <span className={about({ variant: "value" })}>June 29, 2024</span>
        </CardBody>
      </Card>
      <Rsvp />
      <BottomNav />
    </section>
  );
}

import { Card, CardBody } from "@nextui-org/card";
import { gaultier } from "@/styles/fonts";
import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

interface EventCardProps {
  name: string;
  description: (ReactNode | string)[];
  photo?: StaticImageData;
}

const EventCard = ({ name, description, photo }: EventCardProps) => {
  return (
    <Card className="col-span-8 sm:col-span-5 md:col-span-6 p-4">
      <CardBody>
        <h1 className={"text-4xl font-semibold " + gaultier.className}>
          {name}
        </h1>
        {description.map((desc, index) =>
          typeof desc === "string" ? (
            <p key={index}>{desc}</p>
          ) : (
            <div key={index}>{desc}</div>
          )
        )}
      </CardBody>
    </Card>
  );
};

export default EventCard;

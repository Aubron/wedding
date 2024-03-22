import { Card, CardBody, CardHeader } from "@nextui-org/card";
//import { Image } from "@nextui-org/image";
import Image from "next/image";
import { buttons, buttonText } from "./primitives";
import fauntleroy1 from "../public/images/fauntleroy1.jpg";
import seattle2 from "../public/images/seattle2.jpg";
import reykjavik from "../public/images/reykjavik.webp";
import { Link } from "@nextui-org/link";
const bottomnav = () => {
  return (
    <>
      <Card
        className="col-span-4 aspect-square sm:col-span-2"
        as={Link}
        href="/events"
      >
        <CardHeader className={buttons()}>
          <span className={buttonText({ variant: "heading", white: true })}>
            Events
          </span>
          <p className={buttonText({ variant: "subheading", white: true })}>
            Wedding
          </p>
          <p className={buttonText({ variant: "subheading", white: true })}>
            Welcome Party
          </p>
        </CardHeader>
        <Image
          alt="Card background"
          className="z-0 w-full h-full object-cover brightness-50"
          src={fauntleroy1}
        />
      </Card>
      <Card
        className="col-span-4 aspect-square sm:col-span-2"
        as={Link}
        href="/seattle"
      >
        <CardHeader className={buttons()}>
          <span className={buttonText({ variant: "heading", white: true })}>
            Seattle
          </span>
          <p className={buttonText({ variant: "subheading", white: true })}>
            Hotels
          </p>
          <p className={buttonText({ variant: "subheading", white: true })}>
            Transportation
          </p>
        </CardHeader>
        <Image
          alt="Card background"
          className="z-0 w-full h-full object-cover brightness-50"
          src={seattle2}
        />
      </Card>
      <Card
        className="col-span-4 aspect-square sm:col-span-2"
        as={Link}
        href="/faq"
      >
        <CardHeader className={buttons()}>
          <span className={buttonText({ variant: "heading" })}>FAQ</span>
          <span className={buttonText({ variant: "subheading" })}>
            Frequently Asked Questions
          </span>
        </CardHeader>
      </Card>
      <Card
        className="col-span-4 aspect-square sm:col-span-2"
        as={Link}
        href="/registry"
      >
        <CardHeader className={buttons()}>
          <span className={buttonText({ variant: "heading", white: true })}>
            Wedding Registry
          </span>
        </CardHeader>
        <Image
          alt="Card background"
          className="z-0 w-full h-full object-cover brightness-50"
          src={reykjavik}
        />
      </Card>
    </>
  );
};

export default bottomnav;

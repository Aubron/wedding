import { gaultier } from "@/styles/fonts";
import Image, { StaticImageData } from "next/image";
import { Image as UIImage } from "@nextui-org/image";
import Link from "next/link";

interface EventDateProps {
  date: string;
  time: string;
  location: string;
  locationHref?: string;
  photo?: StaticImageData;
}

const EventDate = ({
  date,
  time,
  location,
  locationHref,
  photo,
}: EventDateProps) => {
  return (
    <div
      className={
        "pt-4 col-span-8 sm:col-span-3 md:col-span-2 text-center " +
        gaultier.className
      }
    >
      <h1 className={"text-4xl"}>{date}</h1>
      <h2>{time}</h2>
      {locationHref ? (
        <Link
          className="underline-offset-4 underline flex flex-col items-center"
          href={locationHref}
          target="_blank"
        >
          {photo && (
            <UIImage
              isBlurred
              className="max-w-[120px] my-2"
              alt="Logo"
              src="/images/fauntleroy_logo.png"
            />
          )}
          <h2>{location}</h2>
        </Link>
      ) : (
        <h2>{location}</h2>
      )}
    </div>
  );
};

export default EventDate;

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import { about } from "@/components/primitives";
import Rsvp from "@/components/rsvp";
import BottomNav from "@/components/bottomnav";
import EventDate from "@/components/eventdate";
import EventCard from "@/components/eventcard";
import events from "@/config/events";
import { Fragment } from "react";

export default function Home() {
  return (
    <section className="grid grid-cols-8 gap-8 pt-4">
      {events.map((event) => (
        <Fragment key={event.name}>
          <EventDate
            date={event.date}
            time={event.time}
            location={event.location.name}
            locationHref={event.location.maps}
            photo={event.photo}
          />
          <EventCard
            name={event.name}
            description={event.description}
            photo={event.photo}
          />
        </Fragment>
      ))}
      <BottomNav exclude="events" />
    </section>
  );
}

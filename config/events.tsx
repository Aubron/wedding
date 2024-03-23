import { ReactNode } from "react";
import fauntleroyLogo from "@/public/images/fauntleroy_logo.png";
import { StaticImageData } from "next/image";

type EventDefiniton = {
  name: string;
  date: string;
  time: string;
  location: {
    name: string;
    maps?: string;
  };
  description: (string | ReactNode)[];
  photo?: StaticImageData;
};

const events: EventDefiniton[] = [
  {
    name: "Welcome BBQ",
    date: "June 26",
    time: "6:00 PM",
    location: {
      name: "Our Home",
      maps: "https://www.google.com/maps/place/47%C2%B036'48.0%22N+122%C2%B017'43.8%22W/@47.6133342,-122.2961437,19z/data=!3m1!4b1!4m13!1m8!3m7!1s0x54906ad83f4eafc1:0x392a38fdafceb145!2s2812+E+Union+St,+Seattle,+WA+98122!3b1!8m2!3d47.6131932!4d-122.2954698!16s%2Fg%2F11cshl_zy5!3m3!8m2!3d47.6133333!4d-122.2955?entry=ttu",
    },
    description: ["Join us for a BBQ at our home to welcome you to Seattle!"],
  },
  {
    name: "TBD - Friends Event",
    date: "June 27",
    time: "TBD",
    location: {
      name: "TBD",
    },
    description: [
      "We'll be hosting an event for visiting friends the night of the 27th, though details are still to come.",
    ],
  },
  {
    name: "Wedding Ceremony",
    date: "June 29",
    time: "4:00 PM",
    location: {
      name: "The Hall at Fauntleroy",
      maps: "https://www.google.com/maps/place/The+Hall+at+Fauntleroy/@47.5220305,-122.3903505,16z/data=!4m6!3m5!1s0x5490414fa3103b13:0xfdd7bc10fc25c596!8m2!3d47.5220269!4d-122.3877756!16s%2Fg%2F1q64q336h?entry=ttu",
    },
    description: [
      "Join us for our wedding ceremony at The Hall at Fauntleroy.",
      "4:00 PM - Guest Arrival",
      "4:30 PM - Ceremony Begins",
      "5:30 PM - Mingling Hour",
      "6:30 PM - Dinner Buffet Opens",
      "7:30 PM - Dancing",
      "10:00 PM - Jirtig (Sudanese Traditional Event)",
    ],
    photo: fauntleroyLogo,
  },
];

export default events;

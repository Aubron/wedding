"use client";
import { dolce, layaan } from "@/styles/fonts";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import local from "next/font/local";

const CHECK_RSVP_AUTH = gql`
  mutation {
    checkAuth
  }
`;

export default function Home() {
  const router = useRouter();
  const [checkAuth, { data, loading, error }] = useMutation(CHECK_RSVP_AUTH);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const authRedirect = async () => {
      try {
        await checkAuth();
        router.push("/about");
      } catch (e) {
        // no-op
      }
    };
    if (localStorage.getItem("rsvp-password")) {
      authRedirect();
    }
  }, [checkAuth, router]);

  const handleSubmit = async () => {
    try {
      localStorage.removeItem("rsvp-password");
      localStorage.setItem("rsvp-password", password);
      await checkAuth();
      router.push("/about");
    } catch (e) {
      console.error(e);
      setPasswordError(true);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-10 md:py-10 mt-20">
      <div className="inline-block max-w-xs sm:max-w-lg text-center justify-center">
        <Card className="p-12 pb-8 border-2 border-foreground-300">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl drop-shadow-md ${layaan.className}`}
          >
            إيثـــار<span className="text-foreground-400"> و </span>أوبرون
          </h1>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl drop-shadow-md pt-6 ${dolce.className}`}
          >
            ( Aubron<span className="text-foreground-400"> + </span>Ethar )
          </h1>
        </Card>
      </div>

      <div className="w-80 flex gap-0 pt-4 items-start justify-start">
        <Input
          isDisabled={loading}
          className="inline-block"
          classNames={{
            inputWrapper: "rounded-tr-none rounded-br-none",
          }}
          type="text"
          label="Password"
          fullWidth
          size="sm"
          value={password}
          onValueChange={(value) => {
            if (passwordError) {
              setPasswordError(false);
            }
            setPassword(value);
          }}
          isInvalid={passwordError}
          errorMessage={passwordError ? "Invalid password" : ""}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="inline-block rounded-md rounded-tl-none rounded-bl-none text-sm"
          color={passwordError ? "danger" : "primary"}
          size="lg"
          onClick={handleSubmit}
          isDisabled={loading}
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

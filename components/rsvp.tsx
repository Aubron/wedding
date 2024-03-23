"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Checkbox } from "@nextui-org/checkbox";
import { about } from "@/components/primitives";
import { Key, useMemo, useState } from "react";
import { RsvpUser, UpdateUserInput } from "@/app/api/DataTypes";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const GET_USERS = gql`
  query GetGuests {
    getUsers {
      _id
      name_primary
      name_secondary
    }
  }
`;

const GET_USER_DETAILS = gql`
  query GetGuestDetails($id: ID!) {
    getUserInfo(id: $id) {
      _id
      name_primary
      name_secondary
      rsvpStatus
      vegan
      secondaryEditable
      veganSecondary
      rsvpSecondaryStatus
      hasRsvped
    }
  }
`;

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      _id
      name_primary
      name_secondary
      rsvpStatus
      vegan
      secondaryEditable
      veganSecondary
      rsvpSecondaryStatus
      hasRsvped
    }
  }
`;

interface GuestSearch {
  _id: string;
  name: string;
}

const Rsvp = () => {
  const router = useRouter();
  if (typeof window !== "undefined" && !localStorage.getItem("rsvp-password")) {
    router.push("/");
  }

  // the ID of the selected guest
  const [isGuestSelected, setIsGuestSelected] = useState(false);
  // query to get the list of guests
  const { data } = useQuery(GET_USERS);
  // query to eventually get the guest's info
  const [getGuestDetails, { data: guestData }] = useLazyQuery(GET_USER_DETAILS);
  const [updateUserInfo, { loading, data: updateData }] = useMutation(
    UPDATE_USER_INFO,
    {
      refetchQueries: [GET_USER_DETAILS],
    }
  );
  // stores a modified version of the guest list, so secondary names are searchable
  const [guestList, setGuestList] = useState<GuestSearch[]>([]);
  const [guestState, setGuestState] = useState<RsvpUser | null>(null);

  useMemo(() => {
    const newGuestList = [];
    for (let i = 0; i < data?.getUsers.length; i++) {
      newGuestList.push({
        _id: data?.getUsers[i]._id + "-1",
        name: data?.getUsers[i].name_primary,
      });
      if (data?.getUsers[i].name_secondary) {
        newGuestList.push({
          _id: data?.getUsers[i]._id + "-2",
          name: data?.getUsers[i].name_secondary,
        });
      }
    }
    setGuestList(newGuestList);
  }, [data]);

  // when a guest is selected, parse their true ID and get details
  const onSelectionChange = (id: Key) => {
    if (id) {
      // get the guest id without anything after the hyphen
      const newGuestId = id.toString().split("-")[0];
      if (newGuestId !== guestState?._id) {
        setGuestState(null);
      }
      setIsGuestSelected(true);
      getGuestDetails({ variables: { id: newGuestId } });
    } else {
      setIsGuestSelected(false);
      setGuestState(null);
    }
  };

  useMemo(() => {
    // we copy the guest data into a state variable so it can be changed
    console.log(updateData, isGuestSelected);
    if (guestData?.getUserInfo) {
      setGuestState(guestData.getUserInfo);
    }
  }, [guestData, updateData, isGuestSelected]);

  const onCheckboxChange = (property: string) => (value: boolean) => {
    if (guestState) {
      setGuestState({
        ...guestState,
        [property]: value,
      });
    }
  };

  const onSecondaryNameChange = (value: string) => {
    console.log(value);
    if (guestState) {
      setGuestState({
        ...guestState,
        name_secondary: value,
      });
    }
  };

  const onRsvp = async () => {
    if (!guestState) return;
    const input: UpdateUserInput = {
      name_secondary: guestState.name_secondary,
      rsvpStatus: guestState.rsvpStatus,
      vegan: guestState.vegan,
      veganSecondary: guestState.veganSecondary,
      rsvpSecondaryStatus: guestState.rsvpSecondaryStatus,
    };
    updateUserInfo({
      variables: {
        id: guestState?._id,
        input,
      },
    });
  };

  const updateRsvp = () => {
    if (guestState) {
      setGuestState({
        ...guestState,
        hasRsvped: false,
      });
    }
  };

  return (
    <>
      <Card className="col-span-8 sm:col-span-5 md:col-span-3 lg:col-span-2">
        <CardHeader className="flex justify-between items-start">
          <span className={about({ variant: "heading" })}>RSVP</span>
          <span className={about({ variant: "date" })}>By June 10</span>
        </CardHeader>
        <CardBody>
          <Autocomplete
            defaultItems={guestList}
            label="Guest Name"
            placeholder="Search for your name"
            onSelectionChange={onSelectionChange}
          >
            {(item: GuestSearch) => (
              <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete>
          {isGuestSelected && guestState && (
            <>
              {guestState.hasRsvped ? (
                <div className="pt-4 text-center">
                  <p
                    className={about({ variant: "value", padding: true })}
                  >{`RSVP Received`}</p>
                  <p className={about({ variant: "value" })}>
                    {`${guestState.name_primary} - ${
                      guestState.rsvpStatus ? "Attending" : "Not Attending"
                    }`}
                  </p>
                  {guestState.name_secondary && (
                    <p className={about({ variant: "value" })}>
                      {`${guestState.name_secondary} - ${
                        guestState.rsvpSecondaryStatus
                          ? "Attending"
                          : "Not Attending"
                      }`}
                    </p>
                  )}
                  <Button className="mt-4" fullWidth onClick={updateRsvp}>
                    Update RSVP
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-[1fr,auto,auto] pt-4 gap-1 px-2">
                    <div className="text-foreground-400 text-xs ">Name</div>
                    <div className="text-foreground-400 text-xs text-center">
                      RSVP
                    </div>
                    <div className="text-foreground-400 text-xs text-center">
                      Veg/Vegan
                    </div>
                    <div className="h-12 mt-2">{guestState.name_primary}</div>
                    <div className="text-center">
                      <Checkbox
                        className="ml-1 mt-1"
                        aria-labelledby="rsvp-status"
                        isSelected={guestState.rsvpStatus}
                        onValueChange={onCheckboxChange("rsvpStatus")}
                      />
                    </div>
                    <div className="text-center">
                      <Checkbox
                        className="ml-1 mt-1"
                        aria-labelledby="vegan-status"
                        isSelected={guestState.vegan}
                        onValueChange={onCheckboxChange("vegan")}
                      />
                    </div>
                    {!guestState.secondaryEditable &&
                    guestState.name_secondary ? (
                      <>
                        <div className="h-12">{guestState.name_secondary}</div>
                        <div className="text-center">
                          <Checkbox
                            className="ml-1 mt-1"
                            aria-labelledby="rsvp-status"
                            isSelected={guestState.rsvpSecondaryStatus}
                            onValueChange={onCheckboxChange(
                              "rsvpSecondaryStatus"
                            )}
                          />
                        </div>
                        <div className="text-center">
                          <Checkbox
                            className="ml-1 mt-1"
                            aria-labelledby="vegan-status"
                            isSelected={guestState.veganSecondary}
                            onValueChange={onCheckboxChange("veganSecondary")}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-12">
                          <Input
                            className="-ml-2"
                            size="sm"
                            placeholder="Your +1"
                            aria-labelledby="rsvp-name"
                            value={guestState.name_secondary}
                            onValueChange={onSecondaryNameChange}
                            onKeyDown={(e) => {
                              console.log(e);
                            }}
                          />
                        </div>
                        <div className="text-center">
                          <Checkbox
                            className="ml-1 mt-1"
                            aria-labelledby="rsvp-status"
                            isSelected={guestState.rsvpSecondaryStatus}
                            onValueChange={onCheckboxChange(
                              "rsvpSecondaryStatus"
                            )}
                          />
                        </div>
                        <div className="text-center">
                          <Checkbox
                            className="ml-1 mt-1"
                            aria-labelledby="vegan-status"
                            isSelected={guestState.veganSecondary}
                            onValueChange={onCheckboxChange("veganSecondary")}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <Button
                    className="mt-4"
                    color="primary"
                    size="md"
                    isLoading={loading}
                    onClick={onRsvp}
                  >
                    RSVP
                  </Button>
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default Rsvp;

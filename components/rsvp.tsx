"use client";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Checkbox } from "@nextui-org/checkbox";
import { about } from "@/components/primitives";
import { Key, useEffect, useMemo, useState } from "react";
import { RsvpUser } from "@/app/api/DataTypes";
import { gql, useQuery } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { useFilter } from "@react-aria/i18n";
import { Input } from "@nextui-org/input";

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
    }
  }
`;

interface GuestSearch {
  _id: string;
  name: string;
}

const Rsvp = () => {
  const [guestId, setGuestId] = useState<string | null>(null);
  const [guest, setGuest] = useState<RsvpUser>();
  const { loading, error, data } = useQuery(GET_USERS);
  const [getGuestDetails, { data: guestData }] = useLazyQuery(GET_USER_DETAILS);
  const [guestList, setGuestList] = useState<GuestSearch[]>([]);

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

  const onSelectionChange = (id: Key) => {
    if (id) {
      // get the guest id without anything after the hyphen
      const newGuestId = id.toString().split("-")[0];
      setGuestId(newGuestId);
      getGuestDetails({ variables: { id: newGuestId } });
    } else {
      setGuestId(null);
    }
  };

  useMemo(() => {
    if (data) {
      const guests = data.getUsers as RsvpUser[];
      const guest = guests.find((guest: RsvpUser) => guest._id === guestId);
      setGuest(guest);
    }
  }, [guestId, data]);

  console.log(guestData);

  let guestInfo: RsvpUser | null = null;
  if (guestData) {
    guestInfo = guestData.getUserInfo;
  }

  return (
    <>
      <Card className="col-span-4">
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
        </CardBody>
      </Card>
      {guestId && guestInfo && (
        <Table className="col-span-4">
          <TableHeader
            columns={[
              { key: "name", label: "Name" },
              { key: "RSVP", label: "RSVP" },
              { key: "vegan", label: "Vegan" },
            ]}
          >
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{guestInfo.name_primary}</TableCell>
              <TableCell>
                <Checkbox isSelected={guestInfo.rsvpStatus} />
              </TableCell>
              <TableCell>
                <Checkbox isSelected={guestInfo.vegan} />
              </TableCell>
            </TableRow>
            {guestData?.getUserInfo.name_secondary ? (
              <TableRow>
                <TableCell>{guestData?.getUserInfo.name_secondary}</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>
                  <Input />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Rsvp;

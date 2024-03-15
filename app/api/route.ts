import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextApiRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("rsvp");
        const people = await db
            .collection("people")
            .find({})
            .limit(10)
            .toArray();
        return NextResponse.json(people);
    } catch (e) {
        console.error(e);
    }
}

// To handle a POST request to /api
export async function POST(request: NextApiRequest) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
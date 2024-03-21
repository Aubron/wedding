import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { gql } from "graphql-tag";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
import { RsvpUser } from "./DataTypes";
import { ObjectId } from "mongodb";

// Same logic to add a `PATCH`, `DELETE`...
const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const client = await clientPromise;
        const db = client.db("rsvp");
        const people = await db
          .collection<RsvpUser>("people")
          .find({})
          .toArray();
        return people;
      } catch (e) {
        console.error(e);
      }
    },
    getUserInfo: async (_: any, { id }: { id: string }) => {
      try {
        const client = await clientPromise;
        const db = client.db("rsvp");
        const person = await db
          .collection("people")
          .findOne({ _id: new ObjectId(id) });
        return person;
      } catch (e) {
        console.error(e);
      }
    },
  },
  Mutation: {
    checkAuth: () => true,
  },
};

const typeDefs = gql`
  type Query {
    getUsers: [RsvpUser]!
    getUserInfo(id: ID!): RsvpUser
  }

  type Mutation {
    checkAuth: Boolean
  }

  type RsvpUser {
    _id: ID!
    name_primary: String!
    name_secondary: String
    hasVisited: Boolean!
    hasRsvped: Boolean!
    rsvpStatus: Boolean!
    vegan: Boolean!
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({})
      : ApolloServerPluginLandingPageLocalDefault({
          headers: {
            "x-rsvp-password": process.env.RSVP_PASSWORD || "",
          },
          document: "mutation { checkAuth }",
        }),
  ],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

const graphql = (req: NextRequest, res: NextResponse) => {
  if (
    req.method === "POST" &&
    req.headers.get("x-rsvp-password") !== process.env.RSVP_PASSWORD
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // @ts-ignore
  return handler(req, res) as Promise<Response>;
};
export { handler as GET, graphql as POST };

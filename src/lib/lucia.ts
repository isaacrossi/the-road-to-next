import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { prisma } from "./prisma";

// adapter from the prisma adapter package not from our prisma
// this is why we have to pass prisma.session and prisma.user to the adapter
// user and session were defined in our prisma schema earlier
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// whenever we use lucia we export it from the file and behind the scenes we are using the prisma adapter and this adapter
// knows about our session and user in the db
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  // this tells lucia what user attributes to pull from our user table
  // this is important for things like session management
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
    };
  },
});

// IMPORTANT!
// Type safety
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  email: string;
}

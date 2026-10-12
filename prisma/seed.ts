import "dotenv/config";
import { hash } from "@node-rs/argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
    firstName: "Admin",
    lastName: "Admin",
  },
  {
    username: "user",
    email: process.env.EMAIL!,
    firstName: "User",
    lastName: "User",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const comments = [
  { content: "This is the first comment from the database" },
  { content: "This is the second comment from the database" },
  { content: "This is the third comment from the database" },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Seeding database...");

  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("geheimnis");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      ticketId: dbTickets[0].id,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`Database seeded in ${(t1 - t0).toFixed(2)} milliseconds.`);
};

seed();

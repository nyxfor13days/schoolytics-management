import { type NextRequest } from "next/server";
import { MongoClient, type MongoClientOptions } from "mongodb";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { resolvers } from "./resolvers";
import { readFileSync } from "fs";

// Connect to MongoDB
const options: MongoClientOptions = {
  appName: "Institute Management System",
  connectTimeoutMS: 10000,
};

const client = new MongoClient(process.env.MONGODB_URI || "", options);

// Databases
const db = client.db(process.env.MONGO_DB_NAME);

// Collections
export const users = db.collection("users");
export const students = db.collection("students");
export const teachers = db.collection("teachers");

// Create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs: readFileSync("./pages/api/schema.graphql", "utf-8"),
  resolvers: resolvers,
});

export default startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

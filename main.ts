import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { FlightModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";


const mongo_url = Deno.env.get("MONGO_URL");
if (!mongo_url) {
  console.info(MONGO_URL);
  throw new Error("Please provide a MONGO_URL");
}
const client = new MongoClient(mongo_url);
await client.connect();
console.log("Conectado correctamente");

const db = client.db("flights");
const FlightCollection = db.collection<FlightModel>("flights");


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ flightCollection:FlightCollection }), 
});

console.info(`Server ready at ${url}`);
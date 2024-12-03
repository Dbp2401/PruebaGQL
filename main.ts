import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { FlightModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";


const  MONGO_URL = "mongodb+srv://otheruser:123456aabbb@nebrija-cluster.goq2s.mongodb.net/?retryWrites=true&w=majority&appName=Nebrija-Cluster";
if (!MONGO_URL) {
  console.info(MONGO_URL);
  throw new Error("Please provide a MONGO_URL");
}
const client = new MongoClient(MONGO_URL);
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
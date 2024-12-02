import { ObjectId, type Collection } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { fromModelToFlight } from "./utils.ts";
export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      __: unknown,
      context: { flightCollection: Collection<FlightModel> }
    ): Promise<Flight[]> => {
      const flightDB = await context.flightCollection.find().toArray();
      return flightDB.map((flightDB) => fromModelToFlight(flightDB));
    },

    getFlight: async (
      _: unknown,
      args: { id: string },
      context: { flightCollection: Collection<FlightModel> }
    ): Promise<Flight | null> => {
      const flightDB = await context.flightCollection.findOne({
        _id: new ObjectId(args.id),
      });
      if (!flightDB) return null;
      return fromModelToFlight(flightDB);
    },
  },

  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origin: string; destination: string; date: string },
      context: { flightCollection: Collection<FlightModel> }
    ): Promise<Flight> => {
      const { insertedId } = await context.flightCollection.insertOne(args);
      const flightModel = {
        _id: insertedId,
        origin: args.origin,
        destination: args.destination,
        date: args.date,
      };
      return fromModelToFlight(flightModel);
    },

    deleteFlight: async (
      _: unknown,
      args: { id: string },
      context: { flightCollection: Collection<FlightModel> }
    ): Promise<boolean> => {
      const { deletedCount } = await context.flightCollection.deleteOne({
        _id: new ObjectId(args.id),
      });
      if (deletedCount === 0) return false;
      else return true;
    },

    modifyFlight: async (
      _: unknown,
      args: { id: string; origin: string; destination: string; date: string },
      context: { flightCollection: Collection<FlightModel> }
    ): Promise<Flight | null> => {
      const updateFields: Partial<FlightModel> = {};
      if (args.origin) updateFields.origin = args.origin;
      if (args.destination) updateFields.destination = args.destination;
      if (args.date) updateFields.date = args.date;
      const result = await context.flightCollection.updateOne(
        { _id: new ObjectId(args.id) },
        { $set: updateFields }
      );

      if (result.matchCount === 0) return null;

      const updatedFlight = await context.flightCollection.findOne({
        _id: new ObjectId(args.id),
      });
      return updatedFlight ? fromModelToFlight(updatedFlight) : null;
    },
  },
};

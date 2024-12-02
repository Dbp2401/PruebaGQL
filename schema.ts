export const schema = `#graphql
    type Flight {
        id:ID!,
        origin:String!,
        destination:String!,
        date:String!,
    }

    type Query{
        getFlights:[Flight!]!
        getFlight(id:ID!):Flight
    }

    type Mutation{
        addFlight(origin:String!,destination:String!,date:String!):Flight!
        deleteFlight(id:ID!):Boolean
        modifyFlight(id:ID!, origin:String, destination:String, date:String):Flight!
    }
`;
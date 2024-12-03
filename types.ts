import { OptionalId } from "mongodb";

export  type Flight = {
    id:string,
    origin:string,
    destination:string,
    date:string,
};

export  type FlightModel =  OptionalId <{
    origin:string,
    destination:string,
    date:string,
}>;
import { OptionalId } from "mongodb";

export const type Flight = {
    id:string,
    origin:string,
    destination:string,
    date:string,
}

export const type FlightModel =  OptionalId <{
    origin:string,
    destination:string,
    date:string,
}>
import { Trip } from "@/domain/TripList";

export interface TripInfoProp {
    token: string
    tripInfo: Trip
    content: string
}
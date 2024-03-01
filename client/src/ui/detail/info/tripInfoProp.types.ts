import { Trip } from '@/domain/TripList';
import { TripPlaceInfo } from '@/domain/TripPlaceInfo';

export interface TripInfoProp {
  token: string;
  tripInfo: Trip;
  content: string;
  searchPlaceList?: TripPlaceInfo[];
}

import { Trip } from '@/types/TripList';

export const updateTripInfo = (prevInfo: Trip, key: keyof Trip, value) => ({
  ...prevInfo,
  [key]: value,
});

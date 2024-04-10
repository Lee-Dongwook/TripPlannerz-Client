import type { PreferenceName } from '@/types/Preference';

export interface Member {
  name?: string;
  gender?: string;
  email?: string;
  pw?: string;
  types?: PreferenceName[];
}

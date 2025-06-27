export interface City {
  name: string;
  state?: {
    name: string;
  };
}

export interface Address {
  id?: number;
  city?: City;
}

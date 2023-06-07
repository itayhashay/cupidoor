export type City = {
  _id: number;
  city_id: string;
  city_name: string;
}

export type Street = {
  city_id: string;
  street_name: string;
  street_id: string;
}
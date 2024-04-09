import { IBooking, ICar } from "./icar";
export class Car implements ICar{
    id: number;
  maker: string;
  model: string;
  price: number;
  status: boolean;
  image: string;
  bookings: IBooking[]=[];
}
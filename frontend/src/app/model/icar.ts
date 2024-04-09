export interface ICar{
    id:number;
    maker:string;
    model:string;
    price:number;
    status:boolean;
    image:string; 
    bookings: IBooking[];
}

export interface IBooking {
    startDate: string;
    endDate: string;
  }

// rental-agreement.model.ts

export interface RentalAgreement {
    id: number;
    userEmail: string;
    carId: number;
    startDate: string; // You can use Date type if needed
    endDate: string;   // You can use Date type if needed
    maker:string;
    model:string;
    price:number;
    status:boolean;
    image:string;
  }
  
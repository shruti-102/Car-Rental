import { Injectable } from '@angular/core';
import { RentalAgreement } from '../model/rental-agreement';

@Injectable({
  providedIn: 'root'
})
export class RentalAgreementService {

  private rentalAgreements:RentalAgreement[]=[];

  createRentalAgreement(
    userEmail:string,
    carId:number,
    startDate: string,
    endDate: string,
    maker: string,
    model: string,
    price: number,
    status: boolean,
    image:string
  ){
    const id=this.rentalAgreements.length+1;

    const rentalAgreement:RentalAgreement={
      id,
      userEmail,
      carId,
      startDate,
      endDate,
      maker,
      model,
      price,
      status,
      image
    };
    this.rentalAgreements.push(rentalAgreement);
  }

  constructor() {
    const storedAgreements=localStorage.getItem('rentalAgreements');
    if(storedAgreements){
      this.rentalAgreements=JSON.parse(storedAgreements);
    }
  }

  addRentalAgeement(agreement:RentalAgreement): void{
    this.rentalAgreements.push(agreement);
    this.saveRentalAgreements();
  }

  getRentalAgreementForUser(userEmail:string):RentalAgreement[]{
    return this.rentalAgreements.filter((agreement)=>agreement.userEmail==userEmail)
  }

  private saveRentalAgreements():void{
    localStorage.setItem('rentalAgreements',JSON.stringify(this.rentalAgreements));
  }

  markAsReturned(agreementId: number): void {
    const agreement = this.rentalAgreements.find(a => a.id === agreementId);
    if (agreement) {
      agreement.status = false;
      this.saveRentalAgreements();
    }
  }

  getPendingRentalAgreements(): RentalAgreement[] {
    return this.rentalAgreements.filter((agreement) => agreement.status);
  }
  
}

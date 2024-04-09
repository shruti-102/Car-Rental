import { Component, OnInit } from '@angular/core';
import { RentalAgreementService } from 'src/app/services/rental-agreement.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  pendingRentalAgreements: any[]; // Define the type based on your RentalAgreement model

  constructor(private rentalAgreementService: RentalAgreementService,private dataService:DataService) { }

  ngOnInit(): void {
    // Load pending rental agreements from your service
    this.loadPendingRentalAgreements();
  }

  loadPendingRentalAgreements() {
    // Retrieve pending rental agreements from your service
    this.pendingRentalAgreements = this.rentalAgreementService.getPendingRentalAgreements();
  }

  approveAgreement(agreementId: number) {

    const selectedAgreement = this.pendingRentalAgreements.find(
      (agreement) => agreement.id === agreementId
    );

    if (selectedAgreement) {
      // Call the car service to remove booking dates
      this.dataService.removeBookingDatesFromCar(
        selectedAgreement.carId,
        selectedAgreement.startDate,
        selectedAgreement.endDate
      );
    // Handle the approval logic here, e.g., call a service method
    this.rentalAgreementService.markAsReturned(agreementId);
    
    // this.pendingRentalAgreements = this.pendingRentalAgreements.filter(
    //   (agreement) => agreement.id !== agreementId
    // );

    // Refresh the list of pending rental agreements
    this.loadPendingRentalAgreements();
  }
}
}

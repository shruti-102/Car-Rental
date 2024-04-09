import { Component, OnInit } from '@angular/core';
import { RentalAgreementService } from '../services/rental-agreement.service';
import { RentalAgreement } from '../model/rental-agreement';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-my-rental-aggrements',
  templateUrl: './my-rental-aggrements.component.html',
  styleUrls: ['./my-rental-aggrements.component.css'],
})
export class MyRentalAggrementsComponent implements OnInit {
  userEmail: string | null;
  rentalAgreements: RentalAgreement[] = [];
  displayedRentalAgreements: RentalAgreement[] = [];

  constructor(
    private rentalAgreementService: RentalAgreementService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {
    const loggedInUser = this.authService.getLoggedInUser();
    this.userEmail = loggedInUser ? loggedInUser.email : null;
  }

  ngOnInit() {
    this.loadRentalAgreements();
  }

  loadRentalAgreements() {
    // Fetch rental agreements and populate the rentalAgreements array.
    this.rentalAgreements = this.rentalAgreementService.getRentalAgreementForUser(this.userEmail);
    this.filterDisplayedAgreements();
  }

  filterDisplayedAgreements() {
    // Filter out agreements that are not approved
    this.displayedRentalAgreements = this.rentalAgreements.filter(
      (agreement) => agreement.status
    );
  }

  returnCar(agreementId: number) {
    this.rentalAgreementService.markAsReturned(agreementId);
    this.loadRentalAgreements();
    this.alertify.success(
      'Car return request initiated. Waiting for admin inspection.'
    );
  }
}

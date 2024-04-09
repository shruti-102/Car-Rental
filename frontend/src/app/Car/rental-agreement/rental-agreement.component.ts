import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';
import { ICar } from 'src/app/model/icar';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RentalAgreement } from 'src/app/model/rental-agreement';
import { RentalAgreementService } from 'src/app/services/rental-agreement.service';

@Component({
  selector: 'app-rental-agreement',
  templateUrl: './rental-agreement.component.html',
  styleUrls: ['./rental-agreement.component.css'],
})
export class RentalAgreementComponent {
  car: ICar | null;
  startDate: Date;
  endDate: Date;
  totalPrice:number;
  // public carId:number;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private dataService: DataService,
    private authService: AuthService,
    private rentalAgreementService: RentalAgreementService,

    private toastr: ToastrService
  ) {}

  numberOfDays = this.dataService.getRentDays();

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    console.log(carId);

    if (carId) {
      this.rentalService
        .getCarById(Number(carId))
        .subscribe((data: ICar | null) => {
          if (data) {
            this.car = data;
            this.startDate = new Date(); // Replace with your logic for start date
            this.endDate = new Date();
            if (this.numberOfDays)
              this.endDate.setDate(this.endDate.getDate() + this.numberOfDays);
          } else {
            console.log('NULL VALUE');
          }
        });
    }
  }

  editAgreement(): void {
    // Navigate to the agreement edit page, if needed
    // Example: this.router.navigate(['/edit-agreement', this.car?.id]);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  bookCar(): void {
    // Implement booking logic
    const carId = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.addBookingDates(
      carId,
      this.startDate.toISOString(),
      this.endDate.toISOString()
    );
    // this.toastr.success('Car successfully booked!', 'Success');
    console.log(this.car?.bookings);
    const loggedInUser = this.authService.getLoggedInUser();
    const userEmail = loggedInUser ? loggedInUser.email : null;
    const { maker, model, price } = this.car;
    const startDate = this.formatDate(this.startDate);
    const endDate = this.formatDate(this.endDate);
    const status=true;
    const image=this.car.image;
    
    this.rentalAgreementService.createRentalAgreement(
      userEmail,
      carId,
      startDate,
      endDate,
      maker,
      model,
      this.totalPrice,
      status,
      image
    );
  }
  calculateTotalPrice(): number {
    if (this.numberOfDays) return this.totalPrice=((this.car?.price || 0) * this.numberOfDays);
    return 0;
  }
}

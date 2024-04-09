import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { ICar } from './model/icar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Car-Rental';
  userIsAdmin:boolean;

  constructor(private dataService: DataService,private authService:AuthService) {
    const loggedInUser=this.authService.getLoggedInUser();
    this.userIsAdmin=loggedInUser?loggedInUser.isAdmin:false;
    //console.log('APP-COMPONENT',this.userIsAdmin)
  }

  onCheckAvailability(args:{days: number,filterCars:ICar[]}) {
    this.dataService.setRentDays(args.days);
    this.dataService.filterAvailableCars(args.filterCars);
    // this.rentDays = days;
    // this.availableCars = this.filterAvailableCars(this.Cars);
    //console.warn(days);
  }
}

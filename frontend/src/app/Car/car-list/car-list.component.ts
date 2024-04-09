import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { ICar } from 'src/app/model/icar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  filteredCars: ICar[] = [];
  Cars: Array<ICar>;
  rentDays: number | null;
  availableCars: Array<ICar>;
  
  makerFilter: string = '';
  modelFilter: string = '';
  priceFilter: number;

  makerList:string[];
  modelList:string[];
  priceList:number[];

  constructor(private rentalService: RentalService,private dataService: DataService) {}

  ngOnInit(): void {
    
    this.rentalService.getAllCars().subscribe(
      (data) => {
        this.Cars = data;
        this.filteredCars=data;
        this.filterAvailableCars(this.Cars);
        this.makerList = Array.from(new Set(data.map((car) => car.maker)));
        this.modelList = Array.from(new Set(data.map((car) => car.model)));
        this.priceList = [1000, 2000,3000, 5000, 10000];

        console.log('Data',data);
        console.log('Maker',this.makerList);
        console.log('Model',this.modelList);
      },
      (error) => {
        console.log(error);
      }
    );
    this.dataService.filteredCars$.subscribe((cars)=>{
      this.filteredCars=cars;
    });
    
    //console.log('Rent days Init',this.rentDays);
    
  }
  
  // onCheckAvailability(days: number) {
  //   this.dataService.setRentDays(days);
  //   this.rentDays = days;
  //   this.availableCars = this.filterAvailableCars(this.Cars);
  //   console.warn(days);
  // }

  // applyFilters(maker: string, model: string, price: string): void {
  //   // Apply filters based on maker, model, and price
  //   this.availableCars = this.Cars.filter((car) => {
  //     const passesMakerFilter = !this.makerFilter || car.maker === this.makerFilter;
  //     const passesModelFilter = !this.modelFilter || car.model === this.modelFilter;
  //     const passesPriceFilter =
  //     !this.priceFilter ||
  //     (this.priceFilter === 5000 && car.price < 5000) ||
  //     (this.priceFilter === 10000 && car.price >= 5000 && car.price < 10000) ||
  //     (this.priceFilter === 15000 && car.price >= 10000 && car.price < 15000);

  //     return passesMakerFilter && passesModelFilter && passesPriceFilter;
  //   });
  // }
  
  // applyFilters(): void {
  //   this.availableCars = this.Cars.filter((car) => {
  //     const passesMakerFilter = !this.makerFilter || car.maker === this.makerFilter;
  //     const passesModelFilter = !this.modelFilter || car.model === this.modelFilter;
  //     const passesPriceFilter =
  //       !this.priceFilter ||
  //       (this.priceFilter === 5000 && car.price < 5000) ||
  //       (this.priceFilter === 10000 && car.price >= 5000 && car.price < 10000) ||
  //       (this.priceFilter === 15000 && car.price >= 10000 && car.price < 15000);

  //     const availableCars = this.filterAvailableCars(this.availableCars || this.Cars);
  //     this.availableCars = availableCars.filter((car) => {
  //       return passesMakerFilter && passesModelFilter && passesPriceFilter;
  //     });
  //   });
  // }
  
  // filterCarsBasedOnFilters() {
  //   let filteredCars = this.Cars;

  //   filteredCars = this.dataService.filterByMaker(filteredCars, this.makerFilter);
  //   filteredCars = this.dataService.filterByModel(filteredCars, this.modelFilter);
  //   filteredCars = this.dataService.filterByPriceRange(filteredCars, this.priceFilter);

  //   this.availableCars = filteredCars;
  // }

  filterAvailableCars(cars: Array<ICar>)  {
    /*this.rentDays=this.dataService.getRentDays();
    console.log('Rent days',this.rentDays);
    if (this.rentDays === null || this.rentDays===0) {
      return cars;
    }
    const currentDate = new Date(); // Get the current date
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + this.rentDays);
    console.log("currentDate", currentDate)
    console.log("endDate",endDate)
    return cars.filter((car) => {
      // Check if the car has no bookings or if all bookings are outside the selected date range
      return (
        !car.bookings ||
        car.bookings.every((booking) => {
          const bookingStartDate = new Date(booking.startDate);
          const bookingEndDate = new Date(booking.endDate);
          return (
            (bookingStartDate < currentDate && bookingEndDate <= currentDate) ||
            (bookingStartDate >= endDate)
          );
        })
      );
    });*/

    this.availableCars=this.dataService.filterAvailableCars(this.Cars);
  }
}

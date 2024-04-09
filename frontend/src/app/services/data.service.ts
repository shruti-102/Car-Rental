import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICar, IBooking } from '../model/icar';
import { RentalService } from './rental.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private filteredCarsSubject = new BehaviorSubject<ICar[]>([]);
  filteredCars$ = this.filteredCarsSubject.asObservable();

  setFilteredCars(cars: ICar[]): void {
    this.filteredCarsSubject.next(cars);
  }

  private cars: ICar[] = [];
  private carsSubject = new BehaviorSubject<ICar[]>(this.cars);

  constructor(private rentalService: RentalService, private http: HttpClient) {}
  private rentDays: number | null = null;

  fetchMakers() {
    return this.http.get<string[]>(
      'https://localhost:7242/api/Rental/api/makers'
    );
  }

  fetchModels(makerId: number) {
    return this.http.get<string[]>(
      'https://localhost:7242/api/Rental/api/models?makerId=' + makerId
    );
  }

  setRentDays(rentDays: number) {
    this.rentDays = rentDays;
  }

  getRentDays(): number | null {
    return this.rentDays;
  }

  getCars() {
    return this.carsSubject.asObservable();
  }

  async addBookingDates(carId: number, startDate: string, endDate: string) {
    // console.log('Car id:',carId);
    // const car = this.cars.find((c) => c.id === carId);
    // console.log(car);

    // if (car) {
    //   console.log('23');
    //   // Create a new booking object
    //   const booking :IBooking={
    //     startDate:startDate,
    //     endDate:endDate
    //   };

    //   // Push it to the car's bookings array
    //   if (!car.bookings) {
    //     car.bookings = [];
    //   }
    //   car.bookings.push(booking);

    //   // Notify subscribers of the data change
    //   this.carsSubject.next(this.cars);
    try {
      const car = await this.rentalService.getCarById(carId).toPromise();
      if (car) {
        const booking: IBooking = {
          startDate: startDate,
          endDate: endDate,
        };

        if (!car.bookings) {
          car.bookings = [];
        }
        car.bookings.push(booking);

        this.carsSubject.next(...[this.cars]);

        console.log(car.bookings);
      } else {
        console.log('Car not found for id:', carId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeBookingDatesFromCar(
    carId: number,
    startDate: string,
    endDate: string
  ): void {
    this.getCars().subscribe((cars: ICar[]) => {
      const car = cars.find((car) => car.id === carId);

      if (car) {
        car.bookings = car.bookings.filter((booking) => {
          // Remove bookings that overlap with the given date range
          const bookingStartDate = new Date(booking.startDate);
          const bookingEndDate = new Date(booking.endDate);
          const rangeStartDate = new Date(startDate);
          const rangeEndDate = new Date(endDate);

          return (
            bookingStartDate >= rangeEndDate || bookingEndDate <= rangeStartDate
          );
        });
      }
    });
  }

  filterAvailableCars(cars: ICar[]): ICar[] {
    if (this.rentDays === null || this.rentDays === 0) {
      return cars;
    }

    const currentDate = new Date(); // Get the current date
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + this.rentDays);

    return cars.filter((car) => {
      return (
        !car.bookings ||
        car.bookings.every((booking) => {
          const bookingStartDate = new Date(booking.startDate);
          const bookingEndDate = new Date(booking.endDate);

          return (
            (bookingStartDate < currentDate && bookingEndDate <= currentDate) ||
            bookingStartDate >= endDate
          );
        })
      );
    });
  }

  filterByMaker(cars: ICar[], maker: any): ICar[] {
    //console.log(maker);
    if (!maker) {
      return cars;
    }
    return cars.filter((car) => car.maker === maker);
  }

  filterByModel(cars: ICar[], model: any): ICar[] {
    console.log(model);
    if (!model) {
      return cars;
    }

    return cars.filter((car) => car.model === model);
  }

  filterByPriceRange(cars: ICar[], price: number | string): ICar[] {
    console.log(price);

    // Convert price to a number
    const priceValue = parseFloat(price.toString());

    if (isNaN(priceValue)) {
      // Handle the case where price is not a valid number
      return cars;
    }

    if (priceValue === 1000) {
      return cars.filter((car) => car.price < 1000);
    } else if (priceValue === 2000) {
      return cars.filter((car) => car.price >= 1000 && car.price < 2000);
    } else if (priceValue === 3000) {
      return cars.filter((car) => car.price >= 2000 && car.price < 3000);
    } else if (priceValue === 4000) {
      return cars.filter((car) => car.price >= 3000 && car.price < 4000);
    } else if (priceValue === 5000) {
      return cars.filter((car) => car.price >= 4000 && car.price < 5000);
    } else {
      // Handle other price ranges as needed
      return cars;
    }
  }
}

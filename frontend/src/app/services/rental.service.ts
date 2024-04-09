import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICar } from 'src/app/model/icar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http:HttpClient) { }

  getCarById(id: number){
    return this.getAllCars().pipe(
      map(cars => {
        const car = cars.find(c => c.id === id);
        return car || null;
      })
    );
  }
  
    getAllCars():Observable<ICar[]>{
      //return this.http.get('data/cars.json').pipe(
    //     map((data:any)=>{
    //       const carsArray: Array<ICar>=[];
    //       for(const id in data){
    //         if(data.hasOwnProperty(id)){
    //           carsArray.push(data[id]);
    //         }
    //       }
    //       return carsArray;
    //     })
    //   );   
    // }  
    const apiUrl = 'https://localhost:7242/api/Rental/GetCarList'; // Replace with your API endpoint
    return this.http.get<ICar[]>(apiUrl);
  }
}

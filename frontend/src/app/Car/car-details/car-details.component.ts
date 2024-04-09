import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { ICar } from 'src/app/model/icar';
import { RentalService } from 'src/app/services/rental.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{
  @Input()
  car: ICar;
  //car: ICar | null;
  public carId:number;
  constructor(private route:ActivatedRoute,private router:Router,private rentalService:RentalService,private dataService:DataService){
    this.car=null;
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      const carId=parseInt(params.get('id') || '0',10);

      this.rentalService.getCarById(carId).subscribe(result=>{
        this.car=result;
      });
    });
  }

  onBack(){
    this.router.navigate(['/'])
  }

  // bookCar() {
  //   // Navigate to the agreement page
  //   this.router.navigate(['/agreements']);
  // }

  bookCar(): void {
    // Get the car ID from route parameters
    const carId = this.route.snapshot.paramMap.get('id');

    // Redirect to the rental agreement page with the car ID as a parameter
    this.router.navigate(['/rental-agreement', carId]);
  }

}

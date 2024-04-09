import { Component, Input } from '@angular/core';
import { ICar } from 'src/app/model/icar';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input()
  car: ICar;
  @Input() rentalDays: number | null = null;
}

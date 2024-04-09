import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message:String){
    alertify.success(message);
  }

  warning(message:String){
    alertify.warning(message);
  }

  error(message:String){
    alertify.error(message);
  }
}

import { Component } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  loggedinUser:string;
  constructor(private alertify:AlertifyService){}
  
  loggedin(){
    // return localStorage.getItem('token');
    this.loggedinUser=localStorage.getItem('token');
    return this.loggedinUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success('Successfully loged out');
  }

}

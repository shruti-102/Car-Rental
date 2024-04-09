import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { CarCardComponent } from './Car/car-card/car-card.component';
import { CarListComponent } from './Car/car-list/car-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {HttpClientModule} from '@angular/common/http';
import { RentalService } from './services/rental.service';
import {Routes,RouterModule} from '@angular/router';
import { RentalAgreementComponent } from './Car/rental-agreement/rental-agreement.component';
import { CarDetailsComponent } from './Car/car-details/car-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { ToastrModule } from 'ngx-toastr';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { MyRentalAggrementsComponent } from './my-rental-aggrements/my-rental-aggrements.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './admin/admin-auth.guard';
import { InspectionComponent } from './admin/inspection/inspection.component';
import { RentalAgreementService } from './services/rental-agreement.service';


const appRoutes:Routes=[
  {path:'',component:CarListComponent},
  {path:'rental-agreement',component:RentalAgreementComponent},
  {path:'car-details/:id',component:CarDetailsComponent},
  {path:'my-rental-aggrements',component:MyRentalAggrementsComponent},
  {path:'rental-agreement/:id',component:RentalAgreementComponent},
  {path:'user/login',component:UserLoginComponent},
  {path:'user/register',component:UserRegisterComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AdminAuthGuard]},
  {path:'inspection',component:InspectionComponent},
  {path:'**',component:PageNotFoundComponent},
  
]

@NgModule({
  declarations: [
    AppComponent,
    CarCardComponent,
    CarListComponent,
    NavBarComponent,
    RentalAgreementComponent,
    CarDetailsComponent,
    CarDetailsComponent,
    PageNotFoundComponent,
    LogInComponent,
    UserLoginComponent,
    UserRegisterComponent,
    MyRentalAggrementsComponent,
    AdminDashboardComponent,
    InspectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    RentalService,
    UserService,
    AlertifyService,
    AuthService,
    RentalAgreementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

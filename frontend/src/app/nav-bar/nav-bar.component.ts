import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { ICar } from '../model/icar';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  Cars: Array<ICar>;
  numberOfDays: number;
  loggedinUser: string;

  makerOptions: { id: number, name: string }[] = [];
  modelOptions: any[] = [];

  makerFilter: any = '';
  modelFilter: any = '';
  priceFilter: number;

  filterCars: Array<ICar>

  @Output() onCheckAvailability: EventEmitter<{ days: number; filterCars: ICar[] }> = new EventEmitter<{ days: number; filterCars: ICar[] }>();
  @Input() userIsAdmin: boolean = false;
  @Output() onFilterChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private dataService: DataService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.priceFilter=0;
    this.rentalService.getAllCars().subscribe(
      (data) => {
        this.Cars = data;
      })
    this.authService.LoggedIn$.subscribe((loggedIn) => {
      // Update userIsAdmin based on the login status
      this.userIsAdmin = loggedIn
        ? this.authService.getLoggedInUser().isAdmin
        : false;
      console.log('Admin navbar', this.userIsAdmin);
    });
    this.fetchMakerOptions();  
  }

  fetchMakerOptions() {
    // Call the DataService method to fetch maker options
    this.dataService.fetchMakers().subscribe(
      (makers: any[]) => {
        // Assign the fetched options to makerOptions
        this.makerOptions = makers.map((maker)=>({
          id:maker.id,
          name:maker.name,
        }));
      },
      (error) => {
        console.error('Error fetching maker options', error);
      }
    );
  }

  onMakerSelectionChange() {
    if (this.makerFilter) {
      const selectedMakerName = this.makerFilter;
      // You can now use the selectedMakerId as needed
      console.log('Selected Maker ID:', selectedMakerName);
      const selectedMaker = this.makerOptions.find((maker) => maker.name === selectedMakerName);
      // Fetch model options based on the selected maker ID here if needed

      if(selectedMaker){
        const selectedMakerId=selectedMaker.id;
        console.log('Selected Maker ID:', selectedMakerId);
        this.fetchModelOptions(selectedMakerId);
      }  
    }
  }
  

  fetchModelOptions(makerId:number) {
    // Call the DataService method to fetch model options
    this.dataService.fetchModels(makerId).subscribe(
      (models: string[]) => {
        // Assign the fetched options to modelOptions
        this.modelOptions = models;
      },
      (error) => {
        console.error('Error fetching model options', error);
      }
    );
    console.log(this.modelOptions);
  }
  
  filterCarsBasedOnFilters() {
    console.log(this.makerFilter);
    console.log(this.modelFilter.name);
    let filteredCars = this.Cars;

    filteredCars = this.dataService.filterByMaker(filteredCars, this.makerFilter);
    filteredCars = this.dataService.filterByModel(filteredCars, this.modelFilter.name);
    filteredCars = this.dataService.filterByPriceRange(filteredCars, this.priceFilter);
    //console.log('Price',this.priceFilter);
    console.log('Filtered Cars',filteredCars);
    this.filterCars = filteredCars;
    this.dataService.setFilteredCars(this.filterCars);
    
  }

  loggedin() {
    // return localStorage.getItem('token');
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.alertify.success('Successfully loged out');
  }

  sendDays() {
    console.log('Number of Days:', this.numberOfDays);
    if (this.filterCars && this.filterCars.length > 0) {
    console.log('Number of Days:', this.numberOfDays);
    this.onCheckAvailability.emit({ days: this.numberOfDays, filterCars: this.filterCars });
  } else if (this.Cars && this.Cars.length > 0) {
    console.log('Number of Days:', this.numberOfDays);
    this.onCheckAvailability.emit({ days: this.numberOfDays, filterCars: this.Cars });
  }

  }

  onFilterChange(): void {
    // Emit the event when filters change
    this.onFilterChanged.emit();
  }

  
}


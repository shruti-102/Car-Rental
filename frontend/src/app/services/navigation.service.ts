import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseUrl="https://localhost:7242/api/Rental/";

  constructor(private http:HttpClient) { }
}

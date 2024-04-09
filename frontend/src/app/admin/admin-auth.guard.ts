import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

// admin-auth.guard.ts
@Injectable({
    providedIn: 'root',
  })
  export class AdminAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      const user = this.authService.getLoggedInUser(); // Get the logged-in user
      return user && user.isAdmin; // Check if the user has admin privileges
    }
  }
  
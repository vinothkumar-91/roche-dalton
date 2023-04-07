import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route:Router,private authService: AuthService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    // this.route.navigate(['/login']);
    this.authService.startAuthentication();
    return false;
  }
}
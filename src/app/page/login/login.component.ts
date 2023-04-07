import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';

import { AuthService } from './../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router,private authService: AuthService,private activatedRoute: ActivatedRoute) {



  }

  ngOnInit(): void {
  }

  public login() {
    this.authService.startAuthentication()
}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiServiceService } from '../../api-service.service';
import { GlobalVariablesService } from '../../global-variables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  apiCall:boolean=false;
  userDetail = this.gv.userDetail;
  defaultRegion = this.gv.userDetail.defaultRegion;
  constructor(private router: Router,public route: ActivatedRoute, private apiService: ApiServiceService, private gv: GlobalVariablesService,private authService: AuthService) { }
  ngOnInit(): void {
    // console.log(this.gv.userDetail)
  }
  // logout() {
  //   this.gv.clearSession()
  //   this.router.navigateByUrl('/login');
  // }

  public logout() {
      this.authService.logOut();
  }

  regionChange(e:any){
    localStorage.setItem('defaultRegion',e)
    window.location.reload();
  }


  public get userName() {

      var claims = this.authService.getClaims();
      if (!claims) return null;

      return claims.given_name;
  }
}

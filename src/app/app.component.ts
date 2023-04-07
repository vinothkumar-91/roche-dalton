import { Renderer2,Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { environment } from './../environments/environment';

import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { GlobalVariablesService } from './global-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  local:number = window.location.href.indexOf('localhost');
  title = 'roche-data-entry-portal';
  currentRoute:any;
  constructor(private router:Router,private authService: AuthService, private gv: GlobalVariablesService,private renderer: Renderer2) {
    this.router.events.subscribe((event: Event) => {
          var prevPage;
          if (event instanceof NavigationStart) {
            prevPage = event.url.split("/")[1];
          }

          if (event instanceof NavigationEnd) {
            this.renderer.setAttribute(document.body,'data-page',event.url.split("/")[1]);
          }

          // if (event instanceof NavigationError) {
          //     console.log(event.error);
          // }
      });
  }


  ngOnInit(): void {


    try{
    // setTimeout(() => {
      // if (window.location.hash.indexOf("state") != 1) {
        // console.log(window.location.hash,window.location.hash.indexOf("state") != -1)
        if (window.location.hash.indexOf("state") != -1) {
          // console.log('window.location.hash')
          window.location.hash = decodeURIComponent(window.location.hash);
            this.authService.completeAuthentication()

      }
      // else {
      //   console.log('window.location.hash => else')
      //   console.log(this.authService.isLoggedIn())
      //   if(this.authService.isLoggedIn()){
      //     console.log('window.location.hash => login success')
      //     this.gv.login();
      //     console.log('1: app component => dashboard')

      //     this.route.navigate(['/dashboard']);
      //   }
      //     // this.authService.startAuthentication()
      // }
      // }, 0);

    }catch(e){console.log(e)}



    // setTimeout(() => {
    //   console.log(this.authService.isLoggedIn())
    //   if(this.authService.isLoggedIn()){
    //     this.authService.completeAuthentication()
    //     this.route.navigate(['/dashboard']);
    //   }else{
    //     const id_token = window.location.hash.split('&').find((v:any) => (v.includes("id_token=")))?.replace("id_token=","");
    //     console.log(id_token)
    //     if(id_token){
    //       console.log('login TRUE')
    //       this.authService.completeAuthentication()
    //       this.route.navigate(['/dashboard']);

    //     }else{
    //       console.log('login FALSE')
    //       // this.route.navigate(['/']);
    //     }
    //   }
    // }, 0);
  }

  Gloader(){
    return this.gv.Gloader;
  }

  // apiResPopup:any=this.gv.getApiResPopup();

  // close(i:any){
  //   var array=this.gv.getApiResPopup()
  //   array.splice(i, 1);
  //   this.gv.updateApiResPopup(array)
  // }
}
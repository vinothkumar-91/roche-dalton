import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../environments/environment';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  commonPopup:any=[];commonApiResPopup:any=[];userDetails:any={}
  portalData = { portalId: 0, userId: 0, portalKey: '', createdDate: 0, portalDetailAvailable: false, portalKeyAvailable: false };
  baseUrl = "http://192.168.1.5:8080/data/";
  apidatas:any={success:[],error:[]};

  portal:any= {}

  pageaccess:any = {
    admin:['dashboard', 'settings','potential','accounts','users'],
  }
  menuList:any = {
    admin:[
      // {routerLink:"/dash",src:"./assets/image/menu-icon/dashboard.svg",dataPageActive:"dash",name:"dash"},
      // {routerLink:"/cdash",src:"./assets/image/menu-icon/dashboard.svg",dataPageActive:"cdash",name:"Dashboard"},
      {routerLink:"/dashboard",src:"./assets/image/menu-icon/dashboard.svg",dataPageActive:"dashboard",name:"Dashboard"},
      {routerLink:"/potential",src:"./assets/image/menu-icon/potential.svg",dataPageActive:"potential",name:"Potential"},
      {routerLink:"/settings",src:"./assets/image/menu-icon/setting.svg",dataPageActive:"settings",name:"Settings"},
      {routerLink:"/accounts",src:"./assets/image/menu-icon/account.svg",dataPageActive:"accounts",name:"CRM"},
      {routerLink:"/users",src:"./assets/image/menu-icon/contact.svg",dataPageActive:"users",name:"Users"},
    ],
    user:[
      {routerLink:"/potential",src:"./assets/image/menu-icon/potential.svg",dataPageActive:"potential",name:"Potential"},
    ]
  }

  Gloader:boolean= true;
  private defaultToken = new BehaviorSubject<string>('');
  defaultToken$ = this.defaultToken.asObservable();

  passpattern= "(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#&()–{}:;,/*~$^+=<>]).{10,100}"
  urlpattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  get userDetail(){
    var data = localStorage.getItem('log')?JSON.parse(localStorage.getItem('log')|| '{}'):null;
    return data;
  }

  get portalDetail(){return this.portal;}

  setUserDetail(ud:any){

    this.userDetails = ud;
    const dc = localStorage.getItem('defaultRegion');

    if(!dc){localStorage.setItem('defaultRegion',this.userDetails.region[0]);this.userDetails.defaultRegion = this.userDetails.region[0];}
    else if(ud.region.indexOf(dc) != -1){
      this.userDetails.defaultRegion = dc;
    }else{
      this.userDetails.defaultRegion = this.userDetails.region[0];
    }

    localStorage.setItem("log", JSON.stringify(this.userDetails))
    localStorage.setItem("auth", this.userDetails.id_token)
    this.Gloader = false;
  }

  getdefaultToken() {
    return localStorage.getItem('auth');
  }

  setdefaultToken(defaultToken: any) {
    localStorage.setItem('auth',defaultToken)
  }
  clearSession() {
    localStorage.removeItem('log');
  }

  Clog(data:any){
    //console.log('%c '+data, 'background: #002387; color: #FFFFFF');
  }

  scrollToTop(ele:any) {
    const el = ele.elementRef.nativeElement;
    const duration = 300;
    const interval = 5;
    const move = el.scrollTop * interval / duration;
    //console.log(el.scrollTop)
    observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, el.scrollTop),
      tap(position => el.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }

  getcommonpopup(){return this.commonPopup;}
  updatecommonpopup(obj:any){this.commonPopup=obj}
  setcommonpopup(obj:any){
    const arrayv = Object.assign({}, {
      req:(obj.data.req_data==undefined)?"":JSON.stringify(obj.data.req_data),
      header:JSON.stringify(obj.data.headers),
      type:obj.data.type,
      method:obj.data.method,
      url:obj.data.url, //(obj.data.url).toString().replace(`${this.baseUrl}`,""),
      res:obj.res
    })
    this.commonPopup.push(arrayv)
  }

  get env(){
    return environment.env;
  }





  getApiResPopup(){
    return this.commonApiResPopup;
  }
  updateApiResPopup(obj:any){this.commonApiResPopup=obj}
  setApiResPopup(obj:any){
    const arrayv = Object.assign({}, {
      req:(obj.data.req_data==undefined)?"":JSON.stringify(obj.data.req_data),
      header:JSON.stringify(obj.data.headers),
      type:obj.data.type,
      method:obj.data.method,
      url:obj.data.url, //(obj.data.url).toString().replace(`${this.baseUrl}`,""),
      res:obj.res
    })

    console.log(arrayv)
    this.commonApiResPopup.push(arrayv)
  }

  errorMesHandling(res:any,mes:any){
    var message = mes;
    if(res){
      if(res.response){
        if(res.response.errorMessage){message = res.response.errorMessage}
        if(res.response.message){message = res.response.message}
      }
      if(res.errorMessage){message = res.errorMessage}
      if(res.message){message = res.message}
    }
    return message
  }





  groupBy(xs:any, key:any) {
    return xs.reduce(function(rv:any, x:any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };




}

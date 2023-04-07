import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { ApiServiceService } from '../api-service.service';
import { GlobalVariablesService } from './../global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User = null as any;
  private userDetails:any = null;
  // private isCallInitLogin:boolean = true;

  constructor(private http: HttpClient,private route:Router, private gv: GlobalVariablesService, private apiService: ApiServiceService,) {
    this.manager.getUser().then(user => {
      this.gv.Gloader = true;
      this.user = user;

      this.loginsuccess(user)

      // console.log(user)
      // console.log("first time calling manage getuser")


          // if(!user)
          //   this.route.navigate(['/login']);
      });
  }

  isLoggedIn(): boolean {
    // console.log(this.user)
    // return this.user != null && !this.user.expired;
    this.gv.Gloader = false;
    // return this.user != null && !this.user.expired;
    return this.userDetails != null && this.user != null && !this.user.expired;
  }

  // callInitLogin(){
  //   try{
  //     if(this.user && this.isCallInitLogin){
  //         this.isCallInitLogin = false;
  //         var data=false;

  //         // const headersData: any = {
  //         //   'Content-Type': 'application/json',credentials: 'include',
  //         //   'Access-Control-Allow-Origin': '*',
  //         // }
  //         // this.http.get(`${this.gv.baseUrl}login/adminDetails`, { headers: headersData }).subscribe((response:any) => {
  //         //   if (response.responsecode == 200) {
  //         //     this.gv.setUserDetail(response.data)
  //         //     data = true;
  //         //     // if(response.data && response.data.token){this.userDetails = response.data;}
  //         //   }else{
  //         //     data = false;
  //         //   }
  //         //   return data;
  //         // },(error:any) => {
  //         //   return false;
  //         // })


  //         this.apiService.getMethod(
  //           `${this.gv.baseUrl}login/adminDetails`,
  //           (response:any)=>{
  //             if (response.responsecode == 200) {
  //               this.gv.setUserDetail(response.data)
  //               data = true;
  //               // if(response.data && response.data.token){this.userDetails = response.data;}
  //             }else{
  //               data = false;
  //             }
  //         },(error:any)=>{data = false;})
  //         setTimeout(() => {
  //           return data;
  //         }, 1000);
  //     }else{
  //       return false;
  //     }
  //   }catch(e){return false;}
  // }

  logOut(){
    localStorage.clear()
    sessionStorage.clear()
    this.user = null as any;
    this.route.navigate(['/login']);
  }

  getClaims(): any {
    return (this.user)?this.user.profile:null;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    // console.log(this.manager)
    return this.manager.signinRedirect();
  }

  serviceDetails:any = {total:9,current:0};
  loginsuccess(user:any){

    if(user){
      this.apiService.getMethod(
        `${this.gv.baseUrl}login/adminDetails`,
        (response:any)=>{
          if (response.responsecode == 200) {
            this.userDetails = {...user,...response};
            if (this.isLoggedIn()) {
              this.gv.setUserDetail(this.userDetails)


              this.serviceDetails.current=0;
              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getIndicationList`,(r:any)=>{
                this.gv.portal['indicationList'] = r.response;this.checkserviceAndRedirect()
              },(error:any)=>{})
              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getIndicationGroupList`,(r:any)=>{
                this.gv.portal['indicationGroupList'] = r.response;this.checkserviceAndRedirect()
              },(error:any)=>{})
              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductList`,(r:any)=>{
                this.gv.portal['productList'] = r.response;this.checkserviceAndRedirect()
              },(error:any)=>{})

              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getCorrectionFactor`,(r:any)=>{
                this.gv.portal['correctionFactor'] = r.response[0];this.checkserviceAndRedirect()
              },(error:any)=>{})

              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getClusterDetails`,(r:any)=>{
                this.gv.portal['clusterDetails'] = r.response;this.checkserviceAndRedirect()
              },(error:any)=>{})
              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getClusters`,(r:any)=>{
                this.gv.portal['clusters'] = r.response;this.checkserviceAndRedirect()
              },(error:any)=>{})

              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductIndication`,(r:any)=>{
                this.gv.portal['productIndication'] = r.response;this.checkserviceAndRedirect()
              },(error:any)=>{})
              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductIndicationList`,(r:any)=>{
                this.gv.portal['productIndicationList'] = r.response;

                console.log(r.response)


        // Eligible
                var ec = {};var val = 0;
                var indArr = [],ind = [];
                r.response.forEach((p:any) => {
                  if(p.ctrls.length){val = p.ctrls[p.ctrls.length - 1].value*100}
                  if(!ec[p.product.name]){ec[p.product.name]={}}
                  ec[p.product.name][p.indication.name] = {eligible:val,group: (p.indication)?p.indication.indicationg.name:'others'};
                  ind.push({name:p.indication.name,group:p.indication.indicationg.name,obj:p})
                  indArr.push(p.indication.name)
                });
                // this.gv.portal['indicationGroupList'] = this.gv.groupBy(ind,'group')
                // this.gv.portal['indicationGroupMap'] =
                // console.log(this.gv.portal['indicationGroupList'])



                // console.log(this.gv.portal['indicationGroupList'])

        // duplicate count
                const indDuplicate = {};
                indArr.forEach(function (x) { indDuplicate[x] = (indDuplicate[x] || 0) + 1; });
                // console.log(indDuplicate)

        // prod Eligible Contribution
                r.response.forEach((p:any) => {ec[p.product.name][p.indication.name]['contribution'] = 100/indDuplicate[p.indication.name] });
                this.gv.portal['prodEligibleContribution'] = ec;

                console.log(ec)

        // ind IndGroup Eligible
                var map = {}
                for (const prod in ec) {
                  for (const indG in ec[prod]) {
                    var eligible:any;
                    if(!map[ec[prod][indG].group]){map[ec[prod][indG].group] = {};}
                    if( typeof map[ec[prod][indG].group][indG] == "object"){
                      eligible = map[ec[prod][indG].group][indG].eligible + ec[prod][indG].eligible;
                      map[ec[prod][indG].group][indG]['eligible'] = eligible
                    }else{
                      eligible=ec[prod][indG].eligible
                      map[ec[prod][indG].group][indG] = {eligible:eligible,contribution:ec[prod][indG].contribution}
                    }
                  }
                }
                console.log(map)
                this.gv.portal['indIndGroupEligible'] = map;

                this.checkserviceAndRedirect()
              },(error:any)=>{})
              this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getConsolidatedSplit`,(r:any)=>{
                this.gv.portal['consolidatedSplit'] = r.response;this.checkserviceAndRedirect()
              },(error:any)=>{})


            }
          }
      },(error:any)=>{})
    }else{
      this.gv.Gloader = false;
    }

  }

  checkserviceAndRedirect(){
    this.serviceDetails.current+=1;
    if(this.serviceDetails.total == this.serviceDetails.current){
      this.route.navigate([(this.userDetails.role == 'admin')?'/potential':'/potential']);
    }

  }


  async completeAuthentication(): Promise<void> {
    // console.log(this.manager)
    // console.log(4)
    this.gv.Gloader = true;
    try{
    const user = await this.manager.signinRedirectCallback();
    // console.log(user);
    this.user = user;

    this.loginsuccess(user)

    // this.http.get<any>( `${this.gv.baseUrl}login/adminDetails`, { headers: {
    //   'Content-Type': 'application/json',credentials: 'include',
    //   'Access-Control-Allow-Origin': '*',
    // } }).subscribe((response) => {
    //       alert(response)
    //   //     if (response.responsecode == 200) {
    //   //       this.userDetails = {...user,...response};
    //   //       this.gv.setUserDetail(this.userDetails)

    //   // console.log(this.user,this.userDetails)

    //   //         if (this.isLoggedIn()) {
    //   //           this.gv.login();
    //   //           console.log('1: auth service => dashboard')
    //   //           this.route.navigate(['/dashboard']);
    //   //         }
    //   //     }
    // })

    }catch(e){}

  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://accounts.google.com',
    client_id: '675222618116-6tj79r2b4nfdoatu7hqtn9j4lo1102t9.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:4200',
    silent_redirect_uri: 'http://localhost:4200',

    post_logout_redirect_uri: 'http://localhost:4200',
    response_type: "id_token token",
    response_mode: 'fragment',
    scope: "openid profile email https://www.googleapis.com/auth/gmail.readonly",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
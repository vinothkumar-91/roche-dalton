import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from './global-variables.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiResPopup:any = {
    need : [],
    remove : []
  }

  constructor(private http: HttpClient, public route: Router, private gv: GlobalVariablesService) {

  }

  getMethod(url: any, success: any, failure: any) {url=url+'.json'
    // console.log(url)
    const headersData: any = {
      'Content-Type': 'application/json',credentials: 'include',
      'Access-Control-Allow-Origin': '*'
    }
    let udata = { url:url, headers:headersData }

    // this.http.get<any>(url, { headers: headersData }).subscribe((response) => {
    //   this.successResponse(response, success, udata)
    // })
    // return false;
    this.http.get(url, { headers: headersData }).subscribe((response) => {
      // console.log(response)
        return  this.successResponse(response, success, udata)
    },(error:any) => {
      // console.log(error)
      return this.checkErrorCode(error, failure, udata);})
  }
  postMethod(url: any, data: any, success: any, failure: any) {url=url+'.json'
    const headersData: any = {
      'Content-Type': 'application/json',credentials: 'include',
      'Access-Control-Allow-Origin': '*',
    }
    let udata = { url:url, headers:headersData,req_data:{...data} }
    this.http.post(url, data, { headers: headersData }).subscribe((response) => {
      return this.successResponse(response, success, udata);
    }, (error) => {
      return this.checkErrorCode(error, failure, udata);
    })
  }



  putMethod(url: any, data: any, success: any, failure: any) {url=url+'.json'
    const headersData: any = {
      'Content-Type': 'application/json',credentials: 'include',
      'Access-Control-Allow-Origin': '*',
    }
    let udata = { url:url, headers:headersData,req_data:{...data} }
    this.http.put(url, data, { headers: headersData }).subscribe((response) => {
      return this.successResponse(response, success, udata);
    }, (error) => {
      return this.checkErrorCode(error, failure, udata);
    })
  }

  putAuthorizationKey(url: any, data: any, success: any, failure: any) {url=url+'.json'
    const headersData: any = {
      'Content-Type': 'application/json',credentials: 'include',
      'Access-Control-Allow-Origin': '*',
      'AuthorizationKey': (this.gv.env.build=='admin')?'':this.gv.userDetail.portalKey,
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }
    // console.log(headersData)
    let udata = { url:url, headers:headersData,req_data:{...data} }
    this.http.put(url, data, { headers: headersData }).subscribe((response) => {
      return this.successResponse(response, success, udata);
    }, (error) => {
      return this.checkErrorCode(error, failure, udata);
    })
  }


  getAuthorizationKey(url: any, success: any, failure: any) {url=url+'.json'
    const headersData: any = {
      'Content-Type': 'application/json',credentials: 'include',
      'Access-Control-Allow-Origin': '*',
      'AuthorizationKey': (this.gv.env.build=='admin')?'':this.gv.userDetail.portalKey,
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }
    let udata = { url:url, headers:headersData }
    // console.log(headersData)
    this.http.get(url, { headers: headersData }).subscribe((response) => {
      return this.successResponse(response, success, udata);
    }, (error) => {
      //console.log(error)
      return this.checkErrorCode(error, failure, udata);
    })
  }

  postAuthorizationKey(url: any, data: any, success: any, failure: any) {url=url+'.json'
    const headersData: any = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'AuthorizationKey': (this.gv.env.build=='admin')?'':this.gv.userDetail.portalKey,
      'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }
    let udata = { url:url, headers:headersData,req_data:{...data} }
    this.http.post(url, data, { headers: headersData }).subscribe((response) => {
      return this.successResponse(response, success, udata);
    }, (error) => {
      return this.checkErrorCode(error, failure, udata);
    })
  }



  filepostMethod(url: any, data: any, success: any, failure: any) {url=url+'.json'
    const headersData: any = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    }
    let udata = { url:url, headers:headersData,req_data:{...data} }
    this.http.post(url, data, { headers: headersData }).subscribe((response) => {
      return this.successResponse(response, success, udata);
    }, (error) => {
      return this.checkErrorCode(error, failure, udata);
    })
  }
  successResponse(response: any, success: any, data: any) {
    data.method=(data.data==undefined)?"GET":"POST";
    if(response.responsecode!=200){
      data.type="failed";
      this.gv.setcommonpopup({data:data,res:{response:response,error:''}})

      this.checkApiResPopupNeeded({data:data,res:response},'remove')
      this.gv.apidatas.error.push({data:data,res:response});
    }else{
      data.type="success";
      this.checkApiResPopupNeeded({data:data,res:response},'need')
      this.gv.apidatas.success.push({data:data,res:response});
    }

    if (response) {
      return success(response)
    }
    // this.route.navigateByUrl('/login');
    return false;
  }
  checkErrorCode(error: any, failure: any, data: any) {
    console.log(error)
    if(error.status == 403){
      this.route.navigateByUrl('/login');
    }else{
      if(error.status == 0){this.gv.Gloader=false;}
      data.method=(data.data==undefined)?"GET":"POST";
      data.type="failed";
      this.checkApiResPopupNeeded({data:data,res:error},'')
      this.gv.apidatas.error.push({data:data,res:error});
      this.gv.setcommonpopup({data:data,res:{response:failure,error:error}})
      return failure(error)
    }
  }

  checkApiResPopupNeeded(d:any,arr:any){
    let reData=1;
    if(arr=='need'){
      reData=(this.apiResPopup.need.indexOf((d.data.url).split("?")[0].split("/").at(-1))!=-1)?1:-1;
    }
    else if(arr=='remove'){
      reData=(this.apiResPopup.remove.indexOf((d.data.url).split("?")[0].split("/").at(-1))==-1)?1:-1;
    }
    if(reData!=-1){
      window.scroll(0, 0);
      this.gv.setApiResPopup(d)
    }
  }
}

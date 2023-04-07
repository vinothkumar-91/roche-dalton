
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from './../../api-service.service';
import { GlobalVariablesService } from './../../global-variables.service';

@Component({
  selector: 'app-maincontainer',
  templateUrl: './maincontainer.component.html',
  styleUrls: ['./maincontainer.component.css']
})
export class MaincontainerComponent implements OnInit {

  constructor(private http: HttpClient,private route:Router, private gv: GlobalVariablesService, private apiService: ApiServiceService,) { }

  ngOnInit(): void {

    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getIndicationList`,(response:any)=>{console.log(response)},(error:any)=>{})
    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getIndicationGroupList`,(response:any)=>{console.log(response)},(error:any)=>{})
    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductList`,(response:any)=>{console.log(response)},(error:any)=>{})

    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getCorrectionFactor`,(response:any)=>{console.log(response)},(error:any)=>{})

    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getClusterDetails`,(response:any)=>{console.log(response)},(error:any)=>{})
    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getClusters`,(response:any)=>{console.log(response)},(error:any)=>{})

    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductIndication`,(response:any)=>{console.log(response)},(error:any)=>{})
    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductIndicationList`,(response:any)=>{console.log(response)},(error:any)=>{})
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-potentialdetail',
  templateUrl: './potentialdetail.component.html',
  styleUrls: ['./potentialdetail.component.css']
})
export class PotentialdetailComponent implements OnInit {
  // @Input() formSet:any;
  @Input() detailTable:any;
  @Output() closePopup = new EventEmitter();
  @Output() editPopup = new EventEmitter();


  ceditPopup(){
    this.editPopup.emit('123');
  }

  cClosepopup() {
    this.closePopup.emit('');
  }
  formSet:any;
  constructor() {
    this.formSet = [
      {
        class:"basic-info", name:"Basic Info",fields:[
        {field:"Territory ID",value:"",id:"fid1-1"},
        {field:"CRM ID",value:"",id:"fid1-2"},
        {field:"HCP Name",value:"",id:"fid1-3"},
        {field:"Account HCO ID",value:"",id:"fid1-4"},
        {field:"Account Name",value:"",id:"fid1-5"},
        {field:"Workdays/ week",value:"",id:"fid1-6"},
        {field:"Avg No. of patients seen in a full workday",value:"",id:"fid1-7"},
        {field:"Share of New patients",value:"",id:"fid1-8"},
        {field:"Share of old patients - O/P",value:"",id:"fid1-9"},
        {field:"Split of Hematology patients",value:"",id:"fid1-10"},
        {field:"Affording patients by SoF",value:"",id:"fid1-11"},
        {field:"Affording patients by SoF - Post correction",value:"",id:"fid1-12"}
        ]
      },
      {class:"other-info",
        name:"#unique patients amongst all affording patients: Correction factor at cluster - SoF level to account for mutliple HCP consultations",fields:[
        {"field":"OOP",value:"",id:"fid2-1"},
        {"field":"Defence & ECHS",value:"",id:"fid2-2"},
        {"field":"CGHS",value:"",id:"fid2-3"},
        {"field":"Railways",value:"",id:"fid2-4"},
        {"field":"PSU",value:"",id:"fid2-5"},
        {"field":"ESI",value:"",id:"fid2-6"},
        {"field":"State Govt",value:"",id:"fid2-7"}
      ]},
      {class:"other-info",name:"% Split of patients seen",
      fields:[
      {field:"Breast",value:"",id:"fid3-1"},
      {field:"Lung",value:"",id:"fid3-2"},
      {field:"GI",value:"",id:"fid3-3"},
      {field:"UC",value:"",id:"fid3-4"},
      {field:"NHL",value:"",id:"fid3-5"},
      {field:"CLL",value:"",id:"fid3-6"},
      {field:"Others - O/P",value:"",id:"fid3-7"}
    ]},
    {class:"other-info",name:"Patients seen/ month",fields:[
      {"field":"Total - O/P",value:"",id:"fid4-1"},
      {"field":"Old - O/P",value:"",id:"fid4-2"},
      {"field":"New - O/P",value:"",id:"fid4-3"}
    ]},
    {class:"other-info",name:"Split of patients seen/ month",fields:[
      {"field":"Breast",value:"",id:"fid3-1"},
      {"field":"Lung",value:"",id:"fid3-2"},
      {"field":"GI",value:"",id:"fid3-3"},
      {"field":"UC",value:"",id:"fid3-4"},
      {"field":"NHL",value:"",id:"fid3-5"},
      {"field":"CLL",value:"",id:"fid3-6"},
      {"field":"Others - O/P",value:"",id:"fid3-7"}
    ]},

    {class:"other-info",name:"Split of Breast patients/ month",fields:[
      {"field":"HER2 Neo Adj",value:"",id:"fid3-1"},
      {"field":"HER2 Adj",value:"",id:"fid3-2"},
      {"field":"HER2 mBC",value:"",id:"fid3-3"},
      {"field":"HER2 eBC",value:"",id:"fid3-4"},
      {"field":"TNBC",value:"",id:"fid3-5"}
    ]},
    {class:"other-info",name:"Split of Lungs patients/ month",fields:[
      {"field":"1L NSCLC",value:"",id:"fid3-1"},
      {"field":"2L NSCLC",value:"",id:"fid3-2"},
      {"field":"1L ALK+LC",value:"",id:"fid3-3"},
      {"field":"2L ALK+LC",value:"",id:"fid3-4"}
    ]},

    ]
  }

  ngOnInit(): void {
  }

}

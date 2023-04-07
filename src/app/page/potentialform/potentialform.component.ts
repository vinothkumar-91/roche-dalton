
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from './../../api-service.service';
import { GlobalVariablesService } from './../../global-variables.service';
import { Output, EventEmitter } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, CommonAxe } from 'chart.js';

@Component({
  selector: 'app-potentialform',
  templateUrl: './potentialform.component.html',
  styleUrls: ['./potentialform.component.css']
})
export class PotentialformComponent implements OnInit {


  // @Input() detailTable:any;
  @Input() currentObj:any;

  @Output() closePopup = new EventEmitter();




  cClosepopup() {
    this.closePopup.emit('');
  }
  showChart:boolean = false;
  formsData:any={}
  addPopup:boolean = true;
  portalForm: any = {}
  territoryItems:any[];
  accountItems:any[];
  constructor(private http: HttpClient,private route:Router, private gv: GlobalVariablesService, private apiService: ApiServiceService,) {


    // this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductList`,(response:any)=>{console.log(response)},(error:any)=>{})
    // this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/getProductList`,(response:any)=>{console.log(response)},(error:any)=>{})


    this.territoryItems = [
      {name:"IN_HEMATOLOGY_KOC",id:"1"},
      {name:"IN_CEP_PKAT_KOC_1 -IN_CEP_PKAT_KOC_1 -Shajan",id:"2"},
      {name:"IN_CEL_KL-Krishnakumarkumar",id:"3"},
      {name:"IN_CEP_PKAT_KOC_2 -Nisamudeen",id:"4"}
    ]

    this.accountItems = [
      {name:"Mar Sleeva",id:"A-2101-10339398"},
      {name:"General Hospital - Cochin",id:"A-1311-1002455"},
      {name:"Kerala Institute Medical Science",id:"A-1311-1002466"},
      {name:"Regional Cancer Centre - Thiruvananthapuram",id:"A-1311-1001895"},
    ]

  }


  public dbarChartOptions: ChartOptions = {responsive: true,maintainAspectRatio: false,legend: {display: true,position: 'bottom',
        labels: {fontColor: '#333'}
    },
    scales: {
        xAxes: [{gridLines: {color: "#deedfe",},}],
        yAxes: [{ticks: {min: 0,max: 5,beginAtZero: true},gridLines: {color: "#deedfe",}}]
    }
  };
  public dbarChartType: ChartType = 'horizontalBar';
  public dbarChartColors:Array<any> = [{backgroundColor: '#36a2eb'}]


  public dbarChartData:any = [
    {data:2133, label: 'Split of Hematology patients (2133.00)',barThickness: 12,borderWidth: 1},
    {data:152.6, label: 'Affording patients by SoF (152.60)',barThickness: 12,borderWidth: 1},
    {data:129.14, label: 'Affording patients by SoF - Post correction (129.14)',barThickness: 12,borderWidth: 1}
  ];

  indIndGroupEligible:any = this.gv.portal['indIndGroupEligible']

//   public dbarChartData: ChartDataSets[] = [{
//     data: [2133,	152.6,	129.14], // Specify the data values array

//     // borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'], // Add custom color border
//     // backgroundColor: [ '#022366', '#1482FA', '#BDE3FF'],
//     // Add custom color background (Points and Fill)
//     // borderWidth: 1 // Specify bar border width
// }]
  public dbarChartLabels:any = ["Split of Hematology patients (2133.00)",	"Affording patients by SoF (152.60)",	"Affording patients by SoF - Post correction (129.14)"]
  correctionFactor:any = []
  psm:any;

  pfrom:any = {
    ppInput: {
       trId: null,
       accounthcoId: null,accountname:null,accountwd:null,accountavgPS: null, accountshNP: null,
       sops: {},cf:{},
       sofSOPSoop: 100, sofSOPSdef: 0, sofSOPScghs: 0, sofSOPSrailways: 0, sofSOPSpsu: 0, sofSOPSesi: 0,sofSOPSstGvt:0,
       apSOFoop: 10, apSOFdef: 100, apSOFcghs: 100, apSOFrailways: 100, apSOFpsu: 100, apSOFesi: 100,apSOFstGvt:0,
    }
  }
  formObj:any=[]
  basciFormObj:any=[

    {
      class:'',name:'',id:"account",fields:[
        {field:"Workdays/ week",id:"wd"},
        {field:"Avg No. of patients seen in a full workday",id:"avgPS"},
        {field:"Share of New patients",id:"shNP"}
      ]
    },
    {
      class:'other-info',name:'SoF split of patients',id:"sofSOPS",fields:[
        {field:"OOP",id:"oop"},
        {field:"Def. & ECHS",id:"def"},
        {field:"CGHS",id:"cghs"},
        {field:"Railways",id:"railways"},
        {field:"PSU",id:"psu"},
        {field:"ESI",id:"esi"},
        {field:"State Govt",id:"stGvt",disable:true},

      ]
    },
    {
      class:'other-info',name:'% of affording patients by SoF',id:"apSOF",fields:[
        {field:"OOP",id:"oop",disable:false},
        {field:"Def. & ECHS",id:"def",disable:true},
        {field:"CGHS",id:"cghs",disable:true},
        {field:"Railways",id:"railways",disable:true},
        {field:"PSU",id:"psu",disable:true},
        {field:"ESI",id:"esi",disable:true},
        {field:"State Govt",id:"stGvt",disable:false},
      ]
    },

  ]

  psosp:any;
  ngOnInit(): void {


    const ig =this.portal.indIndGroupEligible;
    const cf =this.portal.correctionFactor;
    var d = this.currentObj.ppInput;

    // console.log(this.correctionFactor,JSON.stringify(this.correctionFactor)==JSON.stringify({}))
    // console.log(this.addPopup,JSON.stringify(this.currentObj),JSON.stringify(this.currentObj) == JSON.stringify({}))
      this.addPopup = (JSON.stringify(this.currentObj) == JSON.stringify({}))?true:false;


      // this.currentObj = { "ppInput": { "trId": "IN_CEP_PKAT_KOC_2 -Nisamudeen", "account": { "hcoId": "A-2101-10339398", "name": "Mar Sleeva", "wd": 5, "avgPS": 10, "shNP": 0.1 }, "sops": { "Breast": 0.15, "Lung": 0.12, "GI": 0, "UC": 0.01, "NHL": 0.02, "CLL": 0.01 ,'FL 1':0.2,'FL':0.2,'HCC':0.2    }, "sofSOPS": { "oop": 1, "def": 2, "cghs": 3, "railways": 4, "psu": 5, "esi": 6 }, "apSOF": { "oop": 5, "stGvt": 6 } } }

    // for (const [key, value] of Object.entries(this.correctionFactor)) {
    //   let obj = {}
    //   // console.log(value['fields'])
    //   for (const o of value['fields']) {
    //     this.formsData[o.id] = 0;
    //   }
    // }
      // console.log(this.portal.correctionFactor)

    if(!this.addPopup){
      this.pfrom.ppInput.trId = d.trId;
      this.pfrom.ppInput.accountavgPS = d.account.avgPS;
      this.pfrom.ppInput.accounthcoId = d.account.hcoId;
      this.pfrom.ppInput.accountname = d.account.name;
      this.pfrom.ppInput.accountshNP = d.account.shNP;
      this.pfrom.ppInput.accountwd = d.account.wd;
      this.pfrom.ppInput.apSOFoop = d.apSOF.oop;
      this.pfrom.ppInput.apSOFstGvt = d.apSOF.stGvt;
      this.pfrom.ppInput.sofSOPScghs =  d.sofSOPS.cghs;
      this.pfrom.ppInput.sofSOPSdef = d.sofSOPS.def;
      this.pfrom.ppInput.sofSOPSesi = d.sofSOPS.esi;
      // this.pfrom.ppInput.sofSOPSstGvt = d.sofSOPS.stGvt;
      this.pfrom.ppInput.sofSOPSoop = d.sofSOPS.oop;
      this.pfrom.ppInput.sofSOPSpsu = d.sofSOPS.psu;
      this.pfrom.ppInput.sofSOPSrailways = d.sofSOPS.railways;


      // this.pfrom.ppInput['apSOF']['cghs'] =  d.cf.cghs;
      // this.pfrom.ppInput['apSOF']['def'] = d.cf.def;
      // this.pfrom.ppInput['apSOF']['esi'] = d.cf.esi;
      // this.pfrom.ppInput['apSOF']['stGvt'] = d.cf.stGvt;
      // this.pfrom.ppInput['apSOF']['oop'] = d.cf.oop;
      // this.pfrom.ppInput['apSOF']['psu'] = d.cf.psu;
      // this.pfrom.ppInput['apSOF']['railways'] = d.cf.railways;
    }else{

      this.pfrom.ppInput['cf']['cghs'] =  cf.cghs;
      this.pfrom.ppInput['cf']['def'] = cf.def;
      this.pfrom.ppInput['cf']['esi'] = cf.esi;
      this.pfrom.ppInput['cf']['stGvt'] = cf.stGvt;
      this.pfrom.ppInput['cf']['oop'] = cf.oop;
      this.pfrom.ppInput['cf']['psu'] = cf.psu;
      this.pfrom.ppInput['cf']['railways'] = cf.railways;
    }

    // console.log(ig)




    // if(JSON.stringify(this.correctionFactor)==JSON.stringify({})){
      let formObj = [];
      var count=0;
      for (const gr in ig) {
        this.pfrom.ppInput["sops"][gr] = (!this.addPopup)?(d.sops[gr]?d.sops[gr]:0):0;
        console.log(gr)
        console.log(this.pfrom.ppInput["sops"][gr])
        formObj.push({field:gr,id:'fld_id_'+count});count++;
      }

      // for(var i=0;i<ig.length;i++){
      //   if(ig[i].inputSublevel){
      //     for(var j=0;j<ig[i].indList.length;j++){
      //       this.pfrom.ppInput["sops"][ig[i].indList[j].name] = (!this.addPopup)?(d.sops[ig[i].indList[j].name]?d.sops[ig[i].indList[j].name]:0):0;
      //       formObj.push(
      //         {field:ig[i].indList[j].name,id:ig[i].indList[j].name}
      //       )
      //     }
      //   }else{
      //     this.pfrom.ppInput["sops"][ig[i].name] = (!this.addPopup)?(d.sops[ig[i].name]?d.sops[ig[i].name]:0):0;
      //     formObj.push(
      //       {field:ig[i].name,id:ig[i].name}
      //     )
      //   }
      // }
      // console.log(formObj)
      formObj.push({field:'others',id:'others'})
      this.formObj = formObj;
    // }


    this.psm = {
      class:"other-info",name:"Patients seen/ month",
      fields:[
          {"field":"Total",value:0,id:"psmtotal"},
          {"field":"Old",value:0,id:"psmold"},
          {"field":"New",value:0,id:"psmnew"}
      ]
    }



    this.psosp = {
      class:"other-info",name:"% Split of patients seen",
        fields:[
        // {field:"Breast",value:"",id:"fid3-1"},
        // {field:"Lung",value:"",id:"fid3-2"},
        // {field:"GI",value:"",id:"fid3-3"},
        // {field:"UC",value:"",id:"fid3-4"},
        // {field:"NHL",value:"",id:"fid3-5"},
        // {field:"CLL",value:"",id:"fid3-6"},
        // {field:"Others - O/P",value:"",id:"fid3-7"}
      ]
    }


    this.correctionFactor = [
      {class:"other-info",
        name:"#unique patients amongst all affording patients: Correction factor at cluster - SoF level to account for mutliple HCP consultations",fields:[
        {"field":"OOP",value: cf.oop,id:"fid2-1"},
        {"field":"Defence & ECHS",value:cf.def,id:"fid2-2"},
        {"field":"CGHS",value:cf.cghs,id:"fid2-3"},
        {"field":"Railways",value:cf.railways,id:"fid2-4"},
        {"field":"PSU",value:cf.psu,id:"fid2-5"},
        {"field":"ESI",value:cf.esi,id:"fid2-6"},
        {"field":"State Govt",value:cf.stGvt,id:"fid2-7"}
      ]},

    // {class:"other-info",name:"Patients seen/ month",fields:[
    //   {"field":"Total",value:d.psmtotal,id:"psmtotal"},
    //   {"field":"Old",value:d.psmold,id:"psmold"},
    //   {"field":"New",value:d.psmnew,id:"psmnew"}
    // ]},
    // {class:"other-info",name:"Split of patients seen/ month",fields:[
    //   {"field":"Breast",value:"",id:"fid3-1"},
    //   {"field":"Lung",value:"",id:"fid3-2"},
    //   {"field":"GI",value:"",id:"fid3-3"},
    //   {"field":"UC",value:"",id:"fid3-4"},
    //   {"field":"NHL",value:"",id:"fid3-5"},
    //   {"field":"CLL",value:"",id:"fid3-6"},
    //   {"field":"Others - O/P",value:"",id:"fid3-7"}
    // ]},

    // {class:"other-info",name:"Split of Breast patients/ month",fields:[
    //   {"field":"HER2 Neo Adj",value:"",id:"fid3-1"},
    //   {"field":"HER2 Adj",value:"",id:"fid3-2"},
    //   {"field":"HER2 mBC",value:"",id:"fid3-3"},
    //   {"field":"HER2 eBC",value:"",id:"fid3-4"},
    //   {"field":"TNBC",value:"",id:"fid3-5"}
    // ]},
    // {class:"other-info",name:"Split of Lungs patients/ month",fields:[
    //   {"field":"1L NSCLC",value:"",id:"fid3-1"},
    //   {"field":"2L NSCLC",value:"",id:"fid3-2"},
    //   {"field":"1L ALK+LC",value:"",id:"fid3-3"},
    //   {"field":"2L ALK+LC",value:"",id:"fid3-4"}
    // ]},

    ]

    this.checkCompare()
  }
  get portal(){
    return this.gv.portal;
  }

	onSubmit() {
    // console.log(this.pfrom);
	}

  igsopm:any = [];
  isops:any = {
    arr:[],map:{}
  };

  ptype:any = {
    arr:[],map:{}
  };

  checkCompare(){
    // console.log(this.pfrom)
      const pil =this.portal.indicationGroupList;
      var formData = this.pfrom.ppInput;
      this.psosp.fields = [];this.psosp.map = {}
      // console.log(formData['accountshNP'])
      formData['accountshOP'] = 100 - parseFloat(formData['accountshNP']);
      let sopsTotal:number = 0;
      // console.log(this.formObj)

      this.formObj.forEach((element:any) => {
        // console.log(parseFloat(formData["sops"][element.field]))
        // this.psosp.fields.push({field:element.field,value: parseFloat(formData["sops"][element.field])})
        sopsTotal += (!isNaN(parseFloat(formData["sops"][element.field])) && element.field!='others')?parseFloat(formData["sops"][element.field]):0;
      });

      // let sopsTotal = 0;sopsTotal = this.formObj.map(function(element:any){
      //   var v = (parseFloat(formData["sops"][element.name]) != NaN)?formData["sops"][element.name]:0
      //   return v + sopsTotal;
      // });
      formData['sops']['others'] = 100 - sopsTotal;
      formData['psmtotal'] = formData['accountavgPS'] * formData['accountwd'] * 4;
      // console.log(formData['accountshOP'],formData['total'])
      formData['psmold'] = (formData['psmtotal'] * formData['accountshOP'])/100;
      formData['psmnew'] = formData['psmtotal'] - formData['psmold'];

      // console.log(this.formObj)

      this.formObj.forEach((element:any) => {
        // console.log(element)
        this.psosp.map[element.field] = (parseFloat(formData["sops"][element.field]) * formData['psmnew'])/100
        this.psosp.fields.push({field:element.field,value: (parseFloat(formData["sops"][element.field]) * formData['psmnew'])/100 })
      });

      // console.log( this.psosp.map)





      // Split of BC patients/ month
      var isopstotal=0;this.isops.arr = []
      for (const indGrp in this.indIndGroupEligible) {
        // console.log(indGrp)
        var obj = {indGrp:indGrp},arr = []
        for (const ind in this.indIndGroupEligible[indGrp]) {
          // console.log(ind)
          this.isops.map[ind] = (this.psosp.map[indGrp] * this.indIndGroupEligible[indGrp][ind].eligible)/100;
          isopstotal += this.isops.map[ind];
          arr.push({
            ...{name:ind},
            ...this.indIndGroupEligible[indGrp][ind],
            ...{isops:this.isops.map[ind]}
          })
          // console.log( indGrp,ind,(this.psosp.map[indGrp] * this.indIndGroupEligible[indGrp][ind].eligible) )
        }
        obj['indication'] = arr;
        this.isops.arr.push(obj)
      }
      this.isops.map['total'] = isopstotal;

      console.log(this.isops)

      var cf = this.gv.portal.correctionFactor
      var formVal = this.pfrom.ppInput;



      // console.log(formVal['sofSOPS'+'stGvt'],this.isops.map['total'],formVal['apSOF'+'stGvt'])


      // console.log(formVal['sofSOPS'+'stGvt'],this.isops.map['total'])
      // console.log(formVal['sofSOPS'+'stGvt']*this.isops.map['total'])
      // console.log((formVal['sofSOPS'+'stGvt']*this.isops.map['total']))
      // console.log(((formVal['sofSOPS'+'stGvt']*this.isops.map['total'])/100))
      // console.log(((formVal['sofSOPS'+'stGvt']*this.isops.map['total'])/100)/formVal['apSOF'+'stGvt'])

      //

      this.ptype.map = {
        oop:{
          val:formVal['sofSOPS'+'oop'],
          cf:cf.oop,
          epsof:(formVal['sofSOPS'+'oop']*this.isops.map['total'])/100,
          apsof: ((formVal['sofSOPS'+'oop']*this.isops.map['total'])/100)/formVal['apSOF'+'oop'],
          pcapsof: ((formVal['sofSOPS'+'oop']*this.isops.map['total'])/100)/formVal['apSOF'+'oop'] * cf.oop
        },
        def:{
          val:formVal['sofSOPS'+'def'],
          cf:cf.def,
          epsof:(formVal['sofSOPS'+'def']*this.isops.map['total'])/100,
          apsof: ((formVal['sofSOPS'+'def']*this.isops.map['total'])/100)/formVal['apSOF'+'def'],
          pcapsof: ((formVal['sofSOPS'+'def']*this.isops.map['total'])/100)/formVal['apSOF'+'def'] * cf.def
        },
        cghs:{
          val:formVal['sofSOPS'+'cghs'],
          cf:cf.cghs,
          epsof:(formVal['sofSOPS'+'cghs']*this.isops.map['total'])/100,
          apsof: ((formVal['sofSOPS'+'cghs']*this.isops.map['total'])/100)/formVal['apSOF'+'cghs'],
          pcapsof: ((formVal['sofSOPS'+'cghs']*this.isops.map['total'])/100)/formVal['apSOF'+'cghs'] * cf.cghs
        },
        railways:{
          val:formVal['sofSOPS'+'railways'],
          cf:cf.railways,
          epsof:(formVal['sofSOPS'+'railways']*this.isops.map['total'])/100,
          apsof: ((formVal['sofSOPS'+'railways']*this.isops.map['total'])/100)/formVal['apSOF'+'railways'],
          pcapsof: ((formVal['sofSOPS'+'railways']*this.isops.map['total'])/100)/formVal['apSOF'+'railways'] * cf.railways
        },
        psu:{
          val:formVal['sofSOPS'+'psu'],
          cf:cf.psu,
          epsof:(formVal['sofSOPS'+'psu']*this.isops.map['total'])/100,
          apsof: ((formVal['sofSOPS'+'psu']*this.isops.map['total'])/100)/formVal['apSOF'+'psu'],
          pcapsof: ((formVal['sofSOPS'+'psu']*this.isops.map['total'])/100)/formVal['apSOF'+'psu'] * cf.psu
        },
        esi:{
          val:formVal['sofSOPS'+'esi'],
          cf:cf.esi,
          epsof:(formVal['sofSOPS'+'esi']*this.isops.map['total'])/100,
          apsof: ((formVal['sofSOPS'+'esi']*this.isops.map['total'])/100)/formVal['apSOF'+'esi'],
          pcapsof: ((formVal['sofSOPS'+'esi']*this.isops.map['total'])/100)/formVal['apSOF'+'esi'] * cf.esi
        },
        stGvt:{
          val:formVal['sofSOPS'+'stGvt'],
          cf:cf.stGvt,
          epsof:(formVal['sofSOPS'+'stGvt']*this.isops.map['total'])/100,
          apsof: ((formVal['sofSOPS'+'stGvt']*this.isops.map['total'])/100)/formVal['apSOF'+'stGvt'],
          pcapsof: ((formVal['sofSOPS'+'stGvt']*this.isops.map['total'])/100)/formVal['apSOF'+'stGvt'] * cf.stGvt
        },
      }

      var apsoftotal=0,pcapsoftotal=0;
      for (const pt in this.ptype.map) {
        apsoftotal += (isNaN(this.ptype.map[pt].apsof))?0:this.ptype.map[pt].apsof;
        pcapsoftotal += (isNaN(this.ptype.map[pt].pcapsof))?0:this.ptype.map[pt].pcapsof;
      }
      this.ptype.map['apsoftotal'] = apsoftotal;
      this.ptype.map['pcapsoftotal'] = pcapsoftotal;

console.log(this.ptype.map)

      // this.detailTable=[]



















      this.igsopm = [];

      for(var i=0;i<pil.length;i++){
        // if(pil[i].inputSublevel){
          this.igsopm[i] = {class:"other-info",name:pil[i].name + " : Split of patients/month",fields:[]}
          for(var j=0;j<pil[i].indList.length;j++){
            this.igsopm[i].fields.push(
              {field:pil[i].indList[j].name,id:pil[i].indList[j].name,value:0}
            )
          }
        // }else{
        //   this.igsopm.fields.push(
        //     {field:pil[i].name,id:pil[i].name,value:0}
        //   )
        // }
      }



















      this.pfrom.ppInput = {...this.pfrom.ppInput,...formData}

      // console.log(this.pfrom)


  }
}

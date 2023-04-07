import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiServiceService } from '../../api-service.service';
import { DatePipe } from '@angular/common'
import { GlobalVariablesService } from '../../global-variables.service';
import { ChartOptions, ChartType, ChartDataSets, CommonAxe } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WindowRef } from '../../WindowRef';
import { Parser } from 'expr-eval';
import { Options } from "sortablejs";
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

// options: SortablejsOptions = {
//   animation: 150,
//    group: {
//      name: 'shared',
//      pull: 'clone',
//      put: false,
//    },
//  sort: false
// }

// options1: SortablejsOptions = {
//    swapThreshold: 0.1,
//    invertSwap: true,
//    animation: 150,
//    ghostClass: 'ghost',
//    group: 'shared',
// };
// }

normalOptions: Options = {
handle: '.handle' ,
// onMove: (event:any) => {
//   console.log("onMove", event);
//   event.preventDefault();
//   return false;
// },
// onEnd: (event:any) => {
//   console.log("onEnd", event);
// },
onUpdate: (event: any) => {
  console.log(event.target.getAttribute("id") +" ===> " );
  var ro = []
  for(var i=0;i<event.target.children.length;i++){
    ro.push(event.target.children[i].getAttribute("id"))
  }
  console.log(ro)


},
// onAdd: (event:any) => {
//   // this.moveSubTasks(event);
// },
// onChoose: (event:any) => {
//   console.log("onChoose", event);
//   event.preventDefault();
//   return false;
// },
// onUnchoose: (event:any) => {},

}

  collapseAll:boolean= false;
  apiCall:boolean = true;
  // parser = new FormulaParser.Parser();
  test:any;testView:any='';

  popuptype:any='controller';
  addEditpopup:boolean = false;

clientForm: any = {
  name:'',emailId:'',phoneNumber:'',
  merchantId:this.gv.userDetail.merchantId,
  propertyDetails:[],
  walletDetails:[{cryptoNetwork:null,walletAddress:'',cryptoType:null,formula:''}]
};


  profile:any;
  newobj:any = []
  public barChartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
          display: true,
          position: 'bottom',
          labels: {
              fontColor: '#333'
          }
      },
      scales: {
          xAxes: [{
              gridLines: {
                  color: "#fafafa",
              },
          }],
          yAxes: [{
            ticks: {
              min: 0,max: 100,beginAtZero: true
            },
              gridLines: {
                  color: "#fafafa",
              }
          }]
      }
    };
    public barChartType: ChartType = 'bar'; //'horizontalBar';
    public barChartLegend = true;


    public barChartColors:Array<any> = [
      {
        backgroundColor: '#1482fa',
        borderColor: '#1482fa',
        pointBackgroundColor: '#1482fa',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1482fa'
      },
      {
        backgroundColor: '#bde3ff',
        borderColor: '#bde3ff',
        pointBackgroundColor: '#bde3ff',
        pointBorderColor: '#bde3ff',
        pointHoverBackgroundColor: '#bde3ff',
        pointHoverBorderColor: '#bde3ff'
      },
      // {
      //   backgroundColor: '#f59438',
      //   borderColor: '#f59438',
      //   pointBackgroundColor: '#f59438',
      //   pointBorderColor: '#fafafa',
      //   pointHoverBackgroundColor: '#fafafa',
      //   pointHoverBorderColor: '#f59438'
      // }
    ];

    public barChartData: ChartDataSets[] = [
      // { data: [1, 2, 3], label: '', type: 'line' },
      { barThickness: 12, data: [], label: 'Eligible'},
      { barThickness: 12, data: [], label: 'Contribution'},
      // { barThickness: 12, data: [], label: 'Bitcoin', stack: 'a' },
    ];
    public barChartLabels:any = []





  settingObj:any={
      "indicationgroup":[
        // {
        //   name:"Breast",indication:[
        //     {name:"TNBC",percentage:76},
        //     {name:"HER2 mBC",percentage:52},
        //     {name:"HER2 Adj",percentage:25},
        //     {name:"HER2 Neo Adj",percentage:18},
        //     {name:"HER2 eBC",percentage:16},
        //   ]
        // },
        // {
        //   name:"Lung",indication:[
        //     {name:"2L ALK+LC",percentage:76},
        //     {name:"SCLC",percentage:52},
        //     {name:"2L NSCLC",percentage:25},
        //     {name:"1L NSCLC",percentage:18},
        //     {name:"1L ALK+LC",percentage:16},
        //   ]
        // },
        // {
        //   name:"Hematology",indication:[
        //     {name:"FL",percentage:46},
        //     {name:"CLL",percentage:6}
        //   ]
        // }
      ],
      "setting":[
        // {
        //       name:"Perjeta - HER2 Neo Adj",value:[
        //           {"field":"Total Breast Cancer patients  14.4 per 100000","percentage":"100.00","source":"Breast cancer India Prevalence and Incidence dat.pdf"},
        //           {"field":"HER2+ Breast Cancer patients (25%)","percentage":"25.00","source":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4991144/?report=printable"},
        //           {"field":"HER2+ Stage I (9% of all HER 2)","percentage":"2.25","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage II (35% of all HER 2)","percentage":"8.75","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage III  (38% of all HER 2)","percentage":"9.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage IV (18% of all HER 2)","percentage":"4.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"Neo Adjuvant patients eligible for Perjeta (% of all BrCa)","percentage":"18.25","source":""}
        //       ]},
        //       {name:"Perjeta - HER2 mBC",value:[
        //           {"field":"Total Breast Cancer patients (14.4 per 100,000)","percentage":"100.00","source":"Breast cancer India Prevalence and Incidence dat.pdf"},
        //           {"field":"HER2+ Breast Cancer patients (25% of all BrCa)","percentage":"25.00","source":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4991144/?report=printable"},
        //           {"field":"HER2+ Stage I (9% of all HER 2)","percentage":"2.25","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage II (35% of all HER 2)","percentage":"8.75","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage III  (38% of all HER 2)","percentage":"9.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage IV (18% of all HER 2)","percentage":"4.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"stage IV progressed from eBC (36%)","percentage":"9.1","source":"67% percent people getting treated are progessing from eBC"},
        //           {"field":"1L MBC patients eligible for Perjeta (% of all BrCa)","percentage":"13.64","source":""}
        //       ],
        //   },{name:"Perjeta - HER2 Adj",value:[
        //           {"field":"Total Breast Cancer patients (14.4 per 100,000)","percentage":"100.00","source":"Breast cancer India Prevalence and Incidence dat.pdf"},
        //           {"field":"HER2+ Breast Cancer patients (25% of all BrCa)","percentage":"25.00","source":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4991144/?report=printable"},
        //           {"field":"HER2+ Stage I (9% of all HER 2)","percentage":"2.25","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage II (35% of all HER 2)","percentage":"8.75","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage III  (38% of all HER 2)","percentage":"9.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage IV (18% of all HER 2)","percentage":"4.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"Adjuvant Eligible Patients for Perjeta (50% of Stage II & III) (36 of all HER 2)","percentage":"9.13","source":""}
        //       ],
        //   // },
        //   // "Kadcyla":{
        //   },{name:"Kadcyla - HER2 eBC",value:[
        //           {"field":"Total Breast Cancer patients (14.4 per 100,000)","percentage":"100.00","source":""},
        //           {"field":"HER2+ Breast Cancer patients (25% of all BrCa)","percentage":"25.00","source":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4991144/?report=printable"},
        //           {"field":"HER2+ Stage I (9% of all HER 2)","percentage":"2.25","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage II (35% of all HER 2)","percentage":"8.75","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage III  (38% of all HER 2)","percentage":"9.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage IV (18% of all HER 2)","percentage":"4.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"NeoAdjuvant treated patients without PCR (12% of stage II and III) (36% of HER 2)","percentage":"9.13","source":"18% of patients eligible for neo-adjuvant--> only  of which 50% will not achieve PCR which is 9"},
        //           {"field":"Adjuvant patients eligible for Kadcyla (% of all BrCa)","percentage":"9.13","source":""}

        //       ],
        //   },{name:"Kadcyla - HER2 mBC",value:[
        //           {"field":"Total Breast Cancer patients (14.4 per 100,000)","percentage":"100.00","source":""},
        //           {"field":"HER2+ Breast Cancer patients (25% of all BrCa)","percentage":"25.00","source":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4991144/?report=printable"},
        //           {"field":"HER2+ Stage I (9% of all HER 2)","percentage":"2.25","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage II (35% of all HER 2)","percentage":"8.75","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage III  (38% of all HER 2)","percentage":"9.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"HER2+ Stage IV (18% of all HER 2)","percentage":"4.50","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"2L +MBC patients eligible for Kadcyla (% of all BrCa)","percentage":"13.63","source":"IPSOS 2019 Same as 1L as per IPSOS MAT 2019 Slide 37.There is equal number of patients who take treatment in 1L and 2L and above"}

        //       ],
        //   // },
        //   // "Alecensa":{
        //   },{name:"Alecensa",value:[
        //           {"field":"Total Lung Cancer patients (5.8 per 100,000)","percentage":"100.00","source":"Globocan 2018 - https://gco.iarc.fr/today/data/factsheets/populations/356-india-fact-sheets.pdf"},
        //           {"field":"NSCLC patients (88% of all LuCa)","percentage":"88.00","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Non Squamous NSCLC (75% of all NSCLC)","percentage":"66.00","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Stage I-II early ns NSCLC (33% of ns NSCLC)","percentage":"21.78","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"Metastatic (Stage III-IV) ns NSCLC - De Novo (67% of ns NSCLC)","percentage":"44.22","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"Metastatic (Stage III-IV) ns NSCLC from Stage I-II (75% of ns NSCLC) last two years prevalent Stage I-II Pool","percentage":"16.34","source":"This row is for  % of stage 1/2 patients that will progress to stage 3/4 (Assumption based on internal estimate  75% of all stage 1/2 patients will progress to stage 3/4)"},
        //           {"field":"Total metastatic (Stage III-IV) Non Squamous NSCLC","percentage":"60.56","source":"Sum of row 28 & 29 divide by row 26 ( Total patient population of new diagnosis plus old patient pool)"},
        //           {"field":"Incidence (no EGFR / ALK ns NSCLC) (63% of mns NSCLC) (metastatic Wild Type)","percentage":"38.15","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Incidence EGFR+ mns NSCLC (30% of mns NSCLC)","percentage":"18.17","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Incidence ALK+ mns NSCLC (7% of mns NSCLC)","percentage":"4.24","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Squamous NSCLC (25% of all NSCLC)","percentage":"22.00","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Stage I-II early Squamous NSCLC (33% of s NSCLC)","percentage":"7.26","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"Metastatic (Stage III-IV) Squamous NSCLC (67% of s NSCLC)","percentage":"14.74","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"SCLC patients (12% of all LuCa)","percentage":"12.00","source":"https://www.sciencedirect.com/science/article/pii/S1110036216300590, http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Limited Stage (40% of all SCLC)","percentage":"4.80","source":"Advisory board & https://www.sciencedirect.com/science/article/pii/S1110036216300590"},
        //           {"field":"Extensive Stage (60% of all SCLC)","percentage":"7.20","source":"Advisory board & https://www.sciencedirect.com/science/article/pii/S1110036216300590"},
        //           {"field":"Patients with CNS Mets ES- SCLC (8.5% of ext stage SCLC)","percentage":"0.61","source":"Estimates from Clinical trial IMpower133, https://www.nejm.org/doi/full/10.1056/NEJMoa1809064"},
        //           {"field":"Patients without CNS Mets ES- SCLC (91.5% of ext stage SCLC)","percentage":"6.59","source":"Estimates from Clinical trial IMpower133, https://www.nejm.org/doi/full/10.1056/NEJMoa1809064"},
        //           {"field":"1L ALK+LC :: 1L mns ALK+ NSCLC","percentage":"4.24","source":""},
        //           {"field":"2L ALK+LC :: 2L mns ALK+ NSCLC (55% of all 1L mns NSCLC)","percentage":"2.33","source":""},
        //           {"field":"Lung Cancer patients eligible for Alecensa (% of all LuCa)","percentage":"6.57","source":""}
        //       ],
        //   // },
        //   // "Tecentriq":{
        //   },{name:"Tecentriq",value:[

        //           {"field":"Total Lung Cancer patients (5.8 per 100,000)","percentage":"100.00","source":"Globocan 2018 - https://gco.iarc.fr/today/data/factsheets/populations/356-india-fact-sheets.pdf"},
        //           {"field":"NSCLC patients (88% of all LuCa)","percentage":"88.00","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Non Squamous NSCLC (75% of all NSCLC)","percentage":"66.00","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Stage I-II early ns NSCLC (33% of ns NSCLC)","percentage":"21.78","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"Metastatic (Stage III-IV) ns NSCLC - De Novo (67% of ns NSCLC)","percentage":"44.22","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"Metastatic (Stage III-IV) ns NSCLC from Stage I-II (75% of ns NSCLC) last two years prevalent Stage I-II Pool","percentage":"16.34","source":"This row is for  % of stage 1/2 patients that will progress to stage 3/4 (Assumption based on internal estimate  75% of all stage 1/2 patients will progress to stage 3/4)"},
        //           {"field":"Total metastatic (Stage III-IV) Non Squamous NSCLC","percentage":"60.56","source":"Sum of row 28 & 29 divide by row 26 ( Total patient population of new diagnosis plus old patient pool)"},
        //           {"field":"Incidence (no EGFR / ALK ns NSCLC) (63% of mns NSCLC) (metastatic Wild Type)","percentage":"38.15","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Incidence EGFR+ mns NSCLC (30% of mns NSCLC)","percentage":"18.17","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Incidence ALK+ mns NSCLC (7% of mns NSCLC)","percentage":"4.24","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Squamous NSCLC (25% of all NSCLC)","percentage":"22.00","source":"http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Stage I-II early Squamous NSCLC (33% of s NSCLC)","percentage":"7.26","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"Metastatic (Stage III-IV) Squamous NSCLC (67% of s NSCLC)","percentage":"14.74","source":"Prevalence of type and etiology of lung cancer among the patients presented to a tertiary care hospital at central Kerala: a descriptive study"},
        //           {"field":"SCLC patients (12% of all LuCa)","percentage":"12.00","source":"https://www.sciencedirect.com/science/article/pii/S1110036216300590, http://journal.sajc.org/article.asp?issn=2278-330X;year=2017;volume=6;issue=4;spage=171;epage=175;aulast=Singh"},
        //           {"field":"Limited Stage (40% of all SCLC)","percentage":"4.80","source":"Advisory board & https://www.sciencedirect.com/science/article/pii/S1110036216300590"},
        //           {"field":"Extensive Stage (60% of all SCLC)","percentage":"7.20","source":"Advisory board & https://www.sciencedirect.com/science/article/pii/S1110036216300590"},
        //           {"field":"Patients with CNS Mets ES- SCLC (8.5% of ext stage SCLC)","percentage":"0.61","source":"Estimates from Clinical trial IMpower133, https://www.nejm.org/doi/full/10.1056/NEJMoa1809064"},
        //           {"field":"Patients without CNS Mets ES- SCLC (91.5% of ext stage SCLC)","percentage":"6.59","source":"Estimates from Clinical trial IMpower133, https://www.nejm.org/doi/full/10.1056/NEJMoa1809064"},
        //       // ],
        //       // "1L NSCLC":[
        //           {"field":"1L NSCLC : 1L (No EGFR / No ALK ns NSCLC) ( metastatic Wild Type)","percentage":"38.15","source":""},
        //           {"field":"1L NSCLC : 1L (EGFR+ mnsNSCLC TKI exhausted) (30% of Row 65)","percentage":"5.45","source":"Increased from 20% to 30% based on allginment"},
        //           {"field":"1L NSCLC : Lung Cancer patients eligible for Tecentriq (% of all LuCa)","percentage":"76.63"},
        //       // ],
        //       // "2L NSCLC":[
        //           {"field":"2L NSCLC : 2L NSCLC (50% of Row 64 & 69)","percentage":"26.44","source":"50% of both Non Sq and Sq population"},
        //       // ],
        //       // "SCLC":[
        //           {"field":"SCLC : 1L ES-SCLC (91.5% of Row 72)","percentage":"6.59","source":""},
        //       // ],
        //       // "TNBC":[
        //           {"field":"TNBC : Total Breast Cancer patients (14.4 per 100,000)","percentage":"100.00","source":"http://cancerindia.org.in/globocan-2018-india-factsheet/"},
        //           {"field":"TNBC : Breast Cancer patients (30% of all BrCa)","percentage":"30.00","source":"7 per 100,000 (DRG) & 31% of BC (Globocan), 32% of BC ( J Globe Oncology 2016)"},
        //           {"field":"TNBC : Stage I (9% of all TNBC BrCa)","percentage":"2.70","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"TNBC : Stage II (43% of all TNBC BrCa)","percentage":"12.90","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"TNBC : Stage III A (10% of all TNBC BrCa)","percentage":"3.00","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"TNBC : Stage III B (24% of all TNBC BrCa)","percentage":"7.20","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"TNBC : Stage IV (14% of all TNBC BrCa)","percentage":"4.20","source":"https://insights.decisionresourcesgroup.com/disease/breast-cancer/epidemiology/emerging-markets-data"},
        //           {"field":"TNBC : Recurrent patients (30% of all TNBC)","percentage":"12.11","source":"Recurrent patient share from DRG. Applied this % to Stage II pattients i.e. 43% of TNBC patients 1L drug treatable patients (all Stage II recurrent & beyond TNBC BrCa) 23.51"},
        //           {"field":"TNBC : PDL-1 positive patients (41% of all TNBC BrCa)","percentage":"9.64","source":""},
        //           {"field":"TNBC : patients eligible for Tecentriq (% of all BrCa)","percentage":"9.64","source":""},
        //       // ],
        //       // "HCC":[
        //           {"field":"HCC : Total Liver Cancer patients (2.1 per 100,000)","percentage":"100.00","source":""},
        //           {"field":"HCC : patients (90% of all LiCa)","percentage":"90.00","source":"https://www.bms.com/assets/bms/us/en-us/pdf/Disease-State-Info/HEPATOCELLULAR-CARCINOMA-BY-THE-NUMBERS.pdf"},
        //           {"field":"HCC : Localized HCC (not in label) (19% of all HCC)","percentage":"17.10","source":"Market research: Obtained from interaction with 12 KOLs (medical oncologists / surgical oncologists in India treating HCC patients)"},
        //           {"field":"HCC : Locally Advanced HCC (37% of all HCC)","percentage":"33.30","source":"Market research: Obtained from interaction with 12 KOLs (medical oncologists / surgical oncologists in India treating HCC patients)"},
        //           {"field":"HCC : Resectable LA HCC (not in label) (14% of LA HCC)","percentage":"4.66","source":"Market research: Obtained from interaction with 12 KOLs (medical oncologists / surgical oncologists in India treating HCC patients)"},
        //           {"field":"HCC : Un-resectable LA HCC (86% of LA HCC)","percentage":"28.64","source":"Market research: Obtained from interaction with 12 KOLs (medical oncologists / surgical oncologists in India treating HCC patients)"},
        //           {"field":"HCC : Patient Eligible for Systemic Therapy (57% of all Un-resectable LA HCC) (Sorafenib/Lenvatinib/Chemo)","percentage":"16.32","source":"Pool eligible for Tencetriq"},
        //           {"field":"HCC : Recurrent / Metastatic HCC (44% of all HCC)","percentage":"39.60","source":"Market research: Obtained from interaction with 12 KOLs (medical oncologists / surgical oncologists in India treating HCC patients)"},
        //           {"field":"HCC : 1L R/M HCC (100% of R/M HCC)","percentage":"39.60","source":""},
        //           {"field":"HCC : 1L R/M HCC (76% are eligible for systemic therapy; 24% have Child Pugh C status hence not eligible)","percentage":"30.10","source":"Pool eligible for Tencetriq"},
        //           {"field":"HCC : 2L R/M HCC (not in label) (31% of R/M HCC)","percentage":"12.28","source":"Market research: Obtained from interaction with 12 KOLs (medical oncologists / surgical oncologists in India treating HCC patients)"},
        //           {"field":"HCC : 3L R/M HCC (not in label) (17% of R/M HCC)","percentage":"6.73","source":"Market research: Obtained from interaction with 12 KOLs (medical oncologists / surgical oncologists in India treating HCC patients)"},
        //           {"field":"HCC : Liver Cancer patients eligible for Tecentriq (% of all LiCa)","percentage":"46.42","source":"Total pool eligible for Tecentriq"}
        //       ],
        //   // },
        //   // "Hemlibra":{
        //   },{name:"Hemlibra",value:[
        //           {"field":"Total Hemophilia patients (10 per 100,000)","percentage":"100.00","source":"A Srivastava et al, Haemophilia,  (2013), 19, e1–e47"},
        //           {"field":"Hemophilia A (80% of all PwH)","percentage":"80.00","source":"Sachdeva Anupam et al, Indian Pediatrics , volume 55; July 15, 2018; 582-590"},
        //           {"field":"Mild Hemophilia A (5% of all PwH-A)","percentage":"4.00","source":"Haemophilia. 2001 May;7(3):273-8."},
        //           {"field":"Moderate Hemophilia A (10% of all PwH-A)","percentage":"8.00","source":"Haemophilia. 2001 May;7(3):273-8."},
        //           {"field":"Severe Hemophilia A (85% of all PwH-A)","percentage":"68.00","source":"Haemophilia. 2001 May;7(3):273-8."},
        //           {"field":"Severe Hemophilia A with inihibitors (9% of all s PwH-A)","percentage":"6.12","source":"Phadke S , Indian J Hemat Blood Transfusion; 2011 Sep; 27(3): 121–126."},
        //           {"field":"Severe Hemophilia A age 0-12 (26% of all s PwH-A)","percentage":"17.68","source":"WFH Annual Global Survey 2017, published in October 2018"},
        //           {"field":"Severe Hemophilia A age 12-18 (16% of all s PwH-A)","percentage":"10.88","source":"WFH Annual Global Survey 2017, published in October 2018"},
        //           {"field":"Severe Hemophilia A age >12 (58% of all s PwH-A)","percentage":"39.44","source":"WFH Annual Global Survey 2017, published in October 2018"},
        //           {"field":"Hemophilia patients eligible for Hemlibra (% of all PwH)","percentage":"68.00","source":""}]
        //       }
        //   // }
      ],
      map:{}
  }

cfForm:any = {}


constructor(private router: Router,private winRef: WindowRef, private apiService: ApiServiceService, public gv: GlobalVariablesService,public datepipe: DatePipe) {}
ngOnInit(): void {


  if (this.portal.consolidatedSplit) {
    const groupedObj = this.portal.consolidatedSplit.reduce((prev, cur) => {
      if (!prev[cur['igName']]) {
        prev[cur['igName']] = [cur];
      } else {
        prev[cur['igName']].push(cur);
      }
      return prev;
    }, {});
    this.settingObj.indicationgroup = Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }


  if (this.portal.productIndicationList) {

    var obj:any = {};
    for(let i=0;i<this.portal.productIndicationList.length;i++){
      for(let j=0;j<this.portal.productIndicationList[i].ctrls.length;j++){
        // this.settingObj.setting[i].ctrls[j]['id'] = 'P'+i+'C'+j;
        // cobj['P'+i+'C'+j] = this.settingObj.setting[i].value[j]['percentage']
        obj['f_'+this.portal.productIndicationList[i].ctrls[j]['id']] = this.portal.productIndicationList[i].ctrls[j]['value']
      }
    }
    this.settingObj.map = obj;
    // console.log(this.settingObj.map)
    // const groupedObj = this.portal.productIndicationList.reduce((prev, cur) => {
    //   if (!prev[cur['igName']]) {
    //     prev[cur['igName']] = [cur];
    //   } else {
    //     prev[cur['igName']].push(cur);
    //   }
    //   return prev;
    // }, {});
    // console.log(this.portal.productIndicationList)
    this.settingObj.setting = this.portal.productIndicationList
  }



  this.cfForm = {
    oop:this.portal.correctionFactor.oop,
    def:this.portal.correctionFactor.def,
    cghs:this.portal.correctionFactor.cghs,
    railways:this.portal.correctionFactor.railways,
    psu:this.portal.correctionFactor.psu,
    esi:this.portal.correctionFactor.esi,
    stGvt:this.portal.correctionFactor.stGvt,
    others:this.portal.correctionFactor.others,
  }


  // for(let i=0;i<this.settingObj.setting.length;i++){
  //   for(let j=0;j<this.settingObj.setting[i].value.length;j++){
  //     this.settingObj.setting[i].value[j]['id'] = 'P'+i+'C'+j;
  //     obj['P'+i+'C'+j] = this.settingObj.setting[i].value[j]['percentage']
  //   }
  // }



var parser = new Parser();


var obj:any = {id123:12,id124:13}
const formulastr:any = '[id123]+[id124]';
var formula:any = formulastr;

const ids:any = formulastr.match(/\[.+?\]/g);
for (let i = 0; i < ids.length; i++) {
var f = ids[i].replace("[","").replace("]","")
// console.log(ids[i],obj[f]);
formula = formula.replace(ids[i],obj[f])
// console.log(formula);
}
// console.log(parser.parse(formula));


// var expr = parser.parse('4.50/33%*67%');

// console.log(parser.parse('((4.50/(33/100))*(67/100))').evaluate());


// console.log(Parser.evaluate('id123+id124', obj) );
// console.log(Parser.evaluate(formulastr, obj) );
// console.log(parser.parse('[id123]+[id124]').evaluate(obj));




  let now = new Date(),data1:any=[],data2:any=[];

  this.barChartLabels = [
      "Perjeta HER2 Neo Adj",
      "Perjeta HER2 mBC",
      "Perjeta HER2 Adj",
      "Kadcyla HER2 eBC",
      "Kadcyla HER2 mBC",
      "Alecensa 1L ALK+LC",
      "Alecensa 2L ALK+LC",
      "Tecentriq 1L NSCLC",
      "Tecentriq 2L NSCLC",
      "Tecentriq SCLC",
      "Tecentriq TNBC",
      "Tecentriq HCC",
      "Hemlibra",
  ]
  this.barChartData[0].data = [18,14,9,9,14,4,2,44,26,7,10,46,68]
  this.barChartData[1].data = [100,50,100,100,50,100,100,100,100,100,100,100,100]
  // for(let i=15;i>0;i--){
  //   data1.push(Math.floor(Math.random() * 100));
  //   data2.push(Math.floor(Math.random() * 100));
  // //   data3.push(Math.floor(Math.random() * 4));
  // //   this.barChartLabels.push(this.getdateFromat(new Date(now.setDate(now.getDate() - 1))))
  // }
  //   this.barChartData[0].data = data1
  //   this.barChartData[1].data = data2
  //   this.barChartData[2].data = data3

  //   this.barChartLabels = this.barChartLabels.reverse();
  // setTimeout(() => {
     this.apiCall = false;
  // }, 2000);

}
  // this.settingObj.setting.sort(function(a: { order: number; },b: { order: number; }) {
  //     return a.order - b.order;
  // });


  // this.settingObj =

// console.log(Object.entries(s.setting))

// var s = this.settingObj;
// for (const [key, value] of Object.entries(this.settingObj.setting)) {
//   var obj:any = {};
//   console.log(value)
//   for (const [key2, value2] of Object.entries(value)) {
//     obj['product'] = key;
//     obj['controller'] = key2;
//     obj['head'] = key + key2;
//     for (const v of value2) {
//         // console.log(key, key2 ,value2);
//         this.newobj.push({...obj,...v})
//     }
//   }
// console.log(`${key}: ${value}`);
// console.log(value);
// }
// setTimeout(() => {
//   console.log(this.newobj)
// }, 2000);


// Object.keys(Object.entries(s.setting)).map((key,val) =>

//   // console.log(Object.entries(s.setting))
//   console.log(key,val)
// )

onCFSubmit(form:any) {
  this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/editCorrectionFactor`,(r:any)=>{
    this.gv.portal['correctionFactor'] = {...this.gv.portal['correctionFactor'],...this.cfForm};
  },(error:any)=>{})
}

get portal(){
  return this.gv.portal;
}
get correctionFactor(){
  if(!this.portal.correctionFactor){
    return []
  }else{
    return [
      {name:"OOP",percentage:this.portal.correctionFactor.oop},
      {name:"Defence & ECHS",percentage:this.portal.correctionFactor.def},
      {name:"CGHS",percentage:this.portal.correctionFactor.cghs},
      {name:"Railways",percentage:this.portal.correctionFactor.railways},
      {name:"PSU",percentage:this.portal.correctionFactor.psu},
      {name:"ESI",percentage:this.portal.correctionFactor.esi},
      {name:"State Govt",percentage:this.portal.correctionFactor.stGvt},
    ]

  }

}



pushwallet(){this.clientForm.walletDetails.push({cryptoNetwork:null,walletAddress:'',cryptoType:null,formula:''})}

getdateFromat(d:any){
  return this.datepipe.transform(d, 'MMM-dd')
}

addindication(obj:any){
  // obj.name
  this.popuptype = 'controller';this.addEditpopup=true;
}

addproduct(t:any){
  this.popuptype = 'product';this.addEditpopup=true;
}

evaluateFormula(){
  this.picForm.formulaVal = null;
  var parser = new Parser();
  if(parser.parse(this.picForm.formula))
    this.picForm.formulaVal = parser.parse(this.picForm.formula).evaluate(this.settingObj.map);
}

currentDeleteObj:any={ptype:''};
deleteConfirmation(type:any,obj:any){
  this.popuptype = type;
  this.currentDeleteObj = {...this.currentDeleteObj,...obj};
}

picForm:any={}
addCtrlSubmit(form:any){
  // console.log(this.picForm)
}
currentCntrlObj:any;
addEditCtrl(type:any,obj:any,obj2:any){this.popuptype = type;
  this.currentCntrlObj = obj;
  if(type=='editCtrl'){this.picForm['id'] = obj2.id}else{delete this.picForm['id']};
  this.picForm.formula = (obj2.formula)?obj2.formula:obj2.value;
  this.picForm.cname = (obj2.name)?obj2.name:null;
  this.picForm.source = (obj2.source)?obj2.source:null;
  this.picForm.formulaVal = obj2.value;
  // console.log(this.picForm)
}

PIDetails:any = {
  popupValue:'add',
  popupTypes:[
    {text:'Add New',value:'add'},
    {text:'Delete',value:'delete'},
    // {text:'Mapping',value:'map'},
  ],
  productName:'',
  product:this.portal.productList[0].id,
  indicationName:'',
  indication:this.portal.indicationList[0].id,
  indicationGroupName:'',
  indicationGroup:this.portal.indicationGroupList[0].id
}

productIndicationSubmit(){
  // console.log(this.popuptype,this.PIDetails.popupValue,this.PIDetails)
  // this.popuptype = ''; this.PIDetails.popupValue='add'
  var url='';
  if(this.popuptype == 'product'){
    if(this.PIDetails.popupValue == 'add')
      url='addProduct'
    else if(this.PIDetails.popupValue == 'map')
      url='mapProductIndication'
    else(this.PIDetails.popupValue == 'add')
      url='removeProduct'
  }else if(this.popuptype == 'indication'){
    if(this.PIDetails.popupValue == 'add')
      url='addIndication'
    else
      url='removeIndication'
  }else if(this.popuptype == 'indicationGroup'){
    if(this.PIDetails.popupValue == 'add')
      url='addIndicationGroup'
    else
      url='removeIndicationGroup'
  }


  // console.log(url)

  this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/`+url,(r:any)=>{},(error:any)=>{})

}

deleteCallback(){
    // console.log(this.currentDeleteObj);
    var c = this.currentDeleteObj;
    var obj = {},url='';
    if(c.ptype == "product"){
      obj['id'] = c.product;url= 'removeProduct';
    }else if(c.ptype == "indication"){
      obj['id'] = c.indication;url= 'removeIndication';
    }else if(c.ptype == "indicationGroup"){
      obj['id'] = c.indicationGroup;url= 'removeIndicationGroup';
    }else if(c.ptype == "controller"){
      obj['id'] = c.id;url= 'removeProduct';
    }else if(c.ptype == "productIndication"){
      obj['id'] = c.id;url= 'removeProductIndication';
    }

    this.apiService.getMethod(`${this.gv.baseUrl}roche/dalton/portal/`+url+'?id='+obj['id'],(r:any)=>{},(error:any)=>{})

    this.popuptype = ''
}


}



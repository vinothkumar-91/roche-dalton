import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ApiServiceService } from '../../api-service.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartColors:Array<any> = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)']

public borderColor:any = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
]
  public productlist:any = [

    {
      name:"Perjeta",
      label:["","HER2 Neo Adj","HER2 mBC","HER2 Adj"],
      data:[
        { barThickness: 12,
          borderWidth: 1,borderColor: this.borderColor[3],backgroundColor: this.barChartColors[3], data: [0,100,50,100], label: 'Contribution'},
        { barThickness: 12,
          borderWidth: 1,borderColor: this.borderColor[4],backgroundColor: this.barChartColors[4], data: [0,18,14,9], label: 'Eligible'},
      ]
    },
    {
      name:"Kadcyla",
      label:["","HER2 Neo Adj","HER2 mBC","HER2 Adj"],
      data:[
        { barThickness: 12,borderWidth: 1,borderColor: this.borderColor[3],backgroundColor: this.barChartColors[3], data: [0,100,50,100], label: 'Contribution'},
        { barThickness: 12,borderWidth: 1,borderColor: this.borderColor[4],backgroundColor: this.barChartColors[4], data: [0,18,14,9], label: 'Eligible'},
      ]
    }
  ]


  public overallChart:any = {
    label:[
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
      "Hemlibra"
    ],
    data:[
      { barThickness: 12,borderWidth: 1,borderColor: this.borderColor[3],backgroundColor: this.barChartColors[3], data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], label: 'Contribution'},
      { barThickness: 12,borderWidth: 1,borderColor: this.borderColor[4],backgroundColor: this.barChartColors[4],data: [0.4, 0.4, 0.4, 0.4,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], label: 'Eligible'}

      // , {
      //   label: 'CGHS',barThickness: 12,
      //   data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
      // }, {
      //   label: 'Railways',barThickness: 12,
      //   data: [0.3, 0.4, 0.5, 0.3,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
      // }, {
      //   label: 'PSU',barThickness: 12,
      //   data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
      // }, {
      //   label: 'ESI',barThickness: 12,
      //   data: [0.3, 0.4, 0.5, 0.3,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
      // }, {
      //   label: 'State Govt',barThickness: 12,
      //   data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
      // }
    ]
  }

  public potential:any= {
    chartData:[
      {
      label: 'OOP',
      // borderWidth: 1,borderColor: this.borderColor[0],backgroundColor: this.barChartColors[0],
      data: [0.4, 0.4, 0.4, 0.4,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
    }, {
      label: 'Defence & ECHS',
      // borderWidth: 1,borderColor: this.borderColor[1],backgroundColor: this.barChartColors[1],
      data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
    }, {
      label: 'CGHS',
      // borderWidth: 1,borderColor: this.borderColor[2],backgroundColor: this.barChartColors[2],
      data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
    }, {
      label: 'Railways',
      // borderWidth: 1,borderColor: this.borderColor[3],backgroundColor: this.barChartColors[3],
      data: [0.3, 0.4, 0.5, 0.3,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
    }, {
      label: 'PSU',
      // borderWidth: 1,borderColor: this.borderColor[4],backgroundColor: this.barChartColors[4],
      data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
    }, {
      label: 'ESI',
      // borderWidth: 1,borderColor: this.borderColor[5],backgroundColor: this.barChartColors[5],
      data: [0.3, 0.4, 0.5, 0.3,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
    }, {
      label: 'State Govt',
      // borderWidth: 1,borderColor: this.borderColor[6],backgroundColor: this.barChartColors[6],
      data: [0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6, 0.5, 0.4, 0.6,0.6], stack: 'a'
    }
    ],
    chartLabels : [
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
  }


  constructor(private authService: AuthService,route: ActivatedRoute,private router: Router,private http:HttpClient, private gv: GlobalVariablesService, private apiService: ApiServiceService) { }

  ngOnInit(): void {
  }


}

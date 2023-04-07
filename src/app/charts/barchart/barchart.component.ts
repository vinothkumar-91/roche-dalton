import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() height: any;
  @Input() barChartData: any;
  @Input() barChartLabels: any;

  public sbarChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      colors: {
        forceOverride: true
      }
    },
    legend: {
        display: true,
        position: 'bottom',
        labels: {
            fontColor: '#333'
        }
    },
    scales: {
        xAxes: [{
          ticks: {
            min: 0,beginAtZero: true
          },
            gridLines: {
                color: "#fafafa",
            },
        }],
        yAxes: [{
          ticks: {
            min: 0,max: 12,beginAtZero: true
          },
            gridLines: {
                color: "#fafafa",
            }
        }]
    }
  };

  public sbarChartColors:Array<any> = [{backgroundColor: '#ff9f40'},{backgroundColor: '#36a2eb'},];



  constructor() {
  }

  ngOnInit(): void {

  }

}

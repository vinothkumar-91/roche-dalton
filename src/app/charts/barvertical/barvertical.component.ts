import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-barvertical',
  templateUrl: './barvertical.component.html',
  styleUrls: ['./barvertical.component.css']
})
export class BarverticalComponent implements OnInit {

  @Input() chartData: any;


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
            min: 0,max: 5,beginAtZero: true
          },
            gridLines: {
                color: "#fafafa",
            }
        }]
    }
  };



  constructor() {
  }

  ngOnInit(): void {

  }

}

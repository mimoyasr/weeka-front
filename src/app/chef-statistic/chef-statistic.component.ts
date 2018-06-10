import { Component, OnInit } from '@angular/core';
import {  StatisticsService } from '../statistics.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cheaf-statistic',
  templateUrl: './chef-statistic.component.html',
  styleUrls: ['./chef-statistic.component.scss']
})
export class ChefStatisticComponent implements OnInit {
  chart = []; // This will hold chart info
  constructor(private _statistics: StatisticsService) { 

  }

  ngOnInit() {
    this._statistics.getStatistics()
      .subscribe(res => {
        console.log(res)

        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt)
        let weatherDates = []
        alldates.forEach((res) => {
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false
              },
              { 
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en',
          { year: 'numeric', month: 'short', day: 'numeric' }))
          })

            })
  }




  

}

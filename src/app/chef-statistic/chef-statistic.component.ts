import { Component, OnInit } from '@angular/core';
import {  StatisticsService } from '../statistics.service';
//=========== services ================
import { QueryService } from '../query.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-cheaf-statistic',
  templateUrl: './chef-statistic.component.html',
  styleUrls: ['./chef-statistic.component.scss']
})
export class ChefStatisticComponent implements OnInit {
  chart = []; // This will hold chart info
  chart2 = []; // This will hold chart info
  constructor(private Q: QueryService,) { 

  }

  ngOnInit() {
    let mealNames =[];
    let mealRate =[];
    let yearMonths =[];
    let chefRate =[];
    let tops = [];
    let path: string = "./assets/meals-statistics.json";
      this.Q.getData(path)
        .subscribe(res => {
          let obj = res;
          for(let x in obj)
          {
            obj[x].forEach(element => {            
              if(x == "chefRate")
              {
                yearMonths.push(element['month'])
                chefRate.push(element['rate'])
              }
              else if(x == "tops")
              {
                tops.push(element)
              }
              else {
                mealNames.push(element['MealName'])
                mealRate.push(element['avgRate'])
              }
            });
          } 
          console.log(tops)
          // Meals chart
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels:mealNames,
              datasets: [
                {
                  label:"معدل تقييم الوجبات",
                  data:mealRate,
                  backgroundColor: 
                  [
                    'rgba(170,1,20,1)',
                    'rgba(170,1,20,1)',
                    'rgba(170,1,20,1)',
                    'rgba(170,1,20,1)',
                    'rgba(234,211,168,1)',
                    'rgba(234,211,168,1)',
                    'rgba(234,211,168,1)',
                    'rgba(234,211,168,1)'
                  ]
                }
              ]
          }
          });

          //chef rate chart
          this.chart2 = new Chart('canvas2', {
            type: 'line',
            data: {
              labels:yearMonths,
              datasets: [
                {
                  label:"معدل تقييم الطباخ",
                  data:chefRate,
                  borderColor: "#ddd",
                  fill: false
                }
              ]
                }
          });
      })
  }
}
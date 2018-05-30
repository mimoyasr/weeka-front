import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { QueryService } from '../query.service';



@Component({
  selector: 'app-meal-comment',
  templateUrl: './meal-comment.component.html',
  styleUrls: ['./meal-comment.component.scss']
})
export class MealCommentComponent implements OnInit {
  public comments: Array<object>;
  public newComment: object;
  public userComment: string;


  constructor(private q: QueryService) {
    this.comments = [];
    this.getComments();
    this.newComment={};
    
  }


  //function to get comments from json file   

  getComments(): void {
    let path: string = '../../assets/meal-comment.json';
    this.q.getData(path).subscribe(
      res => {
        this.comments = res;
        console.log(this.comments);
      },
      err => {
        console.log(err);
      }
    )
  }
  // function to add new comment

  addNewComment(): void {
    this.newComment['userComment'] = this.userComment;
    this.newComment['mealRate'] = "5";
    this.newComment['mealId'] = "";
    this.comments.push(this.newComment);
    this.userComment = "";

    console.log(this.newComment);

  }

  ngOnInit() {


  }

}

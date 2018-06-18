import { Component, OnInit , Input ,ViewChild,ElementRef} from '@angular/core';
import { NgModel } from '@angular/forms';
import { QueryService } from '../query.service';
import { starRatingColor } from 'angular-star-rating/src/interfaces/star-rating-config.interface';
import { transition } from '@angular/animations/src/animation_metadata';
import { validateConfig } from '@angular/router/src/config';
import { concat } from 'rxjs/internal/observable/concat';
import {  HttpHeaders } from '@angular/common/http';
import { TransferDataService } from '../transfer-data.service';




@Component({
  selector: 'app-meal-comment',
  templateUrl: './meal-comment.component.html',
  styleUrls: ['./meal-comment.component.scss']
})
export class MealCommentComponent implements OnInit {
  public comments: Array<object>;
  public newComment: object;
  public userComment: string;
  public userRate: number;
  public readonly = true;
  public mealRate:number;
  @Input('data') mealId :string;
  public mealslug:string;
  public distslug :string;
  public commentState:boolean;
  public p: number  ;
  collection: any[] = this.comments; 
  public items:number;
  public commented:boolean;
  @ViewChild ('myeditedCommemt') myeditedCommemt:ElementRef;
  @ViewChild ('myCommemt') myCommemt:ElementRef;
  public editMood:boolean;

  public  token:String;
  public logedUser:Object;


  


  constructor(private q: QueryService,private transfer : TransferDataService) {
    this.comments = [];
    this.newComment = {};
    this.mealRate=0;
    this.p=1;
    this.items=3;
    this.commented=false;
    this.editMood=false;
    this.token = localStorage.getItem('token');
    
  }


  //function to get comments from json file   

  getComments(): void {
    this.mealslug=this.q.getMeal();
    this.distslug=this.q.getDist();
    this.commentState=this.q.getState();
   
    let path: string = `http://weeka.herokuapp.com/api/districts/${this.distslug}/menu/${this.mealslug}`;
    this.q.getData(path).subscribe(
      res => {
        this.comments = res.data.reviews;
         console.log(this.comments);
         this.getLoginedData();
         console.log(this.logedUser);
         console.log(this.token);
      },
      err => {
        console.log(err);
      }
    )
  }
  // function to add new comment

  addNewComment(): void {
    this.newComment['comment'] = this.userComment;
    this.newComment['rate'] = this.userRate;
    this.newComment['meal_id'] = this.mealId;
    this.newComment['user_id'] = '6';

    this.comments.unshift(this.newComment);
    this.userComment = "";
    this.userRate = 0;
    this.commented=true;
    console.log(this.newComment);

    let path = 'http://weeka.herokuapp.com/api/reviews';
    this.q.postData(path, this.newComment).subscribe(res => console.log("commented"),
      err => { console.log("server err") });
  }

  //pagination function 
  update(){  
    this.items=this.items+3;
  }
//delete user comment
deleteComment(){
  this.comments.shift();
  this.commented=false;
}
//edit user comment
editComment(){
  this.editMood=true;
}
// save edited comment
saveComment(){
 
  this.editMood=false;
  console.log(this.newComment);
}


// get logined user data
getLoginedData() {
  if(this.token){
    let path2 = "http://weeka.herokuapp.com/api/profile";
    return this.q.getData2(path2, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
    }).subscribe(res2 => {
      console.log(res2);
      this.logedUser = res2.data;
      this.transfer.setData(this.logedUser);
    })
  }
}

  ngOnInit() {

  }

}

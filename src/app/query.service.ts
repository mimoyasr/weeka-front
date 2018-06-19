import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { starRatingColor } from 'angular-star-rating/src/interfaces/star-rating-config.interface';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private area: string;
  private chefData: object;
  private mealslug: string;
  private districtslug: string;
  private userData: object;

  constructor(private http: HttpClient) {
    this.chefData = {};
  }

  getData(path: string): Observable<any> {
    return this.http.get(path);
  }
  setArea(val: string) {
    this.area = val;
  }
  getArea() {
    return this.area;
  }

  postData(path: string, data): Observable<any> {
    return this.http.post(path, data);
  }
  postDataHeader(path: string, header, data?): Observable<any> {
    return this.http.post(path, header, data);

  }

  patchData(path: string, data, header): Observable<any> {
    return this.http.patch(path, data, header);
  }

  putData(path: string, data, header): Observable<any> {
    return this.http.put(path, data, header);
  }
  // for send token to server
  getData2(path: string, header): Observable<any> {
    return this.http.get(path, header);
  }

  //============ setter & getter for chef data =============
  setChefData(val: object) {
    this.chefData = val;
  }
  getChefData() {
    return this.chefData;
  }


  // get data from single item
  set_Meal_dist(dist: string, meal: string) {

    this.districtslug = dist;
    this.mealslug = meal;


  }
  getMeal() {
    return this.mealslug;
  }
  getDist() {
    return this.districtslug;
  }

  //============ setter & getter for user data =============
  setUserData(val: object) {
    this.userData = val;
  }
  getUserData() {
    return this.userData;
  }


}

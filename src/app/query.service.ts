import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { starRatingColor } from 'angular-star-rating/src/interfaces/star-rating-config.interface';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private area: string;

  constructor(private http: HttpClient) {
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

  postData(path: string,data): Observable<any> {
    return this.http.post(path,data);
  }
  postDataHeader(path: string,header, data ?): Observable<any> {
    console.log("from service")
    console.log(data)
    return this.http.post(path,data,header);

  }

  patchData(path: string, data): Observable<any> {
    return this.http.patch(path, data);
  }

  putData(path: string, data): Observable<any> {
    return this.http.put(path, data);
  }
  // fot send token to server
  getData2(path: string, header): Observable<any> {
    return this.http.get(path, header);
  }

}

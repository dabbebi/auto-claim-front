import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from '../back-end-url';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http : HttpClient) { }

  getStat(){
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.get<any>(backendUrl + '/stat',{ headers: reqHeader });
  }
}

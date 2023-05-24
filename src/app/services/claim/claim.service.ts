import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from '../back-end-url';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http : HttpClient) { }

  getAllClaims(){
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.get<any>(backendUrl + '/claim/all',{ headers: reqHeader });
  }

  deleteOneClaim(id: string){
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.delete<any>(backendUrl + '/claim/' + id,{ headers: reqHeader });
  }

  deleteMultipleClaim(claims: any[]){
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.post<any>(backendUrl + '/claim/delete', claims,{ headers: reqHeader });
  }

  createClaim(claim: any) {
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.post<any>(backendUrl + '/claim', claim,{ headers: reqHeader });
  }

  updateClaim(id: string, claim: any) {
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.put<any>(backendUrl + '/claim/' + id, claim,{ headers: reqHeader });
  }

  getOneClaim(id: string) {
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.get<any>(backendUrl + '/claim/' + id, { headers: reqHeader });
  }
}

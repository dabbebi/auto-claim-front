import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from '../back-end-url';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http : HttpClient) { }

  getAllContracts(){
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.get<any>(backendUrl + '/contract/all',{ headers: reqHeader });
  }

  deleteOneContract(id: string){
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.delete<any>(backendUrl + '/contract/' + id,{ headers: reqHeader });
  }

  deleteMultipleContract(contracts: any[]){
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.post<any>(backendUrl + '/contract/delete', contracts,{ headers: reqHeader });
  }

  createContract(contract: any) {
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.post<any>(backendUrl + '/contract', contract,{ headers: reqHeader });
  }

  updateContract(id: string, contract: any) {
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.put<any>(backendUrl + '/contract/' + id, contract,{ headers: reqHeader });
  }

  getOneContract(id: string) {
    var reqHeader = new HttpHeaders({ 'Authorization': '' + localStorage.getItem("token")});
    return this.http.get<any>(backendUrl + '/contract/' + id, { headers: reqHeader });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from 'src/app/models/userDetails.model';
import { CredentialsDetails } from 'src/app/models/credentialsDetails.model';
const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }

  login(credentials : CredentialsDetails){
    return this.http.post<any>(url + '/auth/login', credentials);
  }

  register(user : UserDetails){
    return this.http.post<any>(url + '/users', user);
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 

  
  constructor() { }
  // write the methods to store the token in local storage and to retrieve it

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  // write a method to check if the user is logged in
  isLoggedIn() {
    return this.getToken() !== null;
  }
  // write a method to log the user out
  logout() {
    this.removeToken();
  }

  

}

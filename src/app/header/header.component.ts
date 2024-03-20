import { Component } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  authservice: AuthserviceService = new AuthserviceService();
  isloggedin: boolean = false;

  constructor(private router: Router) {


    this.isloggedin = this.authservice.isLoggedIn();

  }

  logout() {

    console.log('logout')
    this.authservice.removeToken();
    this.isloggedin = false;
    this.router.navigate(['/home']);
  }
}

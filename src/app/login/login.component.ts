import { Component } from '@angular/core';
import { Student } from '../models/Student';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../master.service';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isloggedin: boolean = false;
  auth: AuthserviceService = new AuthserviceService();
  master: MasterService = new MasterService(this.http);
  passwordVisible:any =false
  Std: Student = new Student();


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }
  onSubmit(loginForm: any) {
    this.Std.email = loginForm.value.email;
    this.Std.password = loginForm.value.password;
    this.master.loginuser(this.Std).subscribe(
      (response: any) => {
        // Check if the response is a string
        this.auth.setToken(response.token);
        console.log(response.token);
        console.log(response);
        console.log(response.user.id);
        if (response.user.authorities[0].authority === 'ADMIN') {
          this.router.navigate(['/adminpage']);
        }
        else {
          this.router.navigate(['/userpage'], { queryParams: { id: response.user.id } });
        }
      },
      (error) => {
        console.error(error);
      }
    );
    loginForm.reset();
  }
  togglePasswordVisibility() {
    if (this.passwordVisible == true)
    {
      this.passwordVisible=false;
    }
    else
    {
      this.passwordVisible=true;
    }
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MasterService } from '../master.service';
import { Student } from '../models/Student';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  auth: AuthserviceService = new AuthserviceService();
  Student: Student = new Student();
  master: MasterService = new MasterService(this.http);
  passwordVisible: any = false;
 

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  onSubmit(form: NgForm) {
    const formData = form.value;
    this.Student.name = form.value.name;
    this.Student.email = form.value.email;
    this.Student.password = form.value.password;
    this.Student.department = form.value.department;
    form.reset();
    this.master.createusser(this.Student).subscribe(
      (response: any) => {
        this.auth.setToken(response.token);
        console.log(response);
        this.router.navigate(['/userpage']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  togglePasswordVisibility() {
    if (this.passwordVisible == true) {
      this.passwordVisible = false;
    }
    else {
      this.passwordVisible = true;
    }
  }
}

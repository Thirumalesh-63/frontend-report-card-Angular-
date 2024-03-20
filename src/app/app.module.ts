import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { AdminsidenavComponent } from './adminsidenav/adminsidenav.component';
import { AddsubjectComponent } from './addsubject/addsubject.component';
import { AddexamComponent } from './addexam/addexam.component';
import { AddmarksComponent } from './addmarks/addmarks.component';
import { MatListModule } from '@angular/material/list';
import {MatSidenav} from '@angular/material/sidenav'; 
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { SubjectsComponent } from './subjects/subjects.component';
import { ExamsComponent } from './exams/exams.component';
import { ViewmarksComponent } from './viewmarks/viewmarks.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    AdminhomepageComponent,
    UserhomepageComponent,
    AdminsidenavComponent,
    AddsubjectComponent,
    AddexamComponent,
    AddmarksComponent,
    SubjectsComponent,
    ExamsComponent,
    ViewmarksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule, 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

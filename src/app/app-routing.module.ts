import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { AddsubjectComponent } from './addsubject/addsubject.component';
import { AddexamComponent } from './addexam/addexam.component';
import { AddmarksComponent } from './addmarks/addmarks.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ExamsComponent } from './exams/exams.component';
import { ViewmarksComponent } from './viewmarks/viewmarks.component';



const routes: Routes = [

  // write the routes here home to Homecopoment, login to LoginComponent, signup to SignupComponent,empty route redirect  to home

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userpage', component: UserhomepageComponent },

   // Catch-all route at the end
  {
    path: 'adminpage', component: AdminhomepageComponent,
    children: [
      { path: 'viewmarks', component: ViewmarksComponent },
      { path: 'Subjects', component: SubjectsComponent },
      { path: 'Exam', component: ExamsComponent},
      { path: 'Marks', component: AddmarksComponent },
      { path: 'addsubjects', component: AddsubjectComponent },
      { path: 'addExams', component: AddexamComponent },
      { path: 'addMarks', component: AddmarksComponent },
    ]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

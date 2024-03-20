import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './models/Student';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { subjects } from './models/subjects';
import { exam } from './models/exam';
import { Marks } from './models/marks';



@Injectable({
  providedIn: 'root'
})
export class MasterService {


  auth: AuthserviceService = new AuthserviceService();

  constructor(
    private http: HttpClient
  ) { }


  deletemarks(element:any){
    return this.http.delete(`http://localhost:8080/admin/marksbyid/${element.mid}`)
  }
  updatemarks(marks: Marks) {

     return this.http.put('http://localhost:8080/admin/marks', marks)
  }


  getmarksfortheuser(id: any) {
    return this.http.get(`http://localhost:8080/admin/marksforuser/${id}`)
  }

  loginuser(Std: Student) {
    return this.http.post('http://localhost:8080/api/loginstudent', Std)
  }


  createusser(Student: Student) {
   return this.http.post('http://localhost:8080/api/createstudent', Student)

  }


  createsubject(sub: subjects) {
    return this.http.post('http://localhost:8080/admin/subject', sub)
  }

  createexam(exam: exam) {
    return this.http.post('http://localhost:8080/admin/exam', exam)
  }

  getallusers() {
    return this.http.get('http://localhost:8080/api/allstudents')
  }
  getallsubjects() {
    return this.http.get('http://localhost:8080/admin/subject')
  }
  getallExams() {
    return this.http.get('http://localhost:8080/admin/exam')
  }

  addmarks(marks: Marks) {
    return this.http.post('http://localhost:8080/admin/marks', marks)
  }

  getMarksbyexamanduser(id:any,name:any) {
    return this.http.get(`http://localhost:8080/admin/marksforexamanduser/${id}/${name}`)
  }


  updatesubject(sub: any) {
    return this.http.put('http://localhost:8080/admin/subject', sub)
  }


  deletesubject(subName: any) {

    return this.http.delete(`http://localhost:8080/admin/subject2/${subName}`)

  }

  updateexam(exam: any) {
    return this.http.put('http://localhost:8080/admin/exam', exam)
  }

  deleteexam(examName: any) {
    return this.http.delete(`http://localhost:8080/admin/exam3/${examName}`)
  }

  getmarksbyexam(examName: string) {
    return this.http.get(`http://localhost:8080/admin/marksforexam/${examName}`)
  }
}

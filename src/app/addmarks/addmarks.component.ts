import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Marks } from '../models/marks';
import { MasterService } from '../master.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addmarks',
  templateUrl: './addmarks.component.html',
  styleUrls: ['./addmarks.component.css']
})
export class AddmarksComponent {
  marks2: any = {
    user: {},
    exam: {},
    sub: {}
  };
  marks: Marks = new Marks();
  userCtrl = new FormControl();
  examCtrl = new FormControl();
  subjectCtrl = new FormControl();
  filteredUsers: Observable<any[]> = new Observable<any[]>();
  filteredExams: Observable<any[]> = new Observable<any[]>();
  filteredSubjects: Observable<any[]> = new Observable<any[]>();
  users: any[] = [];
  exams: any[] = [];
  subjects: any[] = [];
  isEditOperation?: boolean = false;

  constructor(private master: MasterService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.master.getallusers().subscribe((users: any) => {
      this.users = users;
    });
    this.master.getallExams().subscribe((exams: any) => {
      this.exams = exams;
    });
    this.master.getallsubjects().subscribe((subjects: any) => {
      this.subjects = subjects;
    });
  }

  ngOnInit(): void {
    this.master.getallusers().subscribe((users: any) => {
      this.filteredUsers = this.userCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUsers(value, users))
      );
    });
    this.master.getallExams().subscribe((exams: any) => {
      this.filteredExams = this.examCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterExams(value, exams))
      );
    });
    this.master.getallsubjects().subscribe((subjects: any) => {
      this.filteredSubjects = this.subjectCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterSubjects(value, subjects))
      );
    });

    this.route.queryParams.subscribe((params: any) => {
      if (params.action == 'edit') {
        this.isEditOperation = true;
        this.marks2 = JSON.parse(params.marks);
      }
    });
  }

  private _filterUsers(value: string, users: any[]): any[] {
    const filterValue = value.toLowerCase();
    return users
      .map(user => user.name)
      .filter(name => name && name.toLowerCase().startsWith(filterValue));
  }

  private _filterExams(value: string, exams: any[]): any[] {
    const filterValue = value.toLowerCase();
    return exams
      .map(exam => exam.examName)
      .filter(name => name && name.toLowerCase().startsWith(filterValue));
  }

  private _filterSubjects(value: string, subjects: any[]): any[] {
    const filterValue = value.toLowerCase();
    return subjects
      .map(subject => subject.subName)
      .filter(name => name && name.toLowerCase().startsWith(filterValue));
  }

  onSubmit(form: any) {
    this.marks.marks = form.value.marks;
    const username = this.userCtrl.value;
    const filteredUser = this.users.find(user => user.name.toLowerCase() === username.toLowerCase());
    const examName = this.examCtrl.value;
    const filteredExam = this.exams.find(exam => exam.examName.toLowerCase() === examName.toLowerCase());
    const subjectName = this.subjectCtrl.value;
    const filteredSubject = this.subjects.find(subject => subject.subName.toLowerCase() === subjectName.toLowerCase());

    this.marks.user = { id: filteredUser.id };
    this.marks.exam = { examId: filteredExam.examId };
    this.marks.sub = { subId: filteredSubject.subId };

    if (this.marks.marks == undefined || this.marks.marks > filteredExam.totalMarks) {
      Swal.fire('Error', "marks cannot be more than totalMarks", 'error');
    } else {
      if (this.isEditOperation) {
        this.marks.mid = this.marks2.mid;
        this.master.updatemarks(this.marks).subscribe(
          (response: any) => {
            Swal.fire('marks updated Successfully');
            this.router.navigate(["adminpage/viewmarks"]);
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            Swal.fire('Error', error.error, 'error');
          }
        );
      } else {
        this.master.addmarks(this.marks).subscribe(
          (response: any) => {
            Swal.fire('marks added Successfully');
            form.reset();
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            Swal.fire('Error', error.error, 'error');
          }
        );
      }
    }
  }
}

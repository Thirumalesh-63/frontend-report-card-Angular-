import { Component } from '@angular/core';
import { MasterService } from '../master.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { exam } from '../models/exam';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addexam',
  templateUrl: './addexam.component.html',
  styleUrl: './addexam.component.css'
})
export class AddexamComponent {

  exam: exam = new exam();
  exam2: exam = new exam();
  selectedDate: Date | undefined;
  isEditOperation: boolean = false;
  constructor(private master: MasterService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      if (params.action == 'edit') {
        this.isEditOperation = true;
        this.exam = JSON.parse(params.exam);
        console.log(this.exam)
        console.log(this.isEditOperation)
      }
    });

  }

  onSubmit(form: any) {

    if (this.isEditOperation) {
      this.master.updateexam(this.exam).subscribe(
        (response: any) => {
          Swal.fire('exam edited Successfully');
          this.router.navigate(["adminpage/Exam"]);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          Swal.fire('Error', error.statusText, 'error');
        }
      );

    }
    else {
      this.exam2.examName = form.value.examname;
      this.exam2.examDate = form.value.selectedDate;
      this.exam2.totalMarks= form.value.totalmarks;
      form.reset();
      this.master.createexam(this.exam2).subscribe(
        (response: any) => {
          Swal.fire('exam Added Successfully');
          this.router.navigate(["adminpage/Exam"]);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          Swal.fire('Error', error.statusText, 'error');
        }
      );
     
    }

  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
  }
}

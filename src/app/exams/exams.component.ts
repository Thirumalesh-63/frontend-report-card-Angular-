import { Component, ViewChild } from '@angular/core';
import { MasterService } from '../master.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent {
  originalSubjects: any[] = [];
  exams: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private master: MasterService, private http: HttpClient, private router: Router) {
    this.master.getallExams().subscribe((exams: any) => {
      this.originalSubjects= exams;
      this.exams = exams;
      this.totalItems = exams.length;
    });
  }

  addData() {
    this.router.navigate(["adminpage/addExams"]);
  }

  editExam(exam: any) {
    this.router.navigate(["adminpage/addExams"], { queryParams: { action: 'edit', exam: JSON.stringify(exam) } });
  }

  deleteExam(examName: string) {
    console.log(examName);
    this.master.deleteexam(examName).subscribe(
      (response: any) => {
        Swal.fire('Subject deleted Successfully').then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  onPageChange() {
    this.pageSize = this.paginator.pageSize; // Update page size
    this.updateDisplayedSubjects(); // Update displayed subjects based on current page index and page size
  }

  updateDisplayedSubjects() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.exams = this.originalSubjects.slice(startIndex, endIndex);
  }
}

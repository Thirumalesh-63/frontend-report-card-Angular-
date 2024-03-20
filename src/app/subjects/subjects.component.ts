import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from '../master.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { subjects } from '../models/subjects';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent {
  originalSubjects: any[] = []; // Original subjects array
  subjects: any[] = [];
  subName: any;
  totalItems: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private master: MasterService, private http: HttpClient, private router: Router) {
    this.master.getallsubjects().subscribe((subjects: any) => {
      this.originalSubjects = subjects; // Store original subjects array
      this.totalItems = this.originalSubjects.length;
      this.updateDisplayedSubjects(); // Call function to update displayed subjects
    });
  }

  addData() {
    this.router.navigate(["adminpage/addsubjects"]);
  }

  deleteSubject(subName: any) {
    this.master.deletesubject(subName).subscribe(
      (response: any) => {
        Swal.fire('Subject deleted Successfully').then(() => {
          window.location.reload();
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        Swal.fire('Error', error.statusText, 'error');
      }
    );
  }

  editSubject(sub: any) {
    this.router.navigate(["adminpage/addsubjects"], { queryParams: { action: 'edit', sub: JSON.stringify(sub) } });
  }

  onPageChange() {
    this.pageSize = this.paginator.pageSize; // Update page size
    this.updateDisplayedSubjects(); // Update displayed subjects based on current page index and page size
  }

  updateDisplayedSubjects() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.subjects = this.originalSubjects.slice(startIndex, endIndex);
  }
}

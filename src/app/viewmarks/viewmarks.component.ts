import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MasterService } from '../master.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Marks } from '../models/marks';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; // Import MatPaginator
import Swal from 'sweetalert2';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-viewmarks',
  templateUrl: './viewmarks.component.html',
  styleUrls: ['./viewmarks.component.css'],
  providers: [MatPaginator] // Add MatPaginator to providers array
})
export class ViewmarksComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for MatPaginator
  @ViewChild(MatSort) sort!: MatSort; // Add initializer for sort property

  selectedexam: string = '';
  selecteduser: string = '';
  examCtrl = new FormControl();
  userCtrl = new FormControl();
  filteredExams: Observable<string[]> = new Observable<any[]>();
  filteredUsers: Observable<string[]> = new Observable<any[]>();
  users: any[] = [];
  displayedColumns: string[] = ['id', 'marks', 'totalMarks', 'subject', 'examname', 'username','Actions'];
  dataSource: any; // Add dataSource property

  constructor(private master: MasterService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private _liveAnnouncer: LiveAnnouncer) {
    this.master.getallExams().subscribe((exams: any) => {
      this.filteredExams = this.examCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterExams(value, exams))
      );
    });

    this.master.getallusers().subscribe((users: any) => {
      this.users = users;
      this.filteredUsers = this.userCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUsers(value, users))
      );
    });
  }
 


  private _filterExams(value: string, exams: any[]): any[] {
    const filterValue = value.toLowerCase();
    return exams
      .map(exam => exam.examName) // Extracting only the exam names
      .filter(name => name && name.toLowerCase().startsWith(filterValue)); // Add null check for name
  }

  private _filterUsers(value: string, users: any[]): any[] {
    const filterValue = value.toLowerCase();
    return users.map(user => user.name).filter(user => user.toLowerCase().includes(filterValue));
  }

  onExamSelected(value: string) {
    console.log('Selected Exam:', value);
    this.selectedexam = value;
    this.userCtrl.setValue('');
    this.master.getmarksbyexam(value).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator; // Bind the paginator to the dataSource
    });
  }

  onUserSelected(value: any) {
    console.log(this.users)
    this.selecteduser = value;
    this.examCtrl.setValue('');
    value = this.users.find(user => user.name === value);
    console.log(value.id);
    this.master.getmarksfortheuser(value.id).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator; // Bind the paginator to the dataSource
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      // Convert the filter value to lowercase
      const lowercaseFilter = filter.trim().toLowerCase();

      // Check if any property matches the filter value
      const nameMatch = data.user?.name?.toLowerCase().includes(lowercaseFilter);
      const examNameMatch = data.exam?.examName?.toLowerCase().includes(lowercaseFilter);
      const subNameMatch = data.sub?.subName?.toLowerCase().includes(lowercaseFilter);
      const marksMatch = data.marks === parseInt(lowercaseFilter, 10); // Parse as integer

      // Return true if any match is found
      return nameMatch || examNameMatch || subNameMatch || marksMatch;
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addData() {
    this.router.navigate(["adminpage/addMarks"]);
  }
  editData(element: any) {
    console.log(element)
    this.router.navigate(["adminpage/addMarks"], { queryParams: { action: 'edit', marks: JSON.stringify(element) } });
  }
  deleteData(element: any) {
    console.log(element) 
    this.master.deletemarks(element).subscribe(
      (response: any) => {
        console.log(response)
        Swal.fire('Marks deleted Successfully').then(() => {
          if (this.selectedexam) {
            this.onExamSelected(this.selectedexam);
          } else {
            this.onUserSelected(this.selecteduser);
          }
        });
     },
      (error: any) => {
        console.error(error);
      }
    );
  }

  announceSortChange(sortState: Sort) {

    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'marks':
          return data.marks;
        case 'totalMarks':
          return data.exam.totalMarks;
        case 'subject':
          return data.sub.subName;
        case 'examname':
          return data.exam.examName;
        case 'username':
          return data.user.name;
        default:
          return '';
      }
    };

    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

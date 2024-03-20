import { Component } from '@angular/core';
import { subjects } from '../models/subjects';
import { MasterService } from '../master.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent {

  sub: subjects = new subjects();
  isEditOperation: boolean = false;
  constructor(private master: MasterService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      if (params.action == 'edit') {
        this.isEditOperation = true;
        this.sub = JSON.parse(params.sub);
        console.log(this.sub.subName)
        console.log(this.isEditOperation)
      }
    });
    
  }
  onSubmit(form: any) {
    this.sub.subName = form.value.subname;
    console.log(this.sub)
    form.reset();
    this.master.createsubject(this.sub).subscribe(
      (response: any) => {
        swal.fire('Subject Added Successfully');
        this.router.navigate(["adminpage/Subjects"]);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        swal.fire('Error', error.statusText, 'error');
      }
    );
  }
  onEditSubmit(editSubjectForm: any) {

    console.log(this.sub.subName)
    console.log(this.sub.subId)
    this.master.updatesubject(this.sub).subscribe(
      (response: any) => {
        swal.fire('Subject Updated Successfully');
        this.router.navigate(["adminpage/Subjects"]);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        swal.fire('Error', error.statusText, 'error');
      }
    );

  }
}

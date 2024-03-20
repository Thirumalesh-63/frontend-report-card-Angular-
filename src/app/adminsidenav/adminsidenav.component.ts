import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adminsidenav',
  templateUrl: './adminsidenav.component.html',
  styleUrl: './adminsidenav.component.css'
})
export class AdminsidenavComponent {

  constructor(private router: Router) { }
  onSidenavClick(name: any) {
    if (name == 'Subjects') {
      this.router.navigate(["adminpage/Subjects"]);
    }
    else if (name == "Exam") {
      console.log("exam");
      this.router.navigate(["adminpage/Exam"]);
    }
    else {
      this.router.navigate(["adminpage/viewmarks"]);
    }
  }
}

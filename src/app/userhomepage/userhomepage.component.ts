import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MasterService } from '../master.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js'; // Update the import statement
Chart.register(...registerables);

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css']
})
export class UserhomepageComponent {

  ex: any;
  examCtrl = new FormControl();
  filteredExams: Observable<string[]> = new Observable<any[]>();
  dataSource: any;
  displayedColumns: string[] = ['id', 'marks','totalMarks', 'subject', 'examname'];
  id: any;
  barGraphChart: Chart | undefined;
  pieChart: any;



  constructor(private master: MasterService, private http: HttpClient, private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.master.getallExams().subscribe((exams: any) => {
      this.filteredExams = this.examCtrl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterExams(value, exams))
      );
    });
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  private _filterExams(value: string, exams: any[]): any[] {
    const filterValue = value.toLowerCase();
    return exams
      .map(exam => exam.examName)
      .filter(name => name && name.toLowerCase().startsWith(filterValue));
  }
  onExamSelected(ex: string) {
    this.master.getMarksbyexamanduser(this.id, ex).subscribe((response: any) => {
      this.dataSource = response;
      this.updateBarGraph();
    });
  }


  private updateBarGraph() {


    const labels = this.dataSource.map((data :any) => data.sub.subName);
    const data = this.dataSource.map((data: any) => data.marks);
    const colors = Array.from({ length: labels.length }, () => {
      const r = Math.floor(Math.random() * 150); // Red component
      const g = Math.floor(Math.random() * 150); // Green component
      const b = Math.floor(Math.random() * 150); // Blue component
      return `rgba(${r}, ${g}, ${b}, 0.8)`; // Darker colors with alpha 0.8
    });


    if (this.barGraphChart) {
      this.barGraphChart.destroy();
    }

    this.barGraphChart =new Chart("bargraph", {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '# of Marks',
            data: data,
            backgroundColor: colors, // Use the generated colors
            borderColor: colors.map(color => color.replace('0.2', '1')),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    
    if (this.pieChart) {
      this.pieChart.destroy();
    }

    this.pieChart = new Chart("piechart", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Marks',
          data: data,
          backgroundColor: colors, // Use the generated colors
          borderColor: colors.map(color => color.replace('0.2', '1')), // Set the border colors with alpha 1
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
  }








}

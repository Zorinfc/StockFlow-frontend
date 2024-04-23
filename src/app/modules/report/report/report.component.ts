import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home/home.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from '../../home/dto/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private toastr: ToastrService
  ) {}

  reports: Report[] = [];

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable() {
    this.homeService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
    });
  }
}

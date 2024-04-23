import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home/home.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from '../dto/report';
import { LoginService } from '../../../core/service/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private service: HomeService,
    private toastr: ToastrService,
    private loginService: LoginService
  ) {}

  reports: Report[] = [];

  ngOnInit(): void {
    this.refreshTable();
  }
  refreshTable() {
    this.service.getReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
    });
  }
}

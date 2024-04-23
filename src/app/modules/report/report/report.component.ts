import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home/home.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from '../../home/dto/report';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private dialog: MatDialog
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

  openCloseReport(id: number, isActive: boolean) {
    if (isActive == true) {
      this.homeService.closeReport(id).subscribe({
        next: () => {
          this.refreshTable();
          this.toastr.info('Report Closed!', 'Report System', {
            timeOut: 2000,
          });
        },
      });
    } else {
      this.homeService.openReport(id).subscribe({
        next: () => {
          this.refreshTable();
          this.toastr.info('Report Opened!', 'Report System', {
            timeOut: 2000,
          });
        },
      });
    }
  }

  deleteReport(id: number) {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response?.result == true) {
          this.homeService.deleteReport(id).subscribe({
            next: () => {
              this.refreshTable();
              this.toastr.error('Report Deleted!', 'Report System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
    });
  }
}

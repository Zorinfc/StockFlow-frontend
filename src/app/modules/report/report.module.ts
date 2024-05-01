import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class ReportModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShelfRoutingModule } from './shelf-routing.module';
import { ShelfComponent } from './shelf/shelf.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ShelfComponent],
  imports: [
    CommonModule,
    ShelfRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class ShelfModule {}

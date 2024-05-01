import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item/item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class ItemModule {}

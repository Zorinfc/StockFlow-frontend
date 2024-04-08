import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateShelfDialogComponent } from './component/create-shelf-dialog/create-shelf-dialog.component';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateItemDialogComponent } from './component/create-item-dialog/create-item-dialog.component';
import { ItemInOutDialogComponent } from './component/item-in-out-dialog/item-in-out-dialog.component';

@NgModule({
  declarations: [
    CreateShelfDialogComponent,
    DeleteDialogComponent,
    CreateItemDialogComponent,
    ItemInOutDialogComponent,
  ],
  imports: [CommonModule, FormsModule, MatDialogModule, MatIconModule],
})
export class SharedModule {}

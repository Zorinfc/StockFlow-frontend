import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../../service/shelf/shelf.service';
import { Shelf } from '../dto/shelf';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { CreateShelfDialogComponent } from '../../../shared/component/create-shelf-dialog/create-shelf-dialog.component';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrl: './shelf.component.scss',
})
export class ShelfComponent implements OnInit {
  shelves: Shelf[] = [];
  constructor(
    private shelfService: ShelfService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshShelves();
  }

  refreshShelves() {
    this.shelfService.getShelves().subscribe({
      next: (data) => {
        this.shelves = data;
      },
    });
  }

  deleteShelf(no: number) {
    this.shelfService.deleteItem(no).subscribe({
      next: (data) => {
        this.refreshShelves();
        // console.log('data==>' + data);
        if (data == true) {
          this.toastr.info('Shelf deleted');
        } else {
          this.toastr.error('Shelf has an item');
        }
      },
      error: (err) => {
        this.toastr.error('error');
      },
    });
  }

  edit() {}

  openDialog(no: number): void {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response?.result == true) {
          this.deleteShelf(no);
        }
      },
    });
  }

  addShelf() {
    let dialog = this.dialog.open(CreateShelfDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        // console.log('shelf-componenet ' + response);
        if (response != undefined) {
          this.shelfService.addShelf(response.result).subscribe({
            next: (resp) => {
              this.refreshShelves();
              if (resp == 0 && resp != undefined) {
                this.toastr.error('Can`t add shelf');
              } else {
                this.toastr.info('shelves added');
              }
            },
            error: (err) => {
              this.toastr.error('error occured');
            },
          });
        }
      },
    });
  }
}

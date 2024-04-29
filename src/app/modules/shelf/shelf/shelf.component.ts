import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShelfService } from '../../service/shelf/shelf.service';
import { Shelf } from '../dto/shelf';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { CreateShelfDialogComponent } from '../../../shared/component/create-shelf-dialog/create-shelf-dialog.component';
import { EditShelfComponent } from '../../../shared/component/edit-shelf/edit-shelf.component';
import { LoginService } from '../../../core/service/login/login.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrl: './shelf.component.scss',
})
export class ShelfComponent implements OnInit, OnDestroy {
  shelves: Shelf[] = [];
  role = this.loginService.getRole();

  constructor(
    private shelfService: ShelfService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {}

  dtTrigger: Subject<any> = new Subject();
  ngOnDestroy(): void {
    // Evente unsubscribe olmayı unutmamak gerekiyor.
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.refreshShelves();
  }

  refreshShelves() {
    this.shelfService.getShelves().subscribe({
      next: (data) => {
        this.dtTrigger.next;
        this.shelves = data;
      },
    });
  }
  edit(no: number) {
    let dialog = this.dialog.open(EditShelfComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response != 0) {
          this.shelfService.editShelf(no, response).subscribe({
            next: (resp) => {
              if (resp.result != 0) {
                console.log(resp);
                this.toastr.info('Item Removed!', 'Shelf System', {
                  timeOut: 2000,
                });
                this.refreshShelves();
              }
            },
          });
        }
      },
    });
  }

  deleteShelf(no: number): void {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        if (response?.result == true) {
          this.shelfService.deleteItem(no).subscribe({
            next: (data) => {
              this.refreshShelves();
              // console.log('data==>' + data);
              if (data == true) {
                this.toastr.info('Shelf deleted', 'Shelf System', {
                  timeOut: 2000,
                });
              } else {
                this.toastr.error('Shelf has an item', 'Shelf System', {
                  timeOut: 2000,
                });
              }
            },
            error: (err) => {
              this.toastr.error('error', 'Shelf System', {
                timeOut: 2000,
              });
            },
          });
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
                this.toastr.error('Can`t add shelf', 'Shelf System', {
                  timeOut: 2000,
                });
              } else {
                this.toastr.info('shelves added', 'Shelf System', {
                  timeOut: 2000,
                });
              }
            },
            error: (err) => {
              this.toastr.error('error occured', 'Shelf System', {
                timeOut: 2000,
              });
            },
          });
        }
      },
    });
  }
}

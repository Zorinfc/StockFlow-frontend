import { Component, OnInit } from '@angular/core';
import { Item } from '../dto/item';
import { ItemService } from '../../service/item/item.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemDialogComponent } from '../../../shared/component/create-item-dialog/create-item-dialog.component';
import { ItemCreate } from '../dto/itemCreate';
import { DeleteDialogComponent } from '../../../shared/component/delete-dialog/delete-dialog.component';
import { ItemInOutDialogComponent } from '../../../shared/component/item-in-out-dialog/item-in-out-dialog.component';
import { ItemInOut } from '../dto/itemInOut';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  itemCreate: ItemCreate = { name: '', quantity: 0, min_quantity: 0 };
  itemInOut: ItemInOut = { name: '', count: 0, operator: false };
  constructor(
    private itemService: ItemService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshItems();
  }

  refreshItems() {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
    });
  }

  newItem(): void {
    let dialog = this.dialog.open(CreateItemDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        this.itemCreate.name = response.name;
        this.itemCreate.quantity = response.quantity;
        this.itemCreate.min_quantity = response.min_quantity;
        console.log(this.itemCreate);
        this.itemService.addItem(this.itemCreate).subscribe({
          next: (response) => {
            this.refreshItems();
            this.toastr.info('item added');
          },
          error: (err) => {
            this.toastr.error('error occured');
          },
        });
      },
    });
  }

  delete(name: string) {
    let dialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    dialog.afterClosed().subscribe({
      next: (response) => {
        this.itemService.deleteItem(name).subscribe({
          next: (response) => {
            this.refreshItems();
            this.toastr.info('item deleted');
          },
          error: (err) => {
            this.toastr.error('error occured');
          },
        });
      },
    });
  }

  itemAdd(name: string) {
    let dialog = this.dialog.open(ItemInOutDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.componentInstance.question = 'How many do you want to add :';

    dialog.afterClosed().subscribe({
      next: (response) => {
        this.itemInOut.name = name;
        this.itemInOut.operator = true;
        this.itemInOut.count = response;
        console.log('itemComponent - itemAdd() ==> ' + this.itemInOut.count);
        this.itemService.inOutItem(this.itemInOut).subscribe({
          next: (response) => {
            this.refreshItems();
            this.toastr.info('Item Added');
          },
          error: (err) => {
            this.toastr.error('error occured');
          },
        });
      },
      error: (err) => {
        this.toastr.error('error occured');
      },
    });
  }

  itemRemove(name: string) {
    let dialog = this.dialog.open(ItemInOutDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });
    dialog.componentInstance.question = 'How many do you want to remove :';
    dialog.afterClosed().subscribe({
      next: (response) => {
        this.itemInOut.name = name;
        this.itemInOut.operator = false;
        this.itemInOut.count = response;
        // console.log('itemComponent - itemAdd() ==> ' + this.itemInOut.operator);
        this.itemService.inOutItem(this.itemInOut).subscribe({
          next: () => {
            this.refreshItems();
            this.toastr.info('Item Exported');
          },
          error: (err) => {
            this.toastr.error('error occured');
          },
        });
      },
      error: (err) => {
        this.toastr.error('error occured');
      },
    });
  }
}

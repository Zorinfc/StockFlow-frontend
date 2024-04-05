import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../../service/shelf/shelf.service';
import { Shelf } from '../shelf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrl: './shelf.component.scss',
})
export class ShelfComponent implements OnInit {
  shelves: Shelf[] = [];
  constructor(
    private shelfService: ShelfService,
    private toastr: ToastrService
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

        this.toastr.info('Shelf deleted');
      },
      error: (err) => {
        this.toastr.error('error');
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ShelfService } from '../../../modules/service/shelf/shelf.service';
import { Shelf } from '../../../modules/shelf/dto/shelf';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-denemeler',
  templateUrl: './denemeler.component.html',
  styleUrl: './denemeler.component.scss',
})
export class DenemelerComponent implements OnInit {
  /// SORT DENEME
  shelves: Shelf[] = [
    { no: 1, capacity: 5, quantity: 10, itemName: 'Deneme' },
    { no: 2, capacity: 5, quantity: 3, itemName: 'Asd' },
    { no: 3, capacity: 5, quantity: 41, itemName: 'Kca' },
    { no: 4, capacity: 5, quantity: 16, itemName: 'z123' },
    { no: 5, capacity: 5, quantity: 31, itemName: 'A' },
    { no: 6, capacity: 5, quantity: 19, itemName: 'a' },
    { no: 7, capacity: 5, quantity: 122, itemName: 'mmbbm' },
    { no: 8, capacity: 5, quantity: 142, itemName: '234' },
    { no: 9, capacity: 5, quantity: 42, itemName: '34' },
    { no: 10, capacity: 5, quantity: 42, itemName: 'ad' },
    { no: 11, capacity: 5, quantity: 42, itemName: 'tu' },
    { no: 12, capacity: 5, quantity: 42, itemName: 'cv' },
    { no: 13, capacity: 5, quantity: 42, itemName: 'fth' },
    { no: 14, capacity: 5, quantity: 42, itemName: 'iph' },
    { no: 15, capacity: 5, quantity: 42, itemName: 'yır' },
    { no: 16, capacity: 5, quantity: 42, itemName: 'xtyı' },
    { no: 17, capacity: 5, quantity: 42, itemName: 'ry' },
    { no: 18, capacity: 5, quantity: 42, itemName: 'bnm' },
  ];

  sortedData: Shelf[];
  constructor(public service: ShelfService) {
    this.sortedData = this.shelves.slice(0, this.pageSize);
  }

  columndef: any[] = ['no', 'capacity', 'quantity', 'itemName'];
  sortData(sort: Sort) {
    const data = this.shelves.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'no':
          return compare(a.no, b.no, isAsc);
        case 'capacity':
          return compare(a.capacity, b.capacity, isAsc);
        case 'quantity':
          return compare(a.quantity, b.quantity, isAsc);
        case 'itemName':
          return compare(a.itemName, b.itemName, isAsc);
        default:
          return 0;
      }
    });
  }
  /////////

  ngOnInit(): void {
    this.getShelves();
  }

  getShelves() {
    this.service.getShelves().subscribe({
      next: (data) => {
        console.log('data ==>' + data);
      },
    });
  }

  //// PAGINATOR DENEME
  length = this.shelves.length;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePage(event: PageEvent) {
    let firstCut = event.pageIndex * event.pageSize;
    let secondCut = firstCut + event.pageSize;
    if (firstCut > this.shelves.length) {
      firstCut = this.shelves.length;
    }
    this.sortedData = this.shelves.slice(firstCut, secondCut);
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

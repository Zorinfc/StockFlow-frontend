import { publishFacade } from '@angular/compiler';

export class Item {
  constructor(
    public name: string,
    public min_quantity: number,
    public total: number
  ) {}
}

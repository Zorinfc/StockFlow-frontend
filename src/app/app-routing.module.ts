import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { MenuComponent } from './core/component/menu/menu.component';
import { ErrorComponent } from './core/component/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'shelf',
        loadChildren: () =>
          import('./modules/shelf/shelf.module').then((m) => m.ShelfModule),
      },
      {
        path: 'item',
        loadChildren: () =>
          import('./modules/item/item.module').then((m) => m.ItemModule),
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './offers/offers.component';



const routes: Routes = [
  {
    path: 'one',
    component: OffersComponent,
    data: { type: 'one' }
  },
  {
    path: 'two',
    component: OffersComponent,
    data: { type: 'two' }
  },
  {
    path: '',
    redirectTo: 'one',
    pathMatch: 'full',
    data: {
      type: 'one'
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

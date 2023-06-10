import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './customers/pages/list/list.component';
import { FilterComponent } from './customers/pages/filter/filter.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'filter', component: FilterComponent },
  { path: '', redirectTo: '/filter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

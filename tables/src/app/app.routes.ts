import { Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' },
  { path: 'tables', component: TablesComponent },
  // other routes
];
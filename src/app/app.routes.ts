import { Routes } from '@angular/router';
import { CarList } from './features/cars/pages/car-list/car-list';
import { CarDetails } from './features/cars/pages/car-details/car-details';
import { CarForm } from './features/cars/pages/car-form/car-form';
import { MaintenanceList } from './features/maintenance/pages/maintenance-list/maintenance-list';
import { MaintenanceDetails } from './features/maintenance/pages/maintenance-details/maintenance-details';
import { MaintenanceForm } from './features/maintenance/pages/maintenance-form/maintenance-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full'
  },
  {
    path: 'cars',
    component: CarList
  },
  {
    path: 'cars/new',
    component: CarForm
  },
  {
    path: 'cars/:id/edit',
    component: CarForm
  },
  {
    path: 'cars/:id',
    component: CarDetails
  },
  {
    path: 'maintenance',
    component: MaintenanceList
  },
  {
    path: 'maintenance/new',
    component: MaintenanceForm
  },
  {
    path: 'maintenance/:id/edit',
    component: MaintenanceForm
  },
  {
    path: 'maintenance/:id',
    component: MaintenanceDetails
  },
];
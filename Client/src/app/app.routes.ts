import { Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { NewTaskPageComponent } from './views/new-task-page/new-task-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },

  {
    path: 'new-task',
    component: NewTaskPageComponent,
  },
];

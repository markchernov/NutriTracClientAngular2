import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { UsersComponent }      from './user.component';
import { FoodsComponent }      from './food.component';
import { MealsComponent }      from './meal.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
   {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'foods',
    component: FoodsComponent
  },
    {
    path: 'meals',
    component: MealsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


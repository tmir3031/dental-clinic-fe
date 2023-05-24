import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';
import { LoginGuard } from './login/services/login-guard';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./dental-services/dental-services.module').then(
            (m) => m.DentalServicesModule
          ),
      },
      {
        path: 'prices',
        loadChildren: () =>
          import('./prices/prices.module').then((m) => m.PricesModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((m) => m.RegisterModule),
      },
      {
        path: 'login',
       // canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'menu',
        canActivateChild: [LoginGuard],
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { usuarioSinLoguearGuard } from './core/guards/usuario-sin-loguear.guard';
import { usuarioLogueadoGuard } from './core/guards/usuario-logueado.guard';
import { usuarioAdminGuard } from './core/guards/usuario-admin.guard';

const routes: Routes = [
  {
    path: "",
    canActivate: [usuarioSinLoguearGuard],
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: "user",
    canActivate: [usuarioLogueadoGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: "admin",
    canActivate: [usuarioLogueadoGuard, usuarioAdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './pages/converter/converter.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HistoryComponent } from './pages/history/history.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'converter',
    pathMatch: 'full'
  },
  {
    path: 'converter',
    component: ConverterComponent,
  },

  {
    path: 'pricing',
    component: PricingComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';
import { CurrenciesComponent } from './pages/currencies/currencies.component';
import { CurrencyDetailComponent } from './pages/currency-detail/currency-detail.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'panel',
    pathMatch: 'full'
  },
  {
    path: 'panel',
    component: PanelComponent,
  },
  {
    path: 'currencies',
    component: CurrenciesComponent,
  },
  {
    path: 'currencies/:id',
    component: CurrencyDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

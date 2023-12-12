import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './pages/panel/panel.component';
import { CurrenciesComponent } from './pages/currencies/currencies.component';
import { CurrencyDetailComponent } from './pages/currency-detail/currency-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PanelComponent,
    CurrenciesComponent,
    CurrencyDetailComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

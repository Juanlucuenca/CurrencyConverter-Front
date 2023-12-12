import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HistoryComponent } from './pages/history/history.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PricingComponent,
    ConverterComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class UserModule { }

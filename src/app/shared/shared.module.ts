import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './components/item/item.component';
import { CardComponent } from './components/card/card.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ItemComponent,
    CardComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    ItemComponent,
    CardComponent
  ],
})
export class SharedModule { }

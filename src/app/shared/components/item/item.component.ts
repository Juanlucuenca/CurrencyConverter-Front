import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input({required:true}) title!: string;
  @Input({required:true}) description!: string;

};

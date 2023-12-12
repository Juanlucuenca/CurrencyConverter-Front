import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input({required: true}) title: string = "";
  @Input({required: true}) buttonTitle: string = "";
  @Input({required: true}) description: string = "";

  @Input() object?: any;
  @Output() sendObject = new EventEmitter<any>();

  enviarDatos() {
    console.log(this.object)
    this.sendObject.emit(this.object);
  }
}

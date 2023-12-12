import { Component } from '@angular/core';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mostrarNavbar$ = this.navigationService.mostrarNavbar$;

  constructor(private navigationService: NavigationService) { }
}

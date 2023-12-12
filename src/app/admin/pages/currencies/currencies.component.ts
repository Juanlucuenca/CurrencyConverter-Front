import { Component } from '@angular/core';
import { Currency } from 'src/app/core/data/interfaces/Currency.interface';
import { CurrenciesService } from 'src/app/core/services/currencies.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent {
  currencies: Currency[] = []
  showModal: boolean = false;

  constructor(
    private currencyService: CurrenciesService,
  ) { }

  ngOnInit(): void {
    this.loadCurrency()
  }

  create() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false
  }

  loadCurrency() {
    console.log('loadCurrency')
    this.currencyService.getAllCurrencies().subscribe(data => {
      console.log(data)
      this.currencies = data
    })
  }
}

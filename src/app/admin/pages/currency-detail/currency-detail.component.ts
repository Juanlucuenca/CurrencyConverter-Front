import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from 'src/app/core/data/interfaces/Currency.interface';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { CurrenciesService } from 'src/app/core/services/currencies.service';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent {
  currency!: Currency
  currencyProps!: [string, any][];
  showModal: boolean = false;

  constructor(
    private routes: ActivatedRoute,
    private currencyService: CurrenciesService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currencyId = Number(this.routes.snapshot.paramMap.get('id'));

    this.currencyService.getCurrencyById(currencyId)
        .subscribe(currency => {
          this.currency = currency;
          this.currencyProps = Object.entries(currency);
        })
  }

  delete(currencyId: number) {
    this.currencyService.deletCurrency(currencyId)
      .subscribe({
        next: () => {
          this.alert.showSucces('Moneda eliminada correctamente');
          this.router.navigate(['/admin/currencies']);
        },
        error: (err) => {
          this.alert.showError('Error al eliminar la moneda');
          console.error(err);
        }
      })
  }

  edit() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false
  }
}

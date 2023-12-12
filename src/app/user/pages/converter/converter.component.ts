import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConvertDto } from 'src/app/core/data/Dto/convertDto';
import { Currency } from 'src/app/core/data/interfaces/Currency.interface';
import { Convertion } from 'src/app/core/data/interfaces/convertion.interface';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { CurrenciesService } from 'src/app/core/services/currencies.service';
import { FormService } from 'src/app/core/services/form.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
    requestCount: number = 0;


    convertForm: FormGroup = this.fb.group({
      FromCurrency: [null, [Validators.required]],
      ToCurrency: [null, [Validators.required]],
      Amout: [null, [Validators.required, Validators.min(1)]],
    });

    currencies: Currency[] = [];


    constructor(
      private CurrencyService: CurrenciesService,
      private fb: FormBuilder,
      private alertService: AlertService,
      private formService: FormService,
      private userService: UserService,
      private subscriptionService: SubscriptionService,
    ) {

    }
  ngOnInit(): void {
      this.CurrencyService.getAllCurrencies().subscribe(data => {
        this.currencies = data;
        this.userConvertions();
      });
  }

    isValidField(field: string): boolean {
      return this.formService.isValidField(this.convertForm, field);
    }

    getFieldError(field: string): string {
      return this.formService.getFieldError(this.convertForm, field);
    }

    onlyNumbers(event: KeyboardEvent) {
      // Evitamos que el usuario pueda ingresar letras, en el campo amount
      if (event.key < '0' || event.key > '9') {
        event.preventDefault();
      }
    }

    userConvertions(): void {
      this.userService.getUserProfile().subscribe({
        next: data => {
          this.requestCount = data.convertions;
        },
      })
    }

    convert(): void {
      // Verificamos que el formulario sea valido
      if (!this.convertForm.valid) {
        this.convertForm.markAllAsTouched();
        this.alertService.showError('Complete the form correctly', 'Error');
        return;
      }

      // Verificamos que las monedas sean distintas
      if(this.convertForm.value.FromCurrency === this.convertForm.value.ToCurrency){
        this.alertService.showError('You cannot convert to the same currency', 'Error');
        return;
      }

      // Enviamos la peticion HTTP al servidor para realizar el cambio de las monedas
      this.CurrencyService.convert(this.convertForm.value).subscribe({
        next: data => {
          this.alertService.showSuccess(`Converted amount is:  ${data}  `, 'cambio realizado', true);
        },
        error: err => {
          this.alertService.showError(err.error, 'error', true);
        }
      })

      this.userConvertions();
    };
}


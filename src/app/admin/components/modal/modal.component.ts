import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyForCreation } from 'src/app/core/data/Dto/currencyForCreate';
import { Currency } from 'src/app/core/data/interfaces/Currency.interface';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { CurrenciesService } from 'src/app/core/services/currencies.service';
import { FormService } from 'src/app/core/services/form.service';

type typeModal = "edit" | "create";

@Component({
  selector: 'admin-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() currency!: Currency;
  @Input() typeOfModal!: typeModal;
  @Output() closeModal = new EventEmitter();
  disableId: any;

constructor(
  private formService: FormService,
  private fb: FormBuilder,
  private router: Router,
  private alert: AlertService,
  private currencyService: CurrenciesService
) {}

ngOnInit(): void {
    this.currencyForm = this.fb.group({
      id: [0, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      ic: [0, [Validators.required, Validators.maxLength(10), Validators.min(0.01), Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      symbol: ['', [Validators.required, Validators.maxLength(5)]],
    });

    // Si currency está definido, actualiza los valores del formulario
    if (this.currency) {
        this.currencyForm.patchValue({
            id: this.currency.id,
            name: this.currency.name,
            ic: this.currency.ic,
            symbol: this.currency.symbol
      });
    }

    this.disableId = this.typeOfModal === 'edit' ? this.currencyForm.controls['id'].enable() : this.currencyForm.controls['id'].disable();

    console.log(this.disableId)
}


  currencyForm = this.fb.group({
    id: [0, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    ic: [0, [Validators.required, Validators.maxLength(10), Validators.min(0.01), Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
    symbol: ['', [Validators.required, Validators.maxLength(5)]],
  });

  isValidField(field: string): boolean {
    return this.formService.isValidField(this.currencyForm, field);
  }

  close(): void {
    this.closeModal.emit(true);
  }

  getFieldError(field: string): string {
    return this.formService.getFieldError(this.currencyForm, field);
  }

  currencyActions(): void {
    // Verificamos que el formulario sea valido
    if (!this.currencyForm.valid) {
      this.currencyForm.markAllAsTouched();
      this.alert.showError('Complete the form correctly', 'Error');
      return;
    }

    if(this.typeOfModal === 'edit') {
      const updatedCurrency: Currency = {
        id: this.currencyForm.value.id!,
        name: this.currencyForm.value.name!,
        symbol: this.currencyForm.value.symbol!,
        ic: this.currencyForm.value.ic!
      };

      this.currencyService.updateCurrency(updatedCurrency).subscribe({
        next: (res) => {
          this.alert.showSuccess('Currency updated successfully', 'Success');
          this.close();
          this.router.navigate(['/admin/currencies']);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 400) {
            this.alert.showError('Bad request, please check your input', 'Error');
          } else {
            this.alert.showError('An unexpected error occurred, please try again later', 'Error');
          }
        }
      });
    }

    if(this.typeOfModal === 'create') {
      const newCurrency: CurrencyForCreation = {
        currencyName: this.currencyForm.value.name!,
        symbol: this.currencyForm.value.symbol!,
        currencyIc: this.currencyForm.value.ic! as number
      };

      this.currencyService.createCurrency(newCurrency).subscribe({
        next: (res) => {
          this.alert.showSuccess('Currency created successfully', 'Success');
          this.router.navigate(['/admin/panel']);
        },
        error: (err) => {
          if (err.status === 400) {
            this.alert.showError('Bad request, please check your input', 'Error');
          } else {
            this.alert.showError('An unexpected error occurred, please try again later', 'Error');
          }
        }

      });
      this.close();

    }
  }
}

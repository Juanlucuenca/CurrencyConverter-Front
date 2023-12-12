import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  isValidField(form: FormGroup, field: string): boolean {
    const control: AbstractControl | null = form.get(field);
    return control ? (control.dirty || control.touched) && control.invalid : false;
  }

  getFieldError(form: FormGroup, field: string): string {
      let message: string = '';
      const control: AbstractControl | null = form.get(field);

      if(control && control.errors){
        if(control.errors?.["required"]){
          message = 'El campo es obligatorio';
        }
        if(control.errors?.["email"]){
          message = 'El formato del mail es inválido';
        }
        if(control.errors?.["minlength"]){
          message = `El campo debe tener un minimo de ${control.errors?.["minlength"].requiredLength} caracteres`;
        }
        if(control.errors?.["maxlength"]){
          message = `El campo debe tener un maximo de ${control.errors?.["maxlength"].requiredLength} caracteres`;
        }
        if(control.errors?.["min"]){
          message = `El campo debe tener un valor mayor a ${control.errors['min'].min - 1}`;
        }
      }
      return message;
  }

}

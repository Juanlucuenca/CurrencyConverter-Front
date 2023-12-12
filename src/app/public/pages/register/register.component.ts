import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { FormService } from '../../../core/services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    Mail: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private formServie: FormService,
    private router: Router
  ) {}

  isValidField(field: string): boolean {
    return this.formServie.isValidField(this.registerForm, field);
  }

  getFieldError(field: string): string {
    return this.formServie.getFieldError(this.registerForm, field);
  }

  register(): void {

    if(!this.registerForm.valid){
      this.registerForm.reset({UserName:this.registerForm.value.UserName ,Mail: this.registerForm.value.Mail, Password: ''});
      this.registerForm.patchValue({ Password: '' });
      this.registerForm.markAllAsTouched();
      this.alert.showError('Complete the form correctly', 'Form Error');
      return;
    };

    this.authService.register(this.registerForm.value).subscribe({
      next: (r) => {
        this.alert.showSuccess('Successful registration', 'welcome');
        this.router.navigate(['/login']);
      },

      error: (err) => {
        if (err.error?.message) {
          this.alert.showError(`Error when registering: ${err.error.message}`, 'Error');
        } else if (err.status === 409) {
          this.alert.showError('The user already exists', 'Registration Failed');
        } else if (err.status === 400) {
          this.alert.showError('Verify the information provided', 'Error');
        } else {
          this.alert.showError('Registration failed, try again', 'Error');
        }

        this.registerForm.patchValue({ password: '' });
      }

    });
  }
}

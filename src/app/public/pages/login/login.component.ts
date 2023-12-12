import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert-service.service';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { FormService } from '../../../core/services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
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
    return this.formServie.isValidField(this.loginForm, field);
  }

  getFieldError(field: string): string {
    return this.formServie.getFieldError(this.loginForm, field);
  }

  login(): void {
    if(!this.loginForm.valid){
      this.loginForm.patchValue({ Password: '' });
      this.loginForm.markAllAsTouched();
      this.alert.showError('Complete the form correctly', 'Form Error');
      return;
    };

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        const token: string = res.token;
        this.authService.saveToken(token);
        this.alert.showSuccess('Successful login',undefined, false);
        this.router.navigate(['user/converter'])
      },

      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          this.alert.showError('Incorrect email or password', 'Authentication Failed');
        } else if (err.status === 400) {
          this.alert.showError('Bad request, please check your input', 'Error');
        } else {
          this.alert.showError('An unexpected error occurred, please try again later', 'Error');
        }
      }
    });
  }


}

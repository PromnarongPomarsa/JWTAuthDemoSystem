import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule   } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';




// Import the ApiService
import { AuthService } from '../../core/service/auth.service';
import { AuthRequestDto } from '../../core/model/AuthRequestDto';
import { ResponseDto } from '../../core/model/ResponsDto';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ProgressSpinner,
    ReactiveFormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService, DialogService]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private _apiService = inject(AuthService);
  private _messageService = inject(MessageService);


    form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isLoading: boolean = false;

  constructor() { }

  onLogin() {
    if (this.form.invalid) return;
    
    const req: AuthRequestDto = {
      username: this.form.value.username! ,
      password: this.form.value.password!
    }

    this.isLoading = true;
    this._apiService.login(req).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (response: ResponseDto<any>) => {
        if (response.isSuccess) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, });
        console.error('Login failed:', err);
      }
    });
  }
}


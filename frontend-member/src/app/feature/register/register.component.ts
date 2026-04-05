import { booleanAttribute, Component, inject, OnInit } from '@angular/core';
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
  selector: 'app-register',
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
  providers: [MessageService, DialogService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private _authService = inject(AuthService);
  private _messageService = inject(MessageService);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    comfirm_password: ['', Validators.required]
  });

  isNotMatchPass: boolean = false;
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  validatePassword(): boolean {
    return this.form.get('password')?.value === this.form.get('comfirm_password')?.value;
  }

  onRegister() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.validatePassword()) {
      this.isNotMatchPass = true;
      return;
    } 

    const req: AuthRequestDto = {
      username: this.form.value.username!,
      password: this.form.value.password!
    }
    
    this.isLoading = true;
    this._authService.register(req).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (response: ResponseDto<any>) => {
        if (response.isSuccess) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: response.message, });
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, });
        console.error('Login failed:', err);
      }
    });
  }
}

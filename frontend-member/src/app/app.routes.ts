import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login-component';
import { RegisterComponent } from './feature/register/register-component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { header: 'IT 02-1' } },
    { path: 'register', component: RegisterComponent, data: { header: 'IT 02-2' } },
    { path: '**', redirectTo: 'login' }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login-component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { header: 'IT 02-1' } },
    { path: '**', redirectTo: 'login' }
];

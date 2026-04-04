import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { RegisterComponent } from './feature/register/register.component';
import { HomePageComponent } from './feature/home-page/home-page.component';
import { AccessDenied } from './page/access-denied/access-denied';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: { header: 'IT 02-1' } },
    { path: 'register', component: RegisterComponent, data: { header: 'IT 02-2' } },
    { path: 'home', component: HomePageComponent, data: { header: 'IT 02-3' } },
    { path: 'access-denied', component: AccessDenied},
    { path: '**', redirectTo: 'login' }
];

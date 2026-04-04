import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Button } from "primeng/button";

import { Router } from '@angular/router';

import { AuthService } from "../../core/service/auth.service";
import { ResponseDto } from "../../core/model/ResponsDto";


@Component({
    selector: 'app-access-denied',
    standalone: true,
    imports: [Button],
    templateUrl: './access-denied.html',
})
export class AccessDenied implements OnInit, OnDestroy {
    private Router = inject(Router);
    private _apiService = inject(AuthService);
    constructor() { }

    ngOnInit(): void {
        console.log('AccessDenied ngOnInit');
    }

    getBackToLogin() {
        this.Router.navigateByUrl('/login');
    }

    logout() {
        this._apiService.logout().subscribe({
            next: (response: ResponseDto<any>) => {
                if (response.isSuccess) { 
                    this.Router.navigateByUrl('/login');
                }
            },
            error: (err) => {
                console.error('Logout failed:', err);
            }
        });
    }

    ngOnDestroy(): void {
        console.log('AccessDenied ngOnDestroy');
    }
}
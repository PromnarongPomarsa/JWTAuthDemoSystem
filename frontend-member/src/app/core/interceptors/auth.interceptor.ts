import { Injectable, inject } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environment/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.shouldAddCredentials(req.url)) {
            const authReq = req.clone({ withCredentials: true });

            return next.handle(authReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                })
            );
        }

        // สำหรับ request อื่นๆ ที่ไม่ต้องการ cookies
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                return this.handleError(error);
            })
        );
    }

    private shouldAddCredentials(url: string): boolean {
        // เพิ่ม cookies สำหรับ API endpoints เหล่านี้
        const apiEndpoints = [
            environment.apiUrl
        ];

        return apiEndpoints.some(endpoint => endpoint && url.startsWith(endpoint));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('HTTP Error:', error);

        switch (error.status) {
            case 401:
                console.warn('Unauthorized (401) - Cookie invalid or expired, redirecting to access page');
                this.router.navigate(['/access-denied']);
                break;
            case 403:
                console.warn('Forbidden (403) - User does not have permission');
                this.router.navigate(['/access-denied']);
                break;
            case 0:
                console.error('Network error or CORS issue');
                // อาจเป็น CORS problem กับ cookies
                break;
            case 500:
                console.error('Internal server error');
                break;
            default:
                console.error(`HTTP Error ${error.status}:`, error.message);
        }

        return throwError(() => error);
    }
}
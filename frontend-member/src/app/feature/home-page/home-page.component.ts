import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { AuthService } from '../../core/service/auth.service';
import { ResponseDto } from '../../core/model/ResponsDto';
import { finalize } from 'rxjs';

// PrimeNG Modules
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home-page',
  imports: [ToastModule, ProgressSpinner],
  providers: [MessageService, DialogService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private _messageService = inject(MessageService);


  isLoading: boolean = false;
  username: string = "";
  constructor() { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.isLoading = true;
    this.isLoading = false;
    this._authService.getUser().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (response: ResponseDto<string>) => {
        if (response.isSuccess) {
          const userInfo: string = response.result;
          this.username = userInfo;
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, });
        console.error('Failed to get user info:', err);
      }
    });

  }

  ngOnDestroy(): void {
    console.log('HomePageComponent ngOnDestroy');
  }

}

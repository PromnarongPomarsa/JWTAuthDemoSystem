import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { AuthService } from '../../core/service/auth.service';
import { ResponseDto } from '../../core/model/ResponsDto';
import { finalize } from 'rxjs';

// PrimeNG Modules
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { GetUserDto } from '../../core/model/GetUserDto';


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
  private _cdr = inject(ChangeDetectorRef); 


  isLoading: boolean = false;
  username: string = "";
  constructor() { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.isLoading = true;
    this._authService.getUser().pipe(finalize(() => {this.isLoading = false, this._cdr.detectChanges()})).subscribe({
      next: (response: ResponseDto<GetUserDto>) => {
        if (response.isSuccess) {
          this.username = response.result.username;
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

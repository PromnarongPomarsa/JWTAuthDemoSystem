import { Component, signal } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-member');
  pageHeader: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activatedRoute;

        while (route.firstChild) {
          route = route.firstChild;
        }

        this.pageHeader = route.snapshot.data['header'] || "";
      });
  }

}

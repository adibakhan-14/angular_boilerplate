import { Injectable } from "@angular/core";
import { Event, Router, NavigationEnd } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable()
export class NavService {
  public appDrawer: MatSidenav;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public toggle() {
    this.appDrawer.toggle();
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }
}

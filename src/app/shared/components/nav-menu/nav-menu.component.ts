import { AuthService } from "./../../../auth/auth.service";
import { MediaMatcher } from "@angular/cdk/layout";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from "@angular/core";
import { Observable, Subscription, of } from "rxjs";
import { Router } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { Auth } from "../../../auth/models/auth.model";
import { UIInfo } from "../../models/ui-info.model";
import { CommonService } from "../../services/common.service";
import { AsyncService } from "../../services/async.service";
import { NavService } from "../../services/nav.service";
import { NavItem } from "../../models/nav-item.model";
import { NavigationList } from "../../data/navigation-list.data";

@Component({
  selector: "nav-menu",
  templateUrl: "nav-menu.component.html",
  styleUrls: ["nav-menu.component.scss"]
})
export class NavMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("appDrawer") appDrawer: MatSidenav;
  mobileQuery: MediaQueryList;
  isLoggedIn$: Observable<boolean> = of(false);
  isLoading: boolean;
  isFullScreen = false;
  authInfo: Auth;
  uiInfo: UIInfo;
  navItems: NavItem[] = NavigationList.items;
  // @Input() navItems: NavItem;
  private authSub: Subscription;
  private uiInfoSub: Subscription;
  private asyncSub: Subscription;
  defaultsrc = "/assets/images/avatar_square_blue.png"

  private _mobileQueryListener: () => void;
  routerOutletActive: boolean = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private asyncService: AsyncService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public navService: NavService,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.uiInfoSub = this.commonService.uiInfo.subscribe(uiInfo => {
      this.uiInfo = uiInfo;
      this.changeDetectorRef.detectChanges();
    });

    this.authSub = this.authService.authInfo.subscribe(authInfo => {
      this.authInfo = authInfo;
      this.routerOutletActive = true;
      this.changeDetectorRef.detectChanges();
    });

    this.asyncSub = this.asyncService.isLoading.subscribe(loading => {
      this.isLoading = loading;
      this.changeDetectorRef.detectChanges();
    });

    this.asyncService.finish(); // close aborted loading
  }

  ngAfterViewInit(): void {
    this.navService.appDrawer = this.appDrawer;
  }
  onLogOut(): void {
    this.authService.logout();
    this.appDrawer.close(); // closing sidenav
    this.router.navigate(["/auth"]);
  }

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      this.goFullScreen();
    } else {
      this.exitFullScreen();
    }
  }

  private goFullScreen(): void {
    const docElm = document.documentElement as any;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  }

  private exitFullScreen(): void {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.uiInfoSub.unsubscribe();
    this.authSub.unsubscribe();
    this.asyncSub.unsubscribe();
    this.asyncService.finish();
  }
}

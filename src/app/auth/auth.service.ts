import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Select } from "@ngxs/store";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { User } from "./signin/user.model";
import { Logout } from "./actions/auth.actions";
import { AuthState } from "./state/auth.state";
import { Auth } from "./models/auth.model";
import { IContainer } from "../shared/models/api-container.model";
import {
  StartAsyncLoad,
  FinishAsyncLoad,
} from "../shared/actions/async.actions";

@Injectable()
export class AuthService {
  @Select(AuthState.isLoggedIn) isLoggedIn: Observable<boolean>;
  @Select(AuthState.getAuthInfo) authInfo: Observable<Auth>;

  constructor(
    private router: Router,
    private store: Store,
    private http: HttpClient
  ) { }

  authenticate(user: User): Observable<any> {
    return this.http.post<IContainer<Auth>>("/public/admin-signin", user).pipe(
      map((response) =>
        response.isExecuted && response.data ? response.data : null
      ),
      catchError((error) => of(null))
    );
  }

  logout() {
    this.store.dispatch(new StartAsyncLoad());
    this.store.dispatch(new Logout());
    this.store.dispatch(new FinishAsyncLoad());
    this.router.navigate(["/auth"]);
  }
}

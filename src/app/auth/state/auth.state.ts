import { Auth } from "../models/auth.model";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Login, Logout } from "../actions/auth.actions";
import { NavItem } from "src/app/shared/models/nav-item.model";

export class AuthStateModel {
  auth: Auth;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    auth: {
      isAuthenticated: false,
      userInformation: null,
    },
  },
})
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean {
    return state.auth.isAuthenticated;
  }
  @Selector()
  static getAuthInfo(state: AuthStateModel): Auth {
    return state.auth;
  }
  @Selector()
  static menuList(state: AuthStateModel): Array<NavItem> {
    return state.auth.userInformation.navigations;
  }

  @Action(Login)
  login({ setState }: StateContext<AuthStateModel>, { payload }: Login) {
    setState({ auth: payload });
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>, {}: Logout) {
    setState({
      auth: {
        isAuthenticated: false,
        userInformation: null,
      },
    });
  }
}

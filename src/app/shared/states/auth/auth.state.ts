// auth.state.ts

import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetAuthenticated } from './auth.action';
import { AuthStateModel } from './auth.model';






@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isAuthenticated: false,
    token: null,

    connectedUser : null,
    connectedOperator : null,

  },
})
@Injectable()
export class AuthState {

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }




  @Selector()
  static connectedUser(state: AuthStateModel) {
    return state.connectedUser;
  }

  @Selector()
  static connectedOperator(state: AuthStateModel) {
    return state.connectedOperator;
  }

  @Action(SetAuthenticated)
  setAuthenticated(ctx: StateContext<AuthStateModel>, action: SetAuthenticated) {
    ctx.patchState({
      isAuthenticated: action.isAuthenticated,
      token: action.token,
      connectedUser : action.connectedUser,
      connectedOperator : action.connectedOperator

    });
  }
}

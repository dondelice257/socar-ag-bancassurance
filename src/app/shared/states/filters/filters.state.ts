// auth.state.ts

import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FiltersModel } from './filters.model';
import { SetFilters } from './filters.action';







@State<FiltersModel>({
  name: 'filters',
  defaults: {
dates:null

  },
})
@Injectable()
export class FiltersState {

  @Selector()
  static dates(state: FiltersModel) {
    return state.dates;
  }









  @Action(SetFilters)
  SetFilters(ctx: StateContext<FiltersModel>, action: SetFilters) {
    ctx.patchState({
      dates : action.dates,

    });
  }
}

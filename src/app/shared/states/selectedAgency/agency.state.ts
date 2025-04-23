// auth.state.ts

import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SelectedAgencyModel } from './agency.model';
import { SetSelectedAgency } from './agency.action';







@State<SelectedAgencyModel>({
  name: 'agency',
  defaults: {
    selectedAgency: null,

  },
})
@Injectable()
export class AgencyState {

  @Selector()
  static selectedAgency(state: SelectedAgencyModel) {
    return state.selectedAgency;
  }









  @Action(SetSelectedAgency)
  setSelectedAgency(ctx: StateContext<SelectedAgencyModel>, action: SetSelectedAgency) {
    ctx.patchState({
      selectedAgency : action.selectedAgency,

    });
  }
}

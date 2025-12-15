// branch.state.ts

import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SelectedBranchModel } from './branch.model';
import { SetSelectedBranch } from './branch.action';







@State<SelectedBranchModel>({
  name: 'branch',
  defaults: {
    selectedBranch: '',

  },
})
@Injectable()
export class BranchState {

  @Selector()
  static selectedBranch(state: SelectedBranchModel) {
    return state.selectedBranch;
  }









  @Action(SetSelectedBranch)
  setSelectedBranch(ctx: StateContext<SelectedBranchModel>, action: SetSelectedBranch) {
    ctx.patchState({
      selectedBranch : action.selectedBranch,

    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthState } from './auth/auth.state';
import { NoopNgxsExecutionStrategy } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
],

})
export class StatesModule { }

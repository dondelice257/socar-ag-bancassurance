import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';

//plugins -- optional
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './shared/states/auth/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AgencyState } from './shared/states/selectedAgency/agency.state';
import { FiltersState } from './shared/states/filters/filters.state';
import { BranchState } from './shared/states/selectedBranch/branch.state';
// import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

//state




// how can i add these modules her ?   ShareButtonsModule,  ShareIconsModule,
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    // provideClientHydration(),
    importProvidersFrom(NgxsModule.forRoot([
      AuthState,
      // UserState,
      AgencyState,
      FiltersState,
      BranchState
      
    ], {developmentMode: !environment.production}),
    NgxsStoragePluginModule.forRoot({
      key: [
          'auth',
          'agency',
          'filters',
          'branch',


      ],
  }),
  // NgxsResetPluginModule.forRoot(),
  // NgxsLoggerPluginModule.forRoot()
  )
  ,
    importProvidersFrom(NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })),
    importProvidersFrom(NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    })),

    // provideToastr(),
    provideToastr({
      timeOut: 20000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }), 
    provideAnimations(), provideAnimationsAsync(), provideAnimationsAsync()

  
  ]

};
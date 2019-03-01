/*
 * Copyright (c) 2018 Dematic, Corp.
 * Licensed under the MIT Open Source: https://opensource.org/licenses/MIT
 */

/***** Angular modules *****/
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/***** Basic app components *****/
import {AppComponent} from './app.component';
import {RoutesModule} from './app-routes';

/***** Imports from WUF common-components library *****/
import {WufNavigationModule} from '@anviltech/wuf-ang-navigation';
import {WufConfigurationModule, WufConfigurationService} from '@anviltech/wuf-ang-configuration';
import {WufLayoutModule, WufLayoutService} from '@anviltech/wuf-ang-layout';
import '@anviltech/wuf-web-code-sample'; // code sample web component

/***** 3rd party imports *****/
import {CustomMaterialModule} from './_internal/material.module';

/***** Fake backend *****/
// Enable this for a local app with no BFF
import {fakeBackendProvider} from './_internal/fake-backend/fake-backend.service';

/***** Error pages *****/
import {PageNotFoundComponent} from './other/page-not-found/page-not-found.component';
import {ForbiddenComponent} from './other/forbidden/forbidden.component';

/***** Layouts *****/
import {LayoutsModule} from './_internal/layouts/layouts.module';

/***** Misc placeholder pages *****/
import {SettingsComponent} from './other/settings/settings.component';

/***** Services *****/
import {UserService} from './_internal/services/user.service';
import {NavigationService} from './_internal/services/navigation.service';
import {FooterService} from './_internal/services/footer.service';

/***** Pages *****/
import {ExamplePage1Component} from './pages/example-page-1/example-page-1.component';
import {ExamplePage2Component} from './pages/example-page-2/example-page-2.component';


@NgModule({
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        // Angular Imports
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserAnimationsModule,

        // Layouts Modules
        LayoutsModule.forRoot(),

        // WUF
        WufConfigurationModule.forRoot(),
        WufLayoutModule.forRoot(),
        WufNavigationModule.forRoot(),

        // 3rd Party Imports
        CustomMaterialModule.forRoot(), // Load all Angular Material modules

        // Routes (Keep as last module loaded)
        RoutesModule
    ],
    declarations: [
        // App
        AppComponent,

        // Misc app pages
        PageNotFoundComponent,
        ForbiddenComponent,
        SettingsComponent,

        // Example pages
        ExamplePage1Component,
        ExamplePage2Component
    ],
    providers: [
        WufConfigurationService,
        WufLayoutService,
        UserService,
        NavigationService,
        FooterService,

        // Provider used to create fake backend.  Enable this for a local app with no BFF
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule {
}

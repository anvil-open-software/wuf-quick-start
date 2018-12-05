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
import {KgNavigationModule} from '@kion/kg-ang-navigation';
import {KgConfigurationModule, KgConfigurationService} from '@kion/kg-ang-configuration';
import {KgLayoutModule, KgLayoutService} from '@kion/kg-ang-layout';
import '@kion/kg-web-code-sample'; // code sample web component

/***** 3rd party imports *****/
import {CustomMaterialModule} from './internal/material.module';
import {OrigamiModule} from '@codebakery/origami';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@kion/kg-poly-grid-styles';

/***** Fake backend *****/
// Delete this for a production app
import {fakeBackendProvider} from './internal/fake-backend/fake-backend.service';

/***** Error pages *****/
import {PageNotFoundComponent} from './other/page-not-found/page-not-found.component';
import {ForbiddenComponent} from './other/forbidden/forbidden.component';

/***** Layouts *****/
import {LayoutsModule} from './internal/layouts/layouts.module';

/***** Misc placeholder pages *****/
import {SettingsComponent} from './other/settings/settings.component';

/***** Services *****/
import {UserService} from './internal/services/user.service';
import {NavigationService} from './internal/services/navigation.service';
import {FooterService} from './internal/services/footer.service';

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
        KgConfigurationModule.forRoot(),
        KgLayoutModule.forRoot(),
        KgNavigationModule.forRoot(),

        // 3rd Party Imports
        CustomMaterialModule.forRoot(), // Load all Angular Material modules
        OrigamiModule,

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
        KgConfigurationService,
        KgLayoutService,
        UserService,
        NavigationService,
        FooterService,

        // Provider used to create fake backend.  Delete this for a production app.
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule {
}

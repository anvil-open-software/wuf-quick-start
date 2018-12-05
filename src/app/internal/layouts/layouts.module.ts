/*
 * Copyright (c) 2018 Dematic, Corp.
 * Licensed under the MIT Open Source: https://opensource.org/licenses/MIT
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomMaterialModule} from '../../internal/material.module';
import {MatTooltipModule} from '@angular/material';

/***** Import WUF *****/
import {KgConfigurationService} from '@kion/kg-ang-configuration';
import {KgLayoutModule} from '@kion/kg-ang-layout';
import {KgNavigationModule} from '@kion/kg-ang-navigation';

/***** Local layout components *****/
import {LayoutMainComponent} from './main/main.component';
import {LayoutBasicComponent} from './basic/basic.component';

// Exports
export {LayoutMainComponent} from './main/main.component';
export {LayoutBasicComponent} from './basic/basic.component';

@NgModule({
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        CommonModule,
        RouterModule,
        CustomMaterialModule,
        MatTooltipModule,

        // WUF
        KgLayoutModule,
        KgNavigationModule
    ],
    declarations: [
        LayoutMainComponent,
        LayoutBasicComponent
    ]
})
export class LayoutsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LayoutsModule,
            providers: [
                // Add any services used by this module to the providers collection
                KgConfigurationService
            ]
        };
    }
}

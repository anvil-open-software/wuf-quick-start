/*
 * Copyright (c) 2018 Dematic, Corp.
 * Licensed under the MIT Open Source: https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { WufNavigationService } from '@anviltech/wuf-ang-navigation';
import { WufConfigurationService } from '@anviltech/wuf-ang-configuration';


@Component({
    selector: 'app-layout-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class LayoutMainComponent implements OnInit, OnDestroy {

    // Set the URL from which to fetch the routes/navigation data object.
    navDataUrl: string = '/api/navigation';
    appName: string;
    navData: any;
    logoRoute: string = '/'; // Route path to take users when clicking on header logo
    theme: any;
    configSubscription: any;

    constructor(
        private navService: WufNavigationService,
        public configService: WufConfigurationService,
    ) {
        this.theme = 'default';
    }

    ngOnInit() {
        // Fetch nav data
        this.navService.getNavData(this.navDataUrl).subscribe(
            results => {
                this.navData = results.data.links;
            },
            err => {
                console.error('Error retrieving nav data:', err);
            }
        );

        // Subscribe to configuration updates
        this.configSubscription = this.configService.onConfigChange().subscribe(
            newConfig => {
                this.onConfigChange(newConfig);
            },
            err => {
                console.warn('error on subscription:', err);
            }
        );
    }

    ngOnDestroy() {
        if (this.configSubscription && !this.configSubscription.closed) {
            this.configSubscription.unsubscribe();
        }
    }

    onConfigChange(newConfig: any) {
        // Do something on config change

        // Check for app name change
        if (newConfig.name !== this.appName) {
            // Update page title
            this.appName = newConfig.name;
        }
    }
}

/*
 * Copyright (c) 2018 Dematic, Corp.
 * Licensed under the MIT Open Source: https://opensource.org/licenses/MIT
 */

import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {KgConfigurationService} from '@kion/kg-ang-configuration';
import { polymerHost } from '@codebakery/origami/templates';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../../components/start-polymer3.js';
import '../../components/lazy-element.js';


interface ItemElement extends HTMLElement {
    dataItem: any;
}

@Component({
    selector: 'app-example-page-1',
    templateUrl: './example-page-1.component.html',
    styleUrls: ['./example-page-1.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
		polymerHost(ExamplePage1Component)
	]
})
export class ExamplePage1Component implements OnInit {
    sampleCode: string = `<div class="test">{{test}}</div>`;

    public users: any;
    public clickedItem: any;

    constructor(public configService: KgConfigurationService) {
    }

    ngOnInit() {
    }

    rowButtonClicked(e: MouseEvent) {
        const target: ItemElement = <ItemElement> e.target;
        const item: any = target.dataItem;

        this.clickedItem = item;
    }

    onLastResponseChanged(event) {
        this.users = event.detail.value.result;
    }

    setDarkTheme(applyDark: boolean) {
        // Convert to config properties and send them to the KgConfigurationService
        this.configService.config = {
            themeDark: applyDark
        };
    }

    onDarkThemeChange(val) {
        this.setDarkTheme(val);
    }
}

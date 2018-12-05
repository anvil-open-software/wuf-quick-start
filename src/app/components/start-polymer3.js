/*
 * Copyright (c) 2018 Dematic, Corp.
 * Licensed under the MIT Open Source: https://opensource.org/licenses/MIT
 */

// Import statements in Polymer 3.0 can now use package names.
// polymer-element.js now exports PolymerElement instead of Element,
// so no need to change the symbol. 
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings';

class StartPolymer3 extends PolymerElement {
    static get properties() {
        return {
            message: {
                type: String,
                value: ''
            },
            pie: {
                type: Boolean,
                value: false,
                observer: 'togglePie'
            },
            loadComplete: {
                type: Boolean,
                value: false
            },
            tableauServer: {
                type: String,
                value: "10.206.162.17"
            },
            workbook: {
                type: String,
                value: "PickPerformance"
            },
            sheet: {
                type: String,
                value: "Dashboard1"
            },
            token: String,
            editMode: String,
            workSheets: {
                type: Object,
                notify: true
            },
            activeSheet: String
        };
    }

    constructor() {
        // If you override the constructor, always call the
        // superconstructor first.
        super();
        // Resolve warning about scroll performance
        // See https://developers.google.com/web/updates/2016/06/passive-event-listeners
        setPassiveTouchGestures(true);
        this.message = 'Hello World! I\'m a Polymer element :)';
    }

    ready() {
        // If you override ready, always call super.ready() first.
        super.ready();
        // Output the custom element's HTML tag to the browser console.
        // Open your browser's developer tools to view the output.
        console.log(this.tagName);
        this.$.omgpie.focus();
    }

    togglePie() {
        if (this.pie && !this.loadComplete) {
            // See https://developers.google.com/web/updates/2017/11/dynamic-import
            import('./lazy-element.js').then((LazyElement) => {
                console.log("LazyElement loaded");
            }).catch((reason) => {
                console.log("LazyElement failed to load", reason);
            });
            this.loadComplete = true;
        }
    }

    static get template() {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html`
            <style>
                paper-checkbox {
                    --paper-checkbox-checked-ink-color: #FFFFFF;
                    --paper-checkbox-unchecked-ink-color: #FFFFFF;
                    --paper-checkbox-label-color: #556688;
                }
            </style>
            
            <p>[[message]]</p>
            <paper-checkbox id="omgpie" toggles noink checked={{pie}}>I like pie.</paper-checkbox>
            <template is="dom-if" if=[[pie]]>
                <lazy-element>
                    <p>lazy loading...</p>
                </lazy-element>
            </template>
            <br> ${this.extra}
            <br>
        `;
    }

    static get extra() {
        return html`
            <br>
            <paper-button raised>moo</paper-button>
            <br>
        `;
    }
}

// Register the element with the browser.
customElements.define('start-polymer3', StartPolymer3);

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {KgConfigurationService} from '@kion/kg-ang-configuration';
import {KgContentFooterService} from '@kion/kg-ang-layout';
import {ExamplePage1Component} from './example-page-1.component';


describe('ExamplePage1Component', () => {
    let component: ExamplePage1Component;
    let fixture: ComponentFixture<ExamplePage1Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            declarations: [
                ExamplePage1Component
            ],
            providers: [
                KgContentFooterService,
                KgConfigurationService
            ],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamplePage1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('Sanity check', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

});

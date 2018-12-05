import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

// import {KgModule} from '@kion/kg-ang-library';
import {KgLayoutModule} from '@kion/kg-ang-layout';
import {KgNavigationModule} from '@kion/kg-ang-navigation';

import {LayoutBasicComponent} from './basic.component';


describe('LayoutBasicComponent', () => {
    let component: LayoutBasicComponent;
    let fixture: ComponentFixture<LayoutBasicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutBasicComponent],
            imports: [
                RouterTestingModule,
                KgLayoutModule,
                KgNavigationModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutBasicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

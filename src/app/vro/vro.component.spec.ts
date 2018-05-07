import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VroComponent} from './vro.component';

describe('VroComponent', () => {
    let component: VroComponent;
    let fixture: ComponentFixture<VroComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VroComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

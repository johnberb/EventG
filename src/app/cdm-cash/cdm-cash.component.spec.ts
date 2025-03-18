import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmCashComponent } from './cdm-cash.component';

describe('CdmCashComponent', () => {
  let component: CdmCashComponent;
  let fixture: ComponentFixture<CdmCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdmCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdmCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsDashboardComponent } from './earnings-dashboard.component';

describe('EarningsDashboardComponent', () => {
  let component: EarningsDashboardComponent;
  let fixture: ComponentFixture<EarningsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

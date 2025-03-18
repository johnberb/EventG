import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCurrentCashComponent } from './terminal-current-cash.component';

describe('TerminalCurrentCashComponent', () => {
  let component: TerminalCurrentCashComponent;
  let fixture: ComponentFixture<TerminalCurrentCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalCurrentCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalCurrentCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalCurrentStatusComponent } from './terminal-current-status.component';

describe('TerminalCurrentStatusComponent', () => {
  let component: TerminalCurrentStatusComponent;
  let fixture: ComponentFixture<TerminalCurrentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalCurrentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalCurrentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

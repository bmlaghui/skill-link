import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogProbesComponent } from './log-probes.component';

describe('LogProbesComponent', () => {
  let component: LogProbesComponent;
  let fixture: ComponentFixture<LogProbesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogProbesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogProbesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

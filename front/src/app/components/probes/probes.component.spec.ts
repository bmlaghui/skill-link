import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbesComponent } from './probes.component';

describe('ProbesComponent', () => {
  let component: ProbesComponent;
  let fixture: ComponentFixture<ProbesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProbesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProbesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

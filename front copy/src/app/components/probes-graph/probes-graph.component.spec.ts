import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbesGraphComponent } from './probes-graph.component';

describe('ProbesGraphComponent', () => {
  let component: ProbesGraphComponent;
  let fixture: ComponentFixture<ProbesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProbesGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProbesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

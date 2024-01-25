import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonughtchartComponent } from './donughtchart.component';

describe('DonughtchartComponent', () => {
  let component: DonughtchartComponent;
  let fixture: ComponentFixture<DonughtchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonughtchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonughtchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProbesService } from './probes.service';

describe('ProbesService', () => {
  let service: ProbesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DemandVoyageService } from '../services/demand-voyage.service';

describe('DemandVoyageService', () => {
  let service: DemandVoyageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandVoyageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

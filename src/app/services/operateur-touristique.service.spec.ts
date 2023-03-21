import { TestBed } from '@angular/core/testing';

import { OperateurTouristiqueService } from './operateur-touristique.service';

describe('OperateurTouristiqueService', () => {
  let service: OperateurTouristiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperateurTouristiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

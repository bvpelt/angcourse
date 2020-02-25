import { TestBed } from '@angular/core/testing';

import { LocationexchangeService } from './locationexchange.service';

describe('LocationexchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationexchangeService = TestBed.get(LocationexchangeService);
    expect(service).toBeTruthy();
  });
});

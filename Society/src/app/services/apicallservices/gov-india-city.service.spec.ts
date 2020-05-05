import { TestBed } from '@angular/core/testing';

import { GovIndiaCityService } from './gov-india-city.service';

describe('GovIndiaCityService', () => {
  let service: GovIndiaCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovIndiaCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

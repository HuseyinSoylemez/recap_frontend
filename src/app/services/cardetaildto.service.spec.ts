import { TestBed } from '@angular/core/testing';

import { CardetaildtoService } from './cardetaildto.service';

describe('CardetaildtoService', () => {
  let service: CardetaildtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardetaildtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

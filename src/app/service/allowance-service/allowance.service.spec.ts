/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllowanceService } from './allowance.service';

describe('Service: Allowance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllowanceService]
    });
  });

  it('should ...', inject([AllowanceService], (service: AllowanceService) => {
    expect(service).toBeTruthy();
  }));
});

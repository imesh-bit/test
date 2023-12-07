/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalarySlipService } from './salarySlip.service';

describe('Service: SalarySlip', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalarySlipService]
    });
  });

  it('should ...', inject([SalarySlipService], (service: SalarySlipService) => {
    expect(service).toBeTruthy();
  }));
});

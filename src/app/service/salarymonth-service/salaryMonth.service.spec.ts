/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalaryMonthService } from './salaryMonth.service';

describe('Service: SalaryMonth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryMonthService]
    });
  });

  it('should ...', inject([SalaryMonthService], (service: SalaryMonthService) => {
    expect(service).toBeTruthy();
  }));
});

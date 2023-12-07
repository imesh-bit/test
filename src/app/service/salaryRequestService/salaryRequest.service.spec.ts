/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalaryRequestService } from './salaryRequest.service';

describe('Service: SalaryRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryRequestService]
    });
  });

  it('should ...', inject([SalaryRequestService], (service: SalaryRequestService) => {
    expect(service).toBeTruthy();
  }));
});

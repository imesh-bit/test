/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoanManagerService } from './loanManager.service';

describe('Service: LoanManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanManagerService]
    });
  });

  it('should ...', inject([LoanManagerService], (service: LoanManagerService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NonCashService } from './nonCash.service';

describe('Service: NonCash', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonCashService]
    });
  });

  it('should ...', inject([NonCashService], (service: NonCashService) => {
    expect(service).toBeTruthy();
  }));
});

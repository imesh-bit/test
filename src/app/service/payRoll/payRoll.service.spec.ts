/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayRollService } from './payRoll.service';

describe('Service: PayRoll', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayRollService]
    });
  });

  it('should ...', inject([PayRollService], (service: PayRollService) => {
    expect(service).toBeTruthy();
  }));
});

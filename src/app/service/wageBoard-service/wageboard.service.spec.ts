/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WageboardService } from './wageboard.service';

describe('Service: Wageboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WageboardService]
    });
  });

  it('should ...', inject([WageboardService], (service: WageboardService) => {
    expect(service).toBeTruthy();
  }));
});

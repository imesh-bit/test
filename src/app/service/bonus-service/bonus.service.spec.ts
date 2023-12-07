/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BonusService } from './bonus.service';

describe('Service: Bonus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BonusService]
    });
  });

  it('should ...', inject([BonusService], (service: BonusService) => {
    expect(service).toBeTruthy();
  }));
});

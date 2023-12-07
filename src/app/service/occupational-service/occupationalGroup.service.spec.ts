/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OccupationalGroupService } from './occupationalGroup.service';

describe('Service: OccupationalGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccupationalGroupService]
    });
  });

  it('should ...', inject([OccupationalGroupService], (service: OccupationalGroupService) => {
    expect(service).toBeTruthy();
  }));
});

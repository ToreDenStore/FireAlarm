/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlarmService } from './alarm.service';

describe('Service: Alarm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmService]
    });
  });

  it('should ...', inject([AlarmService], (service: AlarmService) => {
    expect(service).toBeTruthy();
  }));
});

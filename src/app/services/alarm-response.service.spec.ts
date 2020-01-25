/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlarmResponseService } from './alarm-response.service';

describe('Service: AlarmRespone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmResponseService]
    });
  });

  it('should ...', inject([AlarmResponseService], (service: AlarmResponseService) => {
    expect(service).toBeTruthy();
  }));
});

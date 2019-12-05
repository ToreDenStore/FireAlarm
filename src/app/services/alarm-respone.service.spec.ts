/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlarmResponeService } from './alarm-respone.service';

describe('Service: AlarmRespone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmResponeService]
    });
  });

  it('should ...', inject([AlarmResponeService], (service: AlarmResponeService) => {
    expect(service).toBeTruthy();
  }));
});

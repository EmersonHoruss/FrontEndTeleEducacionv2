import { TestBed } from '@angular/core/testing';

import { UwuService } from './uwu.service';

describe('UwuService', () => {
  let service: UwuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UwuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

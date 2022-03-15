import { TestBed } from '@angular/core/testing';

import { MasterMainService } from './master-main.service';

describe('MasterMainService', () => {
  let service: MasterMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

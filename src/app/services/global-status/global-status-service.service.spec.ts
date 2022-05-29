import { TestBed } from '@angular/core/testing';

import { GlobalStatusServiceService } from './global-status-service.service';

describe('GlobalStatusServiceService', () => {
  let service: GlobalStatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

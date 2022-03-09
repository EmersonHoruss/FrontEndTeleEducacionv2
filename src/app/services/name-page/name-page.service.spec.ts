import { TestBed } from '@angular/core/testing';

import { NamePageService } from './name-page.service';

describe('NamePageService', () => {
  let service: NamePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

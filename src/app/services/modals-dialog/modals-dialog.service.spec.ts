import { TestBed } from '@angular/core/testing';

import { ModalsDialogService } from './modals-dialog.service';

describe('ModalsDialogService', () => {
  let service: ModalsDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalsDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

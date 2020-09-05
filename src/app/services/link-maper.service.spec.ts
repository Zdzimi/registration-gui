import { TestBed } from '@angular/core/testing';

import { LinkMaperService } from './link-maper.service';

describe('LinkMaperService', () => {
  let service: LinkMaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkMaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

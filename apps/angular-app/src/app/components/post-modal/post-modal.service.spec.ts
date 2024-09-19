import { TestBed } from '@angular/core/testing';

import { PostModalService } from './post-modal.service';

describe('PostModalService', () => {
  let service: PostModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

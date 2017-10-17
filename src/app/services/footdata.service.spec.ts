import { TestBed, inject } from '@angular/core/testing';

import { FootdataService } from './footdata.service';

describe('FootdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootdataService]
    });
  });

  it('should be created', inject([FootdataService], (service: FootdataService) => {
    expect(service).toBeTruthy();
  }));
});

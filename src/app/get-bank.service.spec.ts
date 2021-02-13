import { TestBed } from '@angular/core/testing';

import { GetBankService } from './get-bank.service';

describe('GetBankService', () => {
  let service: GetBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

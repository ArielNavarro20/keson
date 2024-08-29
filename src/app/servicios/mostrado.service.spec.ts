import { TestBed } from '@angular/core/testing';

import { MostradoService } from './mostrado.service';

describe('MostradoService', () => {
  let service: MostradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

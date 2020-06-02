import { TestBed } from '@angular/core/testing';

import { SelectingPreloadingStrategyService } from './selecting-preloading-strategy.service';

describe('SelectingPreloadingStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectingPreloadingStrategyService = TestBed.get(SelectingPreloadingStrategyService);
    expect(service).toBeTruthy();
  });
});

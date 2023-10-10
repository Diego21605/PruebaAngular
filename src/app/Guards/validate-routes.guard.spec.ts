import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateRoutesGuard } from './validate-routes.guard';

describe('validateRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

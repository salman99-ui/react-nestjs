import { HeaderAuthGuard } from './header-auth.guard';

describe('HeaderAuthGuard', () => {
  it('should be defined', () => {
    expect(new HeaderAuthGuard()).toBeDefined();
  });
});

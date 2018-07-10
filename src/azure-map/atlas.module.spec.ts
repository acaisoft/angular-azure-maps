import { AmModule } from './am.module';

describe('AmModule', () => {
  let atlasModule: AmModule;

  beforeEach(() => {
    atlasModule = new AmModule();
  });

  it('should create an instance', () => {
    expect(atlasModule).toBeTruthy();
  });
});

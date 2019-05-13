import { SystemRoutingModule } from './system-routing.module';

describe('SystemRoutingModule', () => {
  let systemRoutingModule: SystemRoutingModule;

  beforeEach(() => {
    systemRoutingModule = new SystemRoutingModule();
  });

  it('should create an instance', () => {
    expect(systemRoutingModule).toBeTruthy();
  });
});

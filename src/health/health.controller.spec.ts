import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';
import { HealthStatus } from './interfaces/health-status.interface.js';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  it('debería retornar status ok', () => {
    const result = healthController.check();
    expect(result.status).toBe(HealthStatus.OK);
    expect(result.service).toBe('trm');
    expect(typeof result.uptime).toBe('number');
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });
});

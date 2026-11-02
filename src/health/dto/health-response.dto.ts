import { ApiProperty } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthStatus,
} from '../interfaces/health-status.interface.js';

/**
 * DTO de respuesta del endpoint GET /health.
 */
export class HealthResponseDto implements HealthCheck {
  @ApiProperty({ enum: HealthStatus, example: HealthStatus.OK })
  status: HealthStatus;

  @ApiProperty({ example: 'trm' })
  service: string;

  @ApiProperty({ example: '0.0.1' })
  version: string;

  @ApiProperty({ description: 'Segundos en ejecución', example: 42.5 })
  uptime: number;

  @ApiProperty({ example: '2026-11-02T12:00:00.000Z' })
  timestamp: string;
}

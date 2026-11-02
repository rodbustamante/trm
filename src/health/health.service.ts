import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dto/health-response.dto.js';
import { HealthStatus } from './interfaces/health-status.interface.js';

@Injectable()
export class HealthService {
  /**
   * Obtiene el estado actual del servicio.
   * @returns {HealthResponseDto} Estado de salud de la aplicación
   */
  check = (): HealthResponseDto => ({
    status: HealthStatus.OK,
    service: 'trm',
    version: process.env.npm_package_version ?? '0.0.1',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}

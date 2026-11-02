/**
 * Estados posibles del servicio.
 */
export enum HealthStatus {
  OK = 'ok',
  ERROR = 'error',
}

/**
 * Contrato de la respuesta del endpoint de salud.
 */
export interface HealthCheck {
  /** Estado general del servicio */
  status: HealthStatus;
  /** Nombre del servicio */
  service: string;
  /** Versión de la aplicación */
  version: string;
  /** Segundos que lleva el proceso en ejecución */
  uptime: number;
  /** Fecha/hora de la verificación en formato ISO 8601 */
  timestamp: string;
}

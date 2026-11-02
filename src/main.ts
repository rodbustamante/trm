import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupSwagger } from './swagger.js';

/**
 * Punto de entrada de la aplicación.
 */
const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
};
await bootstrap();

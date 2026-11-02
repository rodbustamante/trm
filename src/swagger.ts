import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Configura la documentación Swagger (OpenAPI) de la aplicación.
 * @param {INestApplication} app Instancia de la aplicación Nest
 */
export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('TRM API')
    .setDescription(
      'API para la gestión de socios y reservas de canchas de un club de tenis',
    )
    .setVersion(process.env.npm_package_version ?? '0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

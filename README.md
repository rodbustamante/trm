# TRM

Sistema de administración de socios y reservas de canchas para clubes de tenis.

## Stack

- [NestJS](https://nestjs.com/) 12 (ESM)
- Node.js 24 LTS
- MySQL (pendiente de integrar)
- Swagger / OpenAPI para documentación
- Vitest para tests, Oxlint + Prettier para calidad de código

## Requisitos

- Node.js >= 24 (ver `.nvmrc`)
- npm

## Instalación

```bash
nvm use
npm install
```

## Ejecución

```bash
# desarrollo (watch)
npm run start:dev

# producción
npm run build
npm run start:prod
```

La aplicación escucha en el puerto `3000` por defecto (configurable con la variable `PORT`).

## Documentación de la API

Con la aplicación levantada:

- Swagger UI: http://localhost:3000/docs
- Especificación OpenAPI (JSON): http://localhost:3000/docs-json

## Endpoints

| Método | Ruta      | Descripción                          |
| ------ | --------- | ------------------------------------ |
| GET    | `/health` | Estado de salud de la aplicación     |

Ejemplo de respuesta de `/health`:

```json
{
  "status": "ok",
  "service": "trm",
  "version": "0.0.1",
  "uptime": 42.5,
  "timestamp": "2026-11-02T12:00:00.000Z"
}
```

## Tests y calidad

```bash
npm test           # unitarios
npm run test:e2e   # end-to-end
npm run test:cov   # cobertura
npm run lint       # oxlint
npm run format     # prettier
```

## Estructura

```
src/
├── main.ts              # bootstrap
├── app.module.ts        # módulo raíz
├── swagger.ts           # configuración de Swagger
└── health/
    ├── dto/             # DTOs de respuesta (contratos documentados en Swagger)
    ├── interfaces/      # contratos/tipos del dominio
    ├── health.controller.ts
    ├── health.service.ts
    └── health.module.ts
```

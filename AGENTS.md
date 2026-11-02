# AGENTS.md — TRM

Guía para agentes de IA que trabajan en este repositorio. TRM es un sistema de gestión de socios y reservas de canchas de un club de tenis. **Todo el código lo escribe IA**; el usuario modela la base de datos y toma las decisiones técnicas.

## Roles

- **Usuario**: dueño del modelo de datos y de las decisiones técnicas (ver `docs/adr/`).
- **Agente**: implementa, prueba y documenta. Ante una decisión técnica no cubierta por este archivo o por un ADR, **pregunta** antes de elegir.

## Stack

| Capa     | Tecnología                                                              |
| -------- | ----------------------------------------------------------------------- |
| Backend  | NestJS 12 (ESM), Node.js 24, Swagger/OpenAPI                            |
| BD       | MySQL 8.4 + Prisma                                                      |
| Frontend | React + Vite + TS, React Router, TanStack Query, Tailwind + shadcn/ui   |
| Auth     | JWT propio (access + refresh) con roles `admin` / `socio`               |
| Calidad  | Vitest, Oxlint, Prettier                                                |
| Repo     | Monorepo npm workspaces (`apps/api`, `apps/web`, `packages/api-client`) |

> Estado actual: la base NestJS aún vive en la raíz. La migración a monorepo y el resto del stack se incorporan por fases (ver `docs/adr/0001-stack.md`). Mantén este archivo actualizado al cerrar cada fase.

## Comandos

```bash
npm install            # dependencias
npm run start:dev      # API en modo watch (puerto 3000, Swagger en /docs)
npm run lint           # oxlint
npm run format         # prettier
npm test               # tests unitarios (vitest)
npm run test:e2e       # tests e2e
npm run build          # compilación
```

## Reglas de base de datos (obligatorias)

- El modelo de datos (`schema.prisma`) **lo define el usuario**. El agente **no** modifica `schema.prisma` ni crea/edita migraciones sin aprobación explícita.
- El agente puede **proponer** cambios al modelo (índices, constraints, tipos) explicando el motivo, y esperar confirmación.
- Nunca ejecutar migraciones destructivas (`migrate reset`, `db push --force-reset`, `DROP`) sobre una BD que no sea la local de desarrollo/test.
- Fechas y horas se guardan en UTC; la zona del club (`America/Santiago`) se aplica en presentación.

## Convenciones de código

- Idioma: código (identificadores) en inglés; comentarios, JSDoc, mensajes de error, descripciones Swagger y nombres de tests en **español**.
- `async/await` por sobre `.then()`; arrow functions por sobre callbacks/funciones anónimas.
- JSDoc en funciones y métodos públicos (`@param`, `@returns`).
- ESM: los imports relativos llevan extensión `.js` (`import { X } from './x.js'`).
- TypeScript `strict`; evitar `any`.
- Formato con Prettier (`singleQuote`, `trailingComma: all`).

### Estructura de un módulo Nest

Usar `src/health/` como referencia:

```
src/<modulo>/
├─ <modulo>.module.ts
├─ <modulo>.controller.ts        # solo HTTP: decoradores Swagger + delega al service
├─ <modulo>.controller.spec.ts
├─ <modulo>.service.ts           # lógica de negocio
├─ <modulo>.service.spec.ts
├─ dto/                          # clases con @ApiProperty / class-validator
└─ interfaces/                   # contratos y enums
```

- Todo endpoint documentado en Swagger (`@ApiTags`, `@ApiOperation`, respuestas tipadas con DTO).
- Los controllers no acceden a la BD directamente.

## Git

- Ramas desde `main` actualizada: `tipo/nombre-corto` (`feat/`, `fix/`, `chore/`, `docs/`, `ci/`, `refactor/`, `test/`).
- Commits con [Conventional Commits](https://www.conventionalcommits.org/) en español.
- **Nunca** hacer push sin autorización del usuario.
- **Nunca** resolver conflictos de merge/rebase: detenerse y avisar al usuario.

## Definition of Done

Un cambio está terminado cuando:

1. `npm run lint`, `npm test`, `npm run test:e2e` y `npm run build` pasan.
2. La lógica nueva tiene tests (unitarios y, si hay endpoint, e2e).
3. Los endpoints nuevos están documentados en Swagger.
4. El README / este archivo se actualizan si cambian comandos, estructura o convenciones.
5. Las decisiones técnicas nuevas quedan registradas en un ADR (`docs/adr/NNNN-titulo.md`).

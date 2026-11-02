# 0001 — Stack y estructura base

- **Estado**: aceptado
- **Fecha**: 2026-11-02

## Contexto

TRM gestiona socios y reservas de canchas de un club de tenis. La aplicación se construye íntegramente con agentes de IA; el usuario modela la base de datos y toma las decisiones técnicas. Se necesita un stack predecible, tipado de punta a punta y con convenciones explícitas.

## Decisiones

| Tema          | Decisión                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Repositorio   | Monorepo con npm workspaces: `apps/api`, `apps/web`, `packages/api-client`                           |
| Backend       | NestJS 12 (ESM) sobre Node.js 24, documentado con Swagger/OpenAPI                                    |
| Base de datos | MySQL 8.4 (Docker en local) con Prisma como ORM y gestor de migraciones                              |
| Frontend      | Vite + React + TS, React Router, TanStack Query, Tailwind + shadcn/ui, react-hook-form + zod         |
| Contrato API  | Cliente TS generado con orval desde el OpenAPI del backend                                           |
| Auth          | JWT propio: access token corto + refresh token rotado, contraseñas con argon2, roles `admin`/`socio` |
| Calidad       | Vitest, Oxlint, Prettier, GitHub Actions                                                             |

## Fases de levantamiento

0. Gobernanza IA (`AGENTS.md`, ADRs)
1. Migración a monorepo
2. Endurecimiento de la API (config, validación, errores, CORS, logging)
3. MySQL + Prisma (modelo definido por el usuario)
4. Auth JWT + roles
5. Frontend base + cliente generado
6. CI

## Consecuencias

- Un solo repositorio da a los agentes contexto completo back/front y permite cambios full-stack en un PR.
- `schema.prisma` es la fuente de verdad del modelo y es propiedad del usuario.
- El cliente generado evita duplicar tipos entre back y front; cualquier cambio de contrato pasa por Swagger.

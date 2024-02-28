# Stylas | Shop

Ecommerce creado por Roberto López con Next.js

## Requisitos

- Node.js v14.0.0 o superior
- npm v6.0.0 o superior

## Configuración del entorno

1. Clona el repositorio: `git clone https://github.com/usuario/proyecto.git`
2. Navega al directorio del proyecto: `cd proyecto`
3. Crear una copia del archivo `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno.
4. Instala las dependencias: `npm install`
5. Levantar la base de datos: Abrir Docker Desktop y en la terminal de VsCode o tu terminal ejecutar `docker compose up -d`
6. Ejecutar las migraciones de Prisma `npx prisma migrate dev`
7. Ejecutar seed `npm run seed`

## Ejecución del proyecto en dev

1. Ejecuta el proyecto: `npm run dev`
2. Limpiar localStorage del navegador.
3. Abre un navegador y ve a `http://localhost:3000`

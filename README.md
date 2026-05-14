# Portafolio

Portfolio web application built with Angular 21.

## Requirements

- Node.js 22.12.0
- npm

## Development server

Run:

```bash
npm install
npm start

Navigate to:

http://localhost:4200/

The application will automatically reload if you change any of the source files.

Build

Run:
npm run build

The build artifacts will be stored in the dist/ directory.

Production
This project is deployed on Netlify.
Production builds should use Node.js 22.12.0.


---

## 5. Si tenés `netlify.toml`, agregá esto
En la raíz, junto a `package.json`. Si no existe, podés crearlo.
```toml
[build.environment]
  NODE_VERSION = "22.12.0"
# Lunes

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/connect-360sierracos-projects/v0-evolve)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/pgcQIuub8ox)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/connect-360sierracos-projects/v0-evolve](https://vercel.com/connect-360sierracos-projects/v0-evolve)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/pgcQIuub8ox](https://v0.app/chat/pgcQIuub8ox)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Desarrollo local

1. **Instala las dependencias**

   \`\`\`bash
   pnpm install
   \`\`\`

2. **Arranca el entorno de desarrollo**

   \`\`\`bash
   pnpm dev
   \`\`\`

3. **Verifica la build de producción**

   \`\`\`bash
   pnpm run build
   \`\`\`

## Preparar el despliegue en Vercel

1. **Repositorio Git**  
   Asegúrate de que el proyecto esté en un repositorio (GitHub/GitLab/Bitbucket). Vercel desplegará cada push a la rama seleccionada.

2. **Variables de entorno (Dashboard de Vercel → Project Settings → Environment Variables)**  
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL` → URL de tu Realtime Database. El repositorio apunta por defecto a `https://rentalbuddy-intro-default-rtdb.firebaseio.com/`, pero define esta variable en Vercel para poder cambiarla sin redeploys.
   - `NEXT_PUBLIC_RECAPTCHA_KEY` → clave de reCAPTCHA v3 usada por App Check en el navegador.

3. **Ajustes recomendados**  
   - Framework preset: `Next.js`
   - Install command: `pnpm install`
   - Build command: `pnpm run build`
   - Output directory: `.next`

4. **Primer despliegue**  
   - En Vercel, selecciona *Add New Project* → *Import Git Repository*.  
   - Revisa que `pnpm-lock.yaml` esté presente para que Vercel use pnpm automáticamente.  
   - Añade las variables de entorno necesarias y haz clic en **Deploy**.

5. **Despliegues posteriores**  
   Cada push a la rama configurada (por ejemplo `main`) lanzará un nuevo build. Usa `pnpm run build` de forma local antes de hacer push para detectar problemas a tiempo.

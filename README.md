# GlobalangModeratorsApp

Aplicación móvil para moderadores de Globalang, desarrollada con Vue 3 + Capacitor para Android.

## 🛠 Tecnologías

- **Frontend Framework:** Vue 3 con TypeScript
- **Build Tool:** Vite
- **Mobile Framework:** Capacitor 7
- **UI Frameworks:**
  - PrimeVue 4
  - Flowbite-Vue
  - TailwindCSS
- **State Management:** Vue Query (TanStack Query)
- **Formularios y Validación:**
  - Vee-Validate 4
  - Joi
- **Características Móviles:**

La aplicación soporta múltiples idiomas y utiliza archivos de traducción ubicados en `/public/locales/`.
## ⚙️ Variables de Entorno

Crea un archivo `.env` basado en `.env.template` con las siguientes variables:

```env
VITE_API_URL=https://your.domain.example
```

## 📱 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local (web)
npm run dev

# Build para producción
npm run build

# Vista previa de la build
npm run preview

# Build y sincronización con Android
npm run capbuild
```

### 📋 Detalles del comando capbuild

El comando `npm run capbuild` ejecuta una serie de pasos:
1. Realiza el build del proyecto (`npm run build`)
2. Copia los archivos al proyecto Android (`cap copy android`)
3. Sincroniza las dependencias de Capacitor (`npx cap sync android`)
4. Abre Android Studio (`npx cap open android`)

## 🤖 Desarrollo para Android

### Prerrequisitos
- Node.js y npm
- Android Studio
- JDK (Java Development Kit)
- Android SDK
- Gradle

### Configuración Inicial
1. Instala todas las dependencias con `npm install`
2. Configura las variables de entorno en el archivo `.env`
3. Ejecuta `npm run capbuild` para iniciar el proyecto en Android Studio
4. Compila y ejecuta la aplicación desde Android Studio

## 📦 Scripts Disponibles
- `npm run capbuild`: Build completo para Android con Capacitor

## 📝 Notas Adicionales

- La aplicación utiliza Vue Router para la navegación
- Implementa un sistema de notificaciones push a través de Capacitor
- Soporta múltiples temas y personalización a través de PrimeVue
- Incluye componentes personalizados en `/src/components`
- Gestión de estado centralizada en `/src/Stores`


## 🐳 Docker (opcional)

Si prefieres construir y ejecutar la aplicación dentro de un contenedor Docker, aquí tienes una guía práctica.

Nota: muchos Dockerfiles de frontend sirven la aplicación en un servidor estático (p. ej. `nginx`) o arrancan un servidor en `3000`. En desarrollo, podemos mapear el puerto interno `3000` al puerto de Vite `5173` en el host para mantener consistencia con `docker-compose.dev.yml` del launcher.

1) Build de la imagen (con build-args):

```powershell
# Desde la carpeta `main-app`
docker build -t main-globalang:latest \
  --build-arg VITE_API_URL=https://api.local \
  .
```

2) Ejecutar el contenedor (mapeando el puerto 3000 del contenedor al 5173 local):

```powershell
docker run -d \
  --name main-globalang \
  --env-file .env \
  -p 5173:3000 \
  main-globalang:latest
```

3) Ejemplo mínimo de `docker-compose.dev.yml` para desarrollo (volúmenes + mapeo de puertos):

```yaml
services:
  globalang-main:
    build:
      context: ./main-app
      args:
        VITE_API_URL: http://api.local
    volumes:
      - ./main-app:/app
      - /app/node_modules
    ports:
      - "5173:3000" # mapea el puerto interno 3000 del contenedor al 5173 local
    env_file:
      - ./main-app/.env
    command: npm run dev

networks:
  default:
    external: false
```

Buenas prácticas y notas:

- Si necesitas que variables de build estén disponibles en tiempo de ejecución, en tu `Dockerfile` declara:

```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
```

- No comites archivos `.env` con secretos. Usa `--env-file` o `env_file:` en `docker-compose`.
- En modo desarrollo con volúmenes y `npm run dev` tendrás HMR si Vite está configurado correctamente.
- Para producción, típicamente se construye la app (`npm run build`) y se sirve con un servidor estático (nginx) en el contenedor; en ese caso mapea el puerto 80 del contenedor al puerto deseado en el host.

Comandos útiles:

```powershell
# Levantar y reconstruir en segundo plano
docker-compose -f docker-compose.dev.yml up --build -d

# Ver logs de la app principal
docker-compose -f docker-compose.dev.yml logs -f globalang-main

# Parar y eliminar recursos
docker-compose -f docker-compose.dev.yml down
```

Con esto tendrás instrucciones suficientes para construir y probar la imagen Docker de `main-app` tanto en desarrollo (con HMR) como para crear una imagen lista para producción.


## APIs complementarias

Las APIs y los servicios backend que consume esta aplicación están disponibles en el launcher de backend:

https://github.com/Team-GlobLang/GlobalangServerLauncher.git

Revisa ese repositorio para ver cómo levantar las APIs y sus requisitos de configuración.

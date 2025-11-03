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
- **HTTP Client:** Axios
- **Características Móviles:**
  - Push Notifications (@capacitor/push-notifications)
  - Soporte completo para Android

## 🌍 Internacionalización

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

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila el proyecto para producción
- `npm run preview`: Vista previa de la build de producción
- `npm run capbuild`: Build completo para Android con Capacitor

## 📝 Notas Adicionales

- La aplicación utiliza Vue Router para la navegación
- Implementa un sistema de notificaciones push a través de Capacitor
- Soporta múltiples temas y personalización a través de PrimeVue
- Incluye componentes personalizados en `/src/components`
- Gestión de estado centralizada en `/src/Stores`

# Manual de Despliegue en Vercel - Portafolio-CH

## Índice
1. [Requisitos Previos](#requisitos-previos)
2. [Verificación del Repositorio GitHub](#verificación-del-repositorio-github)
3. [Crear Cuenta en Vercel](#crear-cuenta-en-vercel)
4. [Conexión del Repositorio](#conexión-del-repositorio)
5. [Configuración del Proyecto](#configuración-del-proyecto)
6. [Despliegue Inicial](#despliegue-inicial)
7. [Configuraciones Adicionales](#configuraciones-adicionales)
8. [Verificación del Despliegue](#verificación-del-despliegue)
9. [Actualizaciones Futuras](#actualizaciones-futuras)
10. [Solución de Problemas Comunes](#solución-de-problemas-comunes)

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta en [GitHub](https://github.com) con el repositorio del proyectoo
- ✅ El repositorio debe ser público o privado con acceso adecuadoo
- ✅ El código debe estar actualizado en la rama principal (main o master)
- ✅ El proyecto debe tener el archivo `package.json` configurado correctamente

---

## Verificación del Repositorio GitHub

### 1. Verificar que el repositorio contiene todos los archivos necesarios

```bash
# Clona el repositorio localmente para verificar
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO
```

### 2. Verificar archivos esenciales

Asegúrate de que tu repositorio contiene estos archivos:

- `package.json` - Dependencias del proyecto
- `next.config.ts` - Configuración de Next.js
- `tsconfig.json` - Configuración de TypeScript
- `src/` - Directorio con el código fuente
- `.gitignore` - Archivos ignorados por Git

### 3. Verificar que el repositorio está actualizado

```bash
# En tu repositorio local
git status
git add .
git commit -m "Preparación para despliegue en Vercel"
git push origin main
```

---

## Crear Cuenta en Vercel

### Opción A: Usar cuenta de GitHub (Recomendado)

1. Ve a [https://vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"** o **"Continue with GitHub"**
3. Autoriza a Vercel para acceder a tu cuenta de GitHub
4. Completa el registro con tu información básica

### Opción B: Usar email

1. Ve a [https://vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Ingresa tu email y crea una contraseña
4. Verifica tu email

---

## Conexión del Repositorio

### 1. Iniciar sesión en Vercel

1. Inicia sesión en [https://vercel.com](https://vercel.com)
2. Haz clic en **"Add New..."** en el dashboard
3. Selecciona **"Project"**

### 2. Importar el repositorio desde GitHub

1. En la sección **"Import Git Repository"**
2. Busca tu repositorio `Portafolio-CH` en la lista
3. Si no aparece, haz clic en **"Adjust GitHub App Permissions"** y autoriza el repositorio
4. Haz clic en **"Import"** junto a tu repositorio

---

## Configuración del Proyecto

### 1. Configuración General

Vercel detectará automáticamente que es un proyecto Next.js. Verifica:

- **Project Name**: `portafolio-ch` (o el nombre que prefieras)
- **Framework Preset**: Next.js (detectado automáticamente)
- **Root Directory**: `./` (por defecto)

### 2. Configuración de Build

Verifica que los comandos sean correctos:

- **Build Command**: `npm run build` (o `next build`)
- **Output Directory**: `.next` (detectado automáticamente)
- **Install Command**: `npm install` (detectado automáticamente)

### 3. Configuración de Variables de Entorno

Para este proyecto, necesitas configurar:

1. Haz clic en **"Environment Variables"**
2. Agrega la siguiente variable:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

**Nota**: Puedes usar el dominio temporal que Vercel te asignará inicialmente.

### 4. Configuración de Branch

- **Production Branch**: `main` (o `master` según tu repositorio)
- **Deploy Preview**: Habilitado (para previsualizar cambios en branches)

---

## Despliegue Inicial

### 1. Iniciar el despliegue

1. Haz clic en **"Deploy"** en la parte inferior
2. Vercel comenzará a construir tu proyecto
3. Espera a que finalice el proceso (puede tomar 2-5 minutos)

### 2. Monitorear el proceso de construcción

Verás el progreso en tiempo real:

- 🔵 Cloning repository
- 🔵 Installing dependencies
- 🔵 Building Next.js application
- 🔵 Uploading deployment

### 3. Finalización del despliegue

Cuando el despliegue sea exitoso, verás:

- ✅ **"Congratulations!"**
- 🌐 URL de tu sitio: `https://portafolio-ch.vercel.app`
- 📊 Dashboard con estadísticas del despliegue

---

## Configuraciones Adicionales

### 1. Configurar Dominio Personalizado (Opcional)

Si tienes un dominio propio (ej: cristianhincapie.com):

1. En el dashboard del proyecto, ve a **Settings** → **Domains**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: `cristianhincapie.com`)
4. Sigue las instrucciones para configurar los DNS:

**Para dominio raíz (@):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Para subdominio www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

5. Espera la propagación DNS (puede tomar 24-48 horas)

### 2. Configurar Redirecciones (Opcional)

Si quieres redirigir `www` a sin `www` o viceversa:

1. Ve a **Settings** → **Redirects**
2. Agrega la regla:

```
Source: https://www.cristianhincapie.com
Destination: https://cristianhincapie.com
Status: 308 (Permanent Redirect)
```

### 3. Configurar Protección con Contraseña (Opcional)

Si quieres proteger el sitio mientras está en desarrollo:

1. Ve a **Settings** → **Protection**
2. Habilita **"Password Protection"**
3. Configura usuario y contraseña

### 4. Configurar Analytics

El proyecto ya incluye `@vercel/analytics`, pero puedes habilitar analytics adicionales:

1. Ve a **Analytics** en el dashboard
2. Habilita **Web Analytics** y **Speed Insights**

---

## Verificación del Despliegue

### 1. Verificar que el sitio funciona

1. Abre la URL: `https://portafolio-ch.vercel.app`
2. Verifica que todas las secciones carguen correctamente:
   - Hero
   - About
   - Experience
   - Projects
   - Approach
   - Testimonials
   - Contact

### 2. Verificar responsividad

- Prueba en móvil (usa las DevTools de Chrome: F12 → Toggle device toolbar)
- Prueba en tablet
- Prueba en diferentes tamaños de pantalla

### 3. Verificar internacionalización

- Prueba cambiar entre español e inglés
- Verifica que el contenido se traduzca correctamente

### 4. Verificar SEO

1. Abre las DevTools (F12)
2. Ve a la pestaña **Console**
3. Ejecuta: `document.title`
4. Verifica los meta tags en **Elements** → `<head>`

### 5. Verificar Performance

1. Ve a [Google PageSpeed Insights](https://pagespeed.web.dev/)
2. Ingresa tu URL
3. Verifica que el score sea aceptable (mínimo 70+)

---

## Actualizaciones Futuras

### 1. Desplegar cambios desde GitHub

Cada vez que hagas cambios en el repositorio:

```bash
# En tu repositorio local
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Vercel detectará automáticamente el cambio y desplegará la nueva versión.

### 2. Verificar despliegues automáticos

1. Ve al dashboard de Vercel
2. En la sección **Deployments**, verás el historial
3. Cada push a la rama principal generará un nuevo despliegue

### 3. Desplegar desde branches secundarios (Previews)

Si quieres probar cambios antes de producción:

```bash
# Crear un branch nuevo
git checkout -b feature/nueva-funcionalidad
# Hacer cambios
git add .
git commit -m "Nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

Vercel creará un **Preview Deployment** con una URL temporal.

---

## Solución de Problemas Comunes

### Problema 1: Error de construcción (Build Error)

**Síntoma:** El despliegue falla durante la fase de build.

**Soluciones:**
1. Verifica que `package.json` tenga los scripts correctos:
   ```json
   "scripts": {
     "dev": "next dev --turbopack",
     "build": "next build",
     "start": "next start"
   }
   ```

2. Verifica que no haya errores de TypeScript:
   ```bash
   npm run typecheck
   ```

3. Revisa los logs de error en Vercel:
   - Ve a **Deployments** → Selecciona el despliegue fallido
   - Revisa la sección **Build Logs**

### Problema 2: Variables de entorno no funcionan

**Síntoma:** El sitio se despliega pero las variables de entorno no están disponibles.

**Solución:**
1. Asegúrate de que las variables tengan el prefijo `NEXT_PUBLIC_` si se usan en el cliente
2. Verifica que las variables estén configuradas en:
   - Settings → Environment Variables
   - Y también en Settings → Environment Variables → Production, Preview, Development

### Problema 3: Imágenes no cargan

**Síntoma:** Las imágenes del sitio no se muestran.

**Solución:**
1. Verifica que `next.config.ts` tenga la configuración de imágenes:
   ```typescript
   images: { 
     formats: ["image/avif", "image/webp"] 
   }
   ```

2. Asegúrate de que las imágenes estén en el directorio `public/`

### Problema 4: Error 404 en páginas

**Síntoma:** Algunas páginas devuelven error 404.

**Solución:**
1. Verifica la estructura de rutas en `src/app/`
2. Asegúrate de que los archivos tengan nombres correctos (`page.tsx`, `layout.tsx`)
3. Verifica que el archivo `src/i18n/routing.ts` esté configurado correctamente

### Problema 5: Sitio lento

**Síntoma:** El sitio tarda mucho en cargar.

**Soluciones:**
1. Optimiza imágenes (usa WebP/AVIF)
2. Habilita caching en Vercel (automático por defecto)
3. Revisa el bundle size en los logs de construcción
4. Considera usar lazy loading para componentes pesados

### Problema 6: Dominio personalizado no funciona

**Síntoma:** El dominio personalizado muestra error o no redirige.

**Soluciones:**
1. Verifica la configuración DNS en tu proveedor de dominios
2. Espera 24-48 horas para la propagación DNS
3. Usa herramientas como [DNSChecker](https://dnschecker.org/) para verificar
4. En Vercel, ve a Settings → Domains y verifica el estado del dominio

---

## Comandos Útiles

### Verificar el proyecto localmente antes de desplegar

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Verificar tipos de TypeScript
npm run typecheck

# Construir para producción (local)
npm run build

# Iniciar producción localmente
npm start
```

### Comandos de Git

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Mensaje descriptivo"

# Push a GitHub
git push origin main

# Ver historial
git log --oneline
```

---

## Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Guía de despliegue de Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Soporte de Vercel](https://vercel.com/support)

---

## Checklist Final de Despliegue

Antes de considerar el despliegue completo, verifica:

- [ ] El repositorio está actualizado en GitHub
- [ ] El proyecto compila sin errores localmente
- [ ] Las variables de entorno están configuradas en Vercel
- [ ] El sitio es accesible en la URL de Vercel
- [ ] Todas las páginas funcionan correctamente
- [ ] El sitio es responsive en móvil y tablet
- [ ] La internacionalización funciona (español/inglés)
- [ ] Los meta tags y SEO están configurados
- [ ] El dominio personalizado está configurado (si aplica)
- [ ] Las redirecciones funcionan correctamente (si aplica)
- [ ] Analytics está habilitado (opcional)

---

## Soporte

Si encuentras problemas durante el despliegue:

1. Revisa los logs de construcción en Vercel
2. Consulta la documentación oficial de Vercel
3. Busca en Stack Overflow con etiquetas `vercel`, `nextjs`
4. Revisa issues similares en GitHub

---

**¡Felicidades!** Tu portafolio está ahora desplegado en Vercel y accesible mundialmente. 🚀

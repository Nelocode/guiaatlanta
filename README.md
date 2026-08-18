# 🏆 La Guía Atlanta - Plataforma de Listing & Directorio Comercial

**La Guía Atlanta** es una plataforma digital profesional e integral de directorio comercial, gastronómico, cultural y de servicios para la metrópoli de **Atlanta, Georgia**.

Diseñada meticulosamente sin utilizar plantillas prehechas o genéricas, incorporando la identidad de marca basada en los colores oficiales del logotipo (**Púrpura Regal `#522B8B`** y **Verde Esmeralda `#008753`**), una experiencia de usuario (UX) curada con máscaras asimétricas redondeadas para el Hero y soporte nativo para **despliegue mediante Docker en Easypanel + GitHub**.

---

## 🌟 Características Principales

### 1. Portal Público de Descubrimiento (`Portal Público`)
- **Hero Asimétrico Editorial**: Presentación visual inspirada en los referentes con máscaras de imagen curvadas.
- **Buscador & Filtros Avanzados**: Búsqueda por palabra clave, categorización y selección por **Zonas de Atlanta** (Midtown, Buckhead, Downtown, Decatur, Alpharetta, Sandy Springs, Duluth, Norcross, etc.).
- **Directorio de Categorías**: Gastronomía, Servicios Legales/Profesionales, Salud & Bienestar, Automotriz, Inmobiliaria, Eventos, Tiendas y Educación.
- **Ficha de Comercio Completa (Modal Detail)**: Galería de fotos HD, estado "Abierto/Cerrado", dirección con mapa, botón directo de WhatsApp, llamada telefónica, reseñas y formulario de reclamo de negocio.
- **Planes de Membresía**: Comparativa transparente entre los niveles Estándar (Gratuito), Destacado Pro ($49/mes) y VIP Premier ($99/mes).

### 2. Panel Administrativo Super-Admin (`/admin` / `Super Admin`)
- **Métricas de la Plataforma**: Total de comercios, empresarios registrados, visitas mensuales, suscripciones activas e ingresos proyectados.
- **Cola de Moderación**: Aprobación o rechazo con 1-clic de nuevos negocios o solicitudes de reclamo de propiedad.
- **Gestión Total del Directorio**: Cambio instantáneo de estados (`Activo`, `Pendiente`, `Rechazado`) y planes (`Gratuito`, `Pro`, `VIP`).

### 3. Panel de Comercio / Merchant Owner Dashboard (`/merchant` / `Panel Comercio`)
- **Analíticas de Rendimiento**: Métricas en tiempo real de vistas de la ficha, clics a WhatsApp, llamadas recibidas y clientes potenciales.
- **Gestión del Perfil Comercial**: Edición de nombre, eslogan, horarios, foto de portada, dirección y teléfonos.
- **Gestión de Reseñas**: Visualización de opiniones de clientes y respuestas oficiales.
- **Actualización de Plan**: Opción de upgrade a Pro o VIP Premier.

### 4. Panel de Usuario / Mi Cuenta (`/user` / `Mi Cuenta`)
- **Favoritos Guardados**: Colección personal de comercios guardados.
- **Historial de Reseñas**: Reseñas y calificaciones publicadas por el usuario.
- **Seguimiento de Reclamos**: Estado de solicitudes de verificación de negocios.

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14+ (App Router, Standalone Build)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4 + Vanilla CSS + Google Fonts (Plus Jakarta Sans)
- **Iconografía**: Lucide React
- **Contenedorización**: Multi-stage `Dockerfile` (Node 20 Alpine) & `docker-compose.yml`

---

## 🚀 Despliegue en Easypanel (GitHub + Docker)

### Opción 1: Conectar Repositorio GitHub a Easypanel (Recomendado)
1. Sube este proyecto a tu cuenta de **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - La Guia Atlanta"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/la-guia-atlanta.git
   git push -u origin main
   ```
2. Entra a tu panel de **Easypanel**:
   - Haz clic en **Create Project** -> Nombre: `la-guia-atlanta`.
   - Agrega un nuevo servicio de tipo **App**.
   - En la pestaña **Source**, selecciona **GitHub App** o **Git Repository**.
   - Coloca la URL de tu repositorio de GitHub.
   - En **Build Type**, selecciona **Dockerfile**.
   - Easypanel detectará automáticamente el `Dockerfile` optimizado y compilará la aplicación.
   - Especifica el puerto de destino: `3000`.

### Opción 2: Ejecución Local con Docker Compose
```bash
docker-compose up --build -d
```
Accede a la aplicación en `http://localhost:3000`.

---

## 💻 Desarrollo Local sin Docker

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
http://localhost:3000
```

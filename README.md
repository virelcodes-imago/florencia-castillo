# ✨ Florencia Castillo · Mujeres Alfa
> **Ecosistema Digital Oficial de Marca Personal, Recursos Gratuitos y Formación**  
> Desarrollado y Gestionado por [VIREL.](https://virelcodes.com)

---

## 🌐 Producción & Accesos Rápidos

| Canal / Recurso | Enlace | Estado |
|---|---|---|
| **Sitio Web Oficial** | [https://florenciacastillo.com](https://florenciacastillo.com) | 🟢 Activo (SSL / HTTPS) |
| **Sitio Web con WWW** | [https://www.florenciacastillo.com](https://www.florenciacastillo.com) | 🟢 Activo (SSL / HTTPS) |
| **Cloudflare Pages Directo** | [https://florencia-castillo.pages.dev](https://florencia-castillo.pages.dev) | 🟢 Activo |
| **Repositorio GitHub** | [virelcodes-imago/florencia-castillo](https://github.com/virelcodes-imago/florencia-castillo) | Rama `main` |
| **Instagram Oficial** | [@florenciacastillo.oficial](https://www.instagram.com/florenciacastillo.oficial/) | Cuenta activa |

---

## 📂 Estructura de Carpetas del Proyecto

El proyecto está organizado de manera limpia y modular para separar código fuente, recursos gráficos, documentos de trabajo y descargas finales:

```text
Flor Castillo/
├── descargas/                # PDFs compilados listos para descarga directa desde la web
│   ├── guia-radiografia-alfa-mujeres-alfa.pdf
│   ├── habitos-financieros-mujeres-alfa.pdf
│   ├── materializar-dinero-7-dias-mujeres-alfa.pdf
│   ├── escribi-esto-30-dias-mujeres-alfa.pdf
│   └── oraculo-mujeres-alfa-32-manifestaciones.pdf
│
├── diseño visual/            # Brand Kit, propuestas de identidad, logos vectoriales y fotos
│   ├── propuestas_flor/      # Propuestas históricas (Opción 1, 2 y la ganadora: Opción 3)
│   ├── tipografias/          # Fuentes tipográficas descargadas durante la exploración de identidad
│   ├── logo_fc.svg / .png    # Variantes del logotipo institucional y favicons maestros
│   └── hero_mejorada.jpg     # Fotografía principal tratada y optimizada
│
├── Recuros/                  # Repositorio de materiales fuente del cliente
│   ├── Guia gratuita/        # Material original de la Guía Gratuita
│   ├── Metodo Alfa/          # Capítulos originales y prólogos del Método Alfa
│   ├── Documentos/           # Videos de reuniones (.mp4) y propuestas en Word (.docx)
│   └── Materiales Adicionales/ # Kits y materiales complementarios
│
├── scratch/                  # Scripts de automatización interna (generadores de favicons, PDFs, etc.)
│
├── index.html                # Página principal (Home / Landing)
├── guias-gratuitas.html      # Biblioteca de recursos gratuitos descargables
├── sobre-flor.html           # Biografía, historia y filosofía de Florencia Castillo
├── legales.html              # Términos y condiciones, aviso legal y políticas de privacidad
├── guia-radiografia-alfa.html # Portal / Landing individual de la Radiografía Alfa
├── guia-habitos-financieros.html # Portal / Landing individual de Hábitos Financieros
├── guia-materializar-dinero.html # Portal / Landing individual de Materializar Dinero
├── guia-30-dias-dinero.html  # Portal / Landing individual de Escribí esto 30 días
├── portal-login.html         # Acceso privado a comunidad / alumnas
├── portal-dashboard.html     # Panel de control de alumnas
├── portal-aula.html          # Reproductor y módulo de clases
│
├── styles.css                # Hoja de estilos central unificada y responsive
├── script.js                 # Interactividad y lógica de cliente
├── favicon.svg / .ico / .png # Favicons del sitio en raíz
├── sitemap.xml & robots.txt  # Configuración SEO para motores de búsqueda
│
├── README.md                 # Este documento maestro del proyecto
├── DEPLOY_Y_ACCESOS.md       # Datos de infraestructura, hosting, DNS y mensajes listos
└── PROYECTO_FLORENCIA_CASTILLO_BRIEFING.md # Brief estratégico inicial del cliente
```

---

## 🏛️ Decisiones Técnicas y de Diseño Clave

### 1. Logotipo Oficial Definitivo ("Opción 3: Sello Celestial")
* **Aprobación:** Se seleccionó por votación unánime la propuesta *Sello Celestial*.
* **Composición:** Monograma entrelazado `FC` en tipografía caligráfica etérea, coronado por una estrella de ocho puntas y rodeado por un fino marco circular dorado/marfil.
* **Archivos maestros:** `diseño visual/propuestas_flor/opcion_3_sello_celestial_trans.svg` y sus correspondientes versiones rasterizadas en alta definición (1024px) y favicons (`favicon.ico`, `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`).
* **Implementación:** Actualizado en todo el navbar, footer y favicons con control de caché (`?v=3`).

### 2. Estandarización de Footers (Estructura de 4 Columnas)
* **Páginas unificadas:** `index.html`, `guias-gratuitas.html`, `sobre-flor.html`, `legales.html` y todas las páginas individuales de recursos.
* **Columnas del pie:**
  1. **Marca:** Logo Sello Celestial, tagline institucional y redes sociales.
  2. **Ecosistema:** Accesos a Inicio, Biblioteca, Sobre Flor y Portal de Alumnas.
  3. **Recursos Oficiales:** Enlaces directos a las 4 guías y oráculo.
  4. **Legal & Contacto:** Enlace a WhatsApp directo, email y página de legales.

### 3. Crédito de Autoría VIREL
* Formato simplificado y elegante en la barra inferior de copyright:
  ```html
  Desarrollado y Gestionado por <a href="https://virelcodes.com" target="_blank" rel="noopener noreferrer"><strong>VIREL.</strong></a>
  ```
  *(Se eliminó el texto redundante `(virelcodes.com)` para una estética más limpia).*

### 4. PDFs Descargables Compilados en Alta Definición
* Generados de forma programática con motor headless a partir de plantillas HTML optimizadas para impresión (`@media print` con sangrado y saltos de página perfectos).
* Ubicados en la carpeta `/descargas/` para permitir descarga directa vía botón `<a>` con atributo `download`.

### 5. Migración de Infraestructura (Vercel ➔ Cloudflare Pages)
* **Motivo:** Garantizar 100% de disponibilidad sin límites de ancho de banda gratuitos, CDN global de ultrabaja latencia, certificados SSL automáticos y dominio propio `florenciacastillo.com` sin costo de hosting.
* **Integración Continua:** Conectado directamente al repositorio GitHub `virelcodes-imago/florencia-castillo` en rama `main`. Cada `git push` publica la web en producción en segundos.
* **Vercel:** Desconectado y programado para su baja definitiva.

---

## 🛠️ Flujo de Trabajo y Mantenimiento

Para aplicar cambios y publicarlos:
1. Editar los archivos correspondientes en el espacio de trabajo local.
2. Hacer commit y push:
   ```bash
   git add .
   git commit -m "feat/fix: descripción del cambio"
   git push origin main
   ```
3. Cloudflare Pages compila y actualiza [https://florenciacastillo.com](https://florenciacastillo.com) automáticamente.

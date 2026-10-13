# 🇵🇪 Red Nacional de Distribución Comercial — Presentación Ejecutiva Interactiva

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgushf8%2Fred-distribucion-peru)
[![Production URL](https://img.shields.io/badge/Production-red--distribucion--peru.vercel.app-0284c7?style=flat&logo=vercel)](https://red-distribucion-peru.vercel.app)

Deck interactivo de alta gama para presentaciones comerciales y estratégicas de la gerencia de distribuidores en el Perú (formato panorámico 16:9). Construido con React, TypeScript, Vite, SVG nativos interactivos, sistema de temas dual Claro/Obsidian y arquitectura desacoplada de diapositivas modulares.

---

## 📌 REGLA DE ORO ARQUITECTURAL (INQUEBRANTABLE)

> [!IMPORTANT]
> **LA LÁMINA DE CIERRE (*¡Muchas Gracias!* / `ClosingSlide`) SIEMPRE DEBE QUEDAR ESTRICTAMENTE AL FINAL DE LA PRESENTACIÓN.**
> Cualquier nueva lámina de contenido que se agregue en el futuro (Slide 5, Slide 6, etc.) debe insertarse **antes** de la lámina de cierre, desplazando dinámicamente a *¡Muchas Gracias!* como el último slide del deck.

---

## 📊 ESTRUCTURA ACTUAL DE LA PRESENTACIÓN (5 PPTs EN TOTAL)

Actualmente la presentación cuenta con **5 diapositivas estructuradas**:

```
[Slide 1] ───► [Slide 2] ───► [Slide 3] ───► [Slide 4] ───► [Slide 5: CIERRE]
  Mapa           Trayectoria     Crecimiento    Crecimiento     ¡Muchas Gracias!
Nacional          General         x Tienda        x Grupo     (Siempre al final)
```

| # | Diapositiva | Badge / Título | Contenido y Métrica Clave |
|:---:|:---|:---|:---|
| **1** | **Slide 1: Red Nacional** | `RED NACIONAL`<br>Presencia a lo largo del Perú | Mapa cartográfico vectorial SVG del Perú con 26 plazas, 10 socios distribuidores, badges de flota (camiones, vendedores, clientes) y Tour Automático guiado. |
| **2** | **Slide 2: Trayectoria Nacional** | `TRAYECTORIA NACIONAL`<br>El reto de la gerencia distribuidores | Evolución del volumen en toneladas métricas a través de 6 fases secuenciales interactivas (Cierre 25, Q3 25, Q3 26, Oct 26, Nov 26, Cierre 26) con desglose consolidado e individual. |
| **3** | **Slide 3: Crecimiento por Tienda** | `CRECIMIENTO POR TIENDA`<br>El reto de la gerencia distribuidores | Gráfico de barras horizontales divergentes (-22% a +15%) para 14 tiendas evaluadas, con animación en cascada desde la línea base del 0% que se repite en bucle cada 10 segundos. |
| **4** | **Slide 4: Crecimiento YTD por Grupo** | `CRECIMIENTO POR GRUPO`<br>El reto de la gerencia distribuidores | Gráfico horizontal SVG de **9 Grupos Comerciales** ordenados de mayor a menor crecimiento (APU 28%, CSM 10%, POTOSI 9%, DISMAR 8%, LA GENOVESA 8%, REP STO DGO 8%, PERAMAS 7%, BERAUN 3%, EMCOSUR 2%) + **Total Red Nacional (8% barra navy)**, sincronizado con tabla ejecutiva de datos e insights estratégicos. |
| **5** | **Slide 5: Agradecimiento (Cierre)** | `AGRADECIMIENTO`<br>¡Muchas Gracias! | Lámina final corporativa de despedida institucional con botón interactivo de reinicio al Slide 1. **(Siempre en la última posición)**. |

---

## 🛠️ PROTOCOLO ESTANDARIZADO PARA AGREGAR NUEVAS DIAPOSITIVAS

Para agregar cualquier nueva diapositiva (por ejemplo, Slide 5 antes del Cierre, convirtiendo a la presentación en 6 diapositivas), seguir rigurosamente estos 6 pasos:

### 1. Crear el Dataset en `src/data/`
Crear `src/data/nombreDataset.ts` con los datos numéricos y textos puros, exportando tipos e interfaces limpios.

### 2. Crear el Componente en `src/components/slideN/`
Crear la carpeta `src/components/slideN/` con su componente React `SlideN.tsx`, implementando la misma línea gráfica:
- Encabezado con título principal, subtítulo en cursiva azul/verde y cluster de KPIs superiores con píldoras de colores (`pill-*-badge`).
- Gráfico SVG vectorial con animaciones de entrada progresivas (`cubic-bezier`).
- Botón de repetición de flujo de animación (`btn-replay-cascade`).
- Sincronización de eventos de hover entre elementos gráficos y tablas/fichas.

### 3. Crear los Estilos en `src/styles/slideN.css` e Importar en `index.css`
Crear `src/styles/slideN.css` utilizando las variables canónicas de `variables.css` (`--card-bg`, `--card-border`, `--text-title`, `--accent-blue`, etc.) e importarlo en `src/styles/index.css`:
```css
/* 5. Diapositiva 5: Nombre de la Diapositiva */
@import './slide5.css';
```

### 4. Actualizar `SlideHeader.tsx`
En `src/components/layout/SlideHeader.tsx`, actualizar las funciones de metadatos:
```tsx
const getBadgeText = () => {
  if (isClosingSlide) return 'AGRADECIMIENTO';
  // ...
  if (currentSlide === 5) return 'NUEVO MÓDULO';
  return `MÓDULO ${currentSlide}`;
};

const getSubtitle = () => {
  if (isClosingSlide) return 'Presencia a lo largo del Perú...';
  // ...
  if (currentSlide === 5) return 'Subtítulo descriptivo de la lámina 5';
  return '';
};
```

### 5. Actualizar `src/App.tsx`
Modificar únicamente el contador central de diapositivas de contenido. La arquitectura calcula dinámicamente el cierre:
```tsx
// Incrementar el número de diapositivas de contenido
const contentSlidesCount = 5; // Slide 1, Slide 2, Slide 3, Slide 4, Slide 5
const closingSlideIndex = contentSlidesCount + 1; // Slide 6 (¡Muchas Gracias!)
const totalSlides = closingSlideIndex; // 6 en total
```
Actualizar los manejadores `handleNext` y `handlePrev` para encadenar la nueva diapositiva, e insertar la etiqueta `<section>` del nuevo slide justo **antes** de `<section id="slide-closing">`.

### 6. Validar y Desplegar a GitHub / Vercel
```bash
# 1. Validar que no existan errores de TypeScript o empaquetado
npm run build

# 2. Confirmar cambios y enviar a GitHub (Vercel despliega automáticamente)
git add .
git commit -m "Add Slide N: [Descripción] manteniendo Gracias al final"
git push origin main
```

---

## 🎨 LÍNEA GRÁFICA Y REGLAS DE DISEÑO

- **Alineación Visual**: Todos los títulos mantienen `font-family: Outfit`, peso 900, con icono temático de Lucide a la izquierda (`#0284c7` para azul, `#059669` para verde, `#e11d48` para carmesí).
- **Glassmorphism**: Tarjetas con `backdrop-filter: blur(24px)`, bordes semitransparentes y sombras suaves con profundidad.
- **Micro-Animaciones**: Barras escalonadas con `transformOrigin: baseline`, escalado de escala horizontal `scaleX(1)` y retraso progresivo (`staggered delay`).
- **Autociclo de 10 Segundos**: Las láminas de analítica reactivan su flujo cada 10 segundos para mantener el dinamismo durante la exposición.
- **Tipografía Numérica**: Números tabulares legibles de alta resolución.
- **Total en Barra Oscura**: Los consolidados totales siempre emplean una barra de alto contraste azul marino / pizarra oscuro (`#0f172a` a `#1e293b`), separada por una línea divisoria sutil.

---

## 💻 DESARROLLO LOCAL

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en tiempo real
npm run dev

# Compilar para producción
npm run build
```

---

## 🌐 ENLACE OFICIAL DE PRODUCCIÓN
- **Vercel Live:** [https://red-distribucion-peru.vercel.app](https://red-distribucion-peru.vercel.app)
- **Repositorio GitHub:** [https://github.com/gushf8/red-distribucion-peru](https://github.com/gushf8/red-distribucion-peru)

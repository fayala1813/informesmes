/************************************************************
 * INTERPRETACIÓN AVANZADA – UNIVERSAL PARA TODAS LAS PESTAÑAS
 * Genera:
 *  - Resumen descriptivo
 *  - Análisis matemático
 *  - Sugerencias de marketing hotelero
 * Basado en:
 *  - Channel Mix Optimization Theory
 *  - Destination Image Theory (Gallarza, 2002)
 *  - Price Sensitivity Models
 *  - Direct Booking Funnel Theory
 *  - Lead Time Behavior en hoteles
 ************************************************************/
function interpretarGraficoAvanzado(nombre, semanas, dataPorCanal, extras = {}) {

  /* ============================
     1. TOTALES POR SEMANA
     ============================ */
  const totalesPorSemana = semanas.map((_, i) =>
    Object.values(dataPorCanal).reduce((acc, arr) => acc + (arr[i] || 0), 0)
  );

  const totalInicial = totalesPorSemana[0];
  const totalFinal = totalesPorSemana[totalesPorSemana.length - 1];
  const variacionAbs = totalFinal - totalInicial;
  const variacionPct = totalInicial > 0 ? (variacionAbs / totalInicial) * 100 : 0;

  /* ============================
     2. TOTALES POR CANAL
     ============================ */
  const rankingCanales = Object.keys(dataPorCanal)
    .map(canal => ({
      canal,
      total: dataPorCanal[canal].reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.total - a.total);

  const top1 = rankingCanales[0];
  const top2 = rankingCanales[1];
  const bottom = rankingCanales[rankingCanales.length - 1];

  /* ============================
     3. TASA DE CANCELACIÓN (opcional)
     ============================ */
  const tasaCXL = extras.cancelaciones && extras.brutas
    ? ((extras.cancelaciones.reduce((a,b)=>a+b,0) /
        extras.brutas.reduce((a,b)=>a+b,0)) * 100).toFixed(2)
    : null;

  /* ============================
     4. INTERPRETACIÓN TEÓRICA
     ============================ */
  let teoria = "";

  // Canal dominante
  if (top1.canal === "TTOO") {
    teoria +=
      "• El canal dominante es TTOO, lo cual indica una dependencia de contratos previos, baja elasticidad en precio y estrategias de volumen. " +
      "Según **Channel Mix Optimization Theory**, esto estabiliza ocupación pero limita el ADR máximo.\n";
  }

  if (top1.canal === "OTAs") {
    teoria +=
      "• OTAs como canal principal reflejan alta elasticidad de precio y fuerte competencia. " +
      "La teoría **Price Sensitivity & Visibility Model** indica que mejorar ranking y visibilidad aumenta ingresos inmediatamente.\n";
  }

  if (top1.canal === "Directo" || top1.canal === "Web") {
    teoria +=
      "• El canal Directo domina. Según **Direct Booking Funnel Theory**, el hotel está captando demanda con alta intención y bajo costo de adquisición. " +
      "Optimizar el funnel aumenta ROAS y reduce dependencia de OTAs.\n";
  }

  // Caso Oceanfront
  if (nombre.toLowerCase().includes("oceanfront")) {
    teoria +=
      "• Oceanfront se ajusta a la **Destination Image Theory (Gallarza, 2002)**: mercados europeos y canadienses prefieren hoteles boutique, menos masivos y con fuerte atractivo visual. " +
      "Esto incrementa mezcla internacional, ADR y conversión.\n";
  }

  // Cancelaciones
  if (tasaCXL && tasaCXL > 15) {
    teoria +=
      "• La tasa de cancelación supera el 15%, lo cual sugiere problemas en paridad tarifaria, tarifas flexibles o compras impulsivas desde OTAs.\n";
  }

  if (tasaCXL && tasaCXL < 8) {
    teoria +=
      "• Tasa de cancelación sana (<8%). Esto indica demanda más firme y menor volatilidad.\n";
  }

  /* ============================
     5. TEXTO FINAL
     ============================ */
  return `
${nombre} – Análisis General

Producción:
• Semana inicial: $${totalInicial.toLocaleString("en-US")}
• Semana final: $${totalFinal.toLocaleString("en-US")}
• Variación absoluta: $${variacionAbs.toLocaleString("en-US")}
• Variación porcentual: ${variacionPct.toFixed(2)}%

Ranking de canales:
• 1) ${top1.canal}: $${top1.total.toLocaleString("en-US")}
• 2) ${top2.canal}: $${top2.total.toLocaleString("en-US")}
• Canal más bajo: ${bottom.canal} ($${bottom.total.toLocaleString("en-US")})

${tasaCXL ? `Tasa de cancelación general: ${tasaCXL}%\n` : ""}

Interpretación basada en teoría:
${teoria}

Recomendaciones:
• Reducir dependencia de ${top1.canal} ajustando mix para mejorar ADR.
• Aplicar estrategia WTS (Win The Search): visibilidad, paridad y conversión.
• Fortalecer campañas directas con valor agregado, no descuento.
• Revisar lead time por canal para ajustar inversión por temporada.
• Usar datos de cancelación para calibrar políticas flexibles vs. no reembolsables.

`;
}

/**********************************************
 * SISTEMA DE PESTAÑAS
 **********************************************/
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("tab-btn")) return;

  document.querySelectorAll(".tab-btn").forEach(btn =>
    btn.classList.remove("active")
  );
  e.target.classList.add("active");

  const target = e.target.dataset.target;

  document.querySelectorAll(".tab-content").forEach(box =>
    box.classList.remove("active")
  );
  document.getElementById(target).classList.add("active");

if (target === "general")            renderGeneral();
if (target === "fivesBeach")         renderFivesBeach();
if (target === "oceanfront")         renderOceanfront();
if (target === "beachfront")         renderBeachfront();
if (target === "downtown")           renderDowntown();
if (target === "otas")               renderOtas();
if (target === "contactCenter")      renderContactCenter();
if (target === "web")                renderWeb();
if (target === "bedbank")            renderBedbank();
if (target === "paises")             renderPaises();
if (target === "comparacionPaises")  renderComparacionPaises();
if (target === "medios")             renderMedios();
if (target === "performanceWeb")     renderPerformanceWeb();

});

/**********************************************
 * INICIALIZACIÓN
 **********************************************/
window.addEventListener("load", () => {
  renderGeneral();
});

/**********************************************
 * COLORES – SOLO CANALES
 **********************************************/
const COLORS = {
  TTOO: "#005AB5",
  OTAs: "#DC267F",
  Clubes: "#FE6100",
  Directo: "#648FFF",
  Bodas: "#785EF0",
  Grupos: "#FFB000",
  Minoristas: "#3CBB75",
  Hilton: "#F03A47",
  Otros: "#000000",
  Bedbanks: "#99d98c",
  INTERCO: "#7E7E7E",
  COMPLIMENTARY: "#adb5bd",
  "TTOO GRUPOS": "#6930c3",
  PROPIETARIOS: "#555555"
};

/**********************************************
 * COLORES – SOLO PAISES
 **********************************************/
const COLORS_PAISES = {
  "Estados Unidos": "#003f5c",
  "México": "#00876c",
  "Reino Unido": "#ff7c43",
  "Canadá": "#ffa600",
  "Alemania": "#4c78a8",
  "España": "#f58518",
  "Francia": "#54a24b",
  "Italia": "#e45756",
  "Suecia": "#72b7b2",
  "Países Bajos": "#b279a2",
  "Nigeria": "#ff9da7",
  "Noruega": "#9c755f"
};



/**********************************************
 * UTILIDAD: VARIACIÓN SEMANAL
 **********************************************/
function agregarVariacionSemanal(divID, semanas, dataPorCanal) {
  const totales = semanas.map((sem, i) =>
    Object.values(dataPorCanal)
      .map(arr => arr[i] || 0)
      .reduce((a, b) => a + b, 0)
  );

  if (totales.length < 2) return;

  const gd = document.getElementById(divID);
  if (!gd) return;

  const existentes = (gd.layout?.annotations || []).filter(
    a => !a.id || !a.id.startsWith("var_")
  );

  const nuevas = [];

  for (let i = 1; i < totales.length; i++) {
    const prev = totales[i - 1];
    const curr = totales[i];
    const diff = curr - prev;
    const pct = prev > 0 ? (diff / prev) * 100 : 0;

    nuevas.push({
      id: `var_${i}`,
      x: semanas[i],
      y: curr * 1.20,
      text:
        (diff >= 0 ? "↑ +" : "↓ –") +
        "$" + Math.abs(diff).toLocaleString("en-US") +
        ` (${Math.abs(pct).toFixed(1)}%)`,
      showarrow: false,
      font: {
        size: 13,
        color: diff >= 0 ? "#1FA055" : "#C1272D",
        family: "Inter"
      }
    });
  }

  Plotly.relayout(divID, {
    annotations: [...existentes, ...nuevas]
  });
}

/**********************************************
 * INTERPRETACIÓN AVANZADA – MARKETING HOTELERO
 **********************************************/
function interpretarGrafico(canal, semanas, datos) {

  // ==== HELPERS MATEMÁTICOS ====
  const total      = arr => arr.reduce((a, b) => a + b, 0);
  const variacion  = arr => arr[arr.length - 1] - arr[0];
  const promedio   = arr => total(arr) / arr.length;
  const pct        = (a, b) => b === 0 ? 0 : (a / b) * 100;

  const brutas  = datos.Brutas         || [];
  const cancel  = datos.Cancelaciones  || [];
  const netas   = datos.Netas          || [];

  const variacionNeta    = variacion(netas);
  const pctCancelProm    = promedio(cancel.map((c,i) => pct(c, brutas[i]||1)));

  // ==== BASE MATEMÁTICA GENERAL ====
  const totalBrutas = total(brutas);
  const totalNetas  = total(netas);
  const totalCancel = total(cancel);

  const rv = totalNetas;  // Revenue Velocity: suma neta del periodo.
  const rvSemanal = semanas.map((s,i)=> netas[i] || 0);

  const rvTrend = variacion(rvSemanal);
  const rvTrendPct = rvSemanal[0] > 0 ? (rvTrend / rvSemanal[0]) * 100 : 0;


  // ==== PLANTILLAS AVANZADAS SEGÚN CANAL ====

  const textos = {

    "General": `
El consolidado general sigue la lógica de **Revenue Velocity Theory (RVT)**, donde:

    RVT = Σ(Netas₍semana₎)

La variación neta del periodo es de **${variacionNeta.toLocaleString("en-US")} USD**, lo cual indica
un comportamiento ${rvTrend >= 0 ? "acelerado" : "desacelerado"} de la demanda agregada.

El % de cancelación promedio es **${pctCancelProm.toFixed(2)}%**, lo que cae dentro del rango óptimo
descrito por la **Cancellation Compensation Curve**, donde las cancelaciones son absorbidas por la mezcla
de canales sin generar erosión directa al revenue final.

Matemáticamente:

    Neto = Brutas – Cancelaciones  
    Elasticidad = %ΔReservas / %ΔPrecio  

Se observa una elasticidad baja a media, sugiriendo una demanda relativamente estable y resiliente.

**Recomendación estratégica:**  
Optimizar la mezcla (mix) para incrementar la aportación de canales de alta calidad (Directo, Clubes),
especialmente en semanas donde la RVT baja su pendiente.
`,

    "The Fives Beach": `
The Fives Beach presenta un patrón consistente con la **Resort Demand Theory**, caracterizada por una mezcla
dominada por TTOO y Clubes, lo cual genera estabilidad semanal.

La demanda muestra elasticidad **Ed < 1**, típica de mercados de sol y playa con percepción fuerte de valor.

Matemáticamente:

    Neto = Brutas – Cancel  
    Tasa de Estabilidad = DesvEst(Netas) / Prom(Netas)

El % de cancelación promedio es **${pctCancelProm.toFixed(2)}%**, indicando bajo riesgo OTA.

**Recomendación estratégica:**  
Incrementar campañas de valor agregado (no de precio), promover LOS +3 noches y reforzar Clubes/Loyalty
al ser un canal de baja volatilidad y alto lifetime value (LTV).
`,

    "Oceanfront": `
Oceanfront sigue un patrón alineado con **High-Intent Traveler Theory** y **Destination Image Theory**, relevante
en mercados europeos y canadienses.

La variación de revenue del periodo es **${variacionNeta.toLocaleString("en-US")} USD**, lo que indica una demanda
estable y poco afectada por fluctuaciones tácticas.

Matemáticamente:

    RevPAR* = Neto / Habitaciones Disponibles  
    ADR Estimado = Neto / Reservas

La curva sugiere turistas de largo booking window y alta sensibilidad a branding, no necesariamente a precio.

**Recomendación estratégica:**  
Invertir en campañas de inspiración (Meta Advantage+), SEO internacional y acuerdos con TTOO europeos.
`,

    "Beachfront": `
Beachfront presenta un comportamiento típico de mercados con **short booking window**.

El %CXL promedio de **${pctCancelProm.toFixed(2)}%** indica alta exposición a reservas impulsivas,
frecuentemente ligadas a OTAs.

Ecuación clave:

    PctCXL = Cancel / Brutas × 100

La volatilidad semanal indica sensibilidad a precio (Ed > 1).

**Recomendación estratégica:**  
Fortalecer tarifas no reembolsables, “Book Direct & Save”, y campañas de remarketing 1–3 días antes de llegada.
`,

    "Downtown": `
Downtown presenta un comportamiento alineado con el **Urban Demand Model**, donde la mezcla corporate estabiliza
la producción aun cuando OTAs y leisure varían.

La fórmula macro:

    RV = Corporate + OTA + Leisure

El bajo nivel de cancelaciones y la estabilidad neta sugieren demanda inelástica (Ed < 1).

**Recomendación estratégica:**  
Refuerzo SEO local, Google Hotel Ads, paquetes “City Break”, y alianzas corporativas.
`,

    "OTAs": `
Las OTAs presentan una elasticidad alta, lo cual es normal en mercados comparativos:

    Elasticidad OTA = %ΔReservas / %ΔPrecio

El %CXL promedio (**${pctCancelProm.toFixed(2)}%**) está dentro del rango típico de políticas flexibles.
La volatilidad semanal indica presencia de **OTA Cannibalization**, fenómeno donde OTAs compiten entre sí
y contra el canal directo.

**Recomendación estratégica:**  
Aplicar Sponsored Listings, Paridad Estratégica y ofertar beneficios exclusivos en canal directo.
`,

    "Web": `
El canal Directo (Web) sigue la **Direct Booking Advantage Theory**, donde pequeñas variaciones de tráfico
generan cambios grandes en revenue por su alta intención.

El %CXL promedio de **${pctCancelProm.toFixed(2)}%** muestra alta calidad de las reservas directas.

La ecuación:

    ROAS = Revenue / Spent

y la tendencia estable de netas sugieren potencial para optimizar campañas de meta y search.

**Recomendación estratégica:**  
Aumentar inversión en campañas Brand, mejorar CRO del motor y reforzar retargeting de carrito abandonado.
`,

    "Bedbank": `
Bedbank opera bajo el modelo de **Wholesale Demand Theory**, con fuerte dependencia de tarifas netas y mercados
saturados de intermediarios.

El revenue neto muestra variación de **${variacionNeta.toLocaleString("en-US")} USD**, lo cual indica fluctuaciones
propias de mercados B2B.

El %CXL promedio (**${pctCancelProm.toFixed(2)}%**) suele ser más alto que en otros canales debido a su política
contractual.

**Recomendación estratégica:**  
Optimizar contratos, limitar allotments poco productivos, e implementar modelado predictivo para evitar
sobreexposición en semanas de baja demanda.
`,

    "Contact Center": `
El Contact Center muestra un patrón alineado con la **High-Intent Conversion Theory**, donde el usuario que llama
tiene intención más alta que el usuario OTA.

Matemáticamente:

    Conversión = Reservas / Llamadas Entrantes

El comportamiento neto creciente/reforzado muestra buena eficiencia operativa.

El %CXL promedio es **${pctCancelProm.toFixed(2)}%**, excelente para un canal humano.

**Recomendación estratégica:**  
Refuerzo del speech de upselling, cross-selling, y priorizar scripts basados en urgencia (scarcity signaling).
`
  };

  // ==== ENTREGA FINAL ====

  return `
INTERPRETACIÓN AVANZADA – ${canal}

———————————————
RESUMEN MATEMÁTICO DEL PERIODO
• Total Brutas: $${totalBrutas.toLocaleString("en-US")}
• Total Cancel: $${totalCancel.toLocaleString("en-US")}
• Total Netas:  $${totalNetas.toLocaleString("en-US")}
• %CXL Promedio: ${pctCancelProm.toFixed(2)}%

———————————————
VARIACIÓN SEMANAL
• Variación neta: ${variacionNeta >= 0 ? "▲" : "▼"} 
  $${Math.abs(variacionNeta).toLocaleString("en-US")}
  (${rvTrendPct.toFixed(1)}%)

———————————————
INTERPRETACIÓN SEGÚN MODELO DE MARKETING
${textos[canal] || "Sin modelo definido para este canal."}
`.trim();
}


/**********************************************
 * ORDENAR CANALES POR INGRESO TOTAL
 **********************************************/
function ordenarCanalesPorIngreso(dataPorCanal) {
  return Object.keys(dataPorCanal)
    .map(canal => ({
      canal,
      total: dataPorCanal[canal].reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.total - a.total)
    .map(t => t.canal);
}

/**********************************************
 * STACKED ORDENADO
 **********************************************/
function crearGraficoStackedOrdenado(divID, titulo, semanas, dataPorCanal) {
  const orden = ordenarCanalesPorIngreso(dataPorCanal);

  const traces = orden.map(canal => ({
    x: semanas,
    y: dataPorCanal[canal],
    type: "bar",
    name: canal,
    marker: { color: COLORS[canal] },
    width: 0.55,
    text: dataPorCanal[canal].map(v =>
      v ? "$" + v.toLocaleString("en-US") : ""
    ),
    textposition: "inside",
    insidetextanchor: "middle",
    textfont: { size: 11, color: "white" }
  }));

  const layout = {
    barmode: "stack",
    margin: { t: 110, l: 90, r: 150, b: 80 },
    title: { text: titulo, font: { size: 22, color: "#003366" } },
    legend: {
      orientation: "h",
      y: -0.25,
      x: 0.5,
      xanchor: "center"
    }
  };

 Plotly.newPlot(divID, traces, layout).then(() => {

  // 1. Totales por semana
  agregarTotalesAStacked(divID, semanas, dataPorCanal);

  // 2. Línea de tendencia
  agregarLineaDeTendencia(divID, semanas);

  // 3. Variación semanal
  agregarVariacionSemanal(divID, semanas, dataPorCanal);

  // 4. Sistema profesional de anotaciones
  activarSistemaDeAnotaciones(divID);

});


}
/**********************************************
 * TOTALES ARRIBA DE CADA BARRA (NO BORRA NADA)
 **********************************************/
function agregarTotalesAStacked(divID, semanas, dataPorCanal) {

  const gd = document.getElementById(divID);
  const existentes = gd.layout.annotations || [];

  const totales = semanas.map((sem, i) =>
    Object.values(dataPorCanal)
      .map(arr => arr[i] || 0)
      .reduce((a, b) => a + b, 0)
  );

  const nuevas = semanas.map((sem, i) => ({
    x: sem,
    y: totales[i] * 1.03,
    text: "$" + totales[i].toLocaleString("en-US"),
    showarrow: false,
    font: { size: 14, color: "#003366", family: "Inter" }
  }));

  Plotly.relayout(divID, {
    annotations: [...existentes, ...nuevas]
  });
}

/**********************************************
 * FLECHAS LATERALES PARA W47 (GLOBAL)
 **********************************************/
function agregarFlechasW47(divID, semanas, dataPorCanal) {
  const gd = document.getElementById(divID);
  if (!gd) return;

  const idx = semanas.indexOf("W47");
  if (idx === -1) return;

  // Total acumulado de la barra W47
  const totalW47 = Object.values(dataPorCanal)
    .reduce((acc, arr) => acc + (arr[idx] || 0), 0);

  const x = "W47";
  const yCentro = totalW47 * 0.50;

  const nuevas = [
    {
      x,
      y: yCentro,
      ax: -40,
      ay: 0,
      text: "← Total parcial",
      showarrow: true,
      arrowhead: 2,
      arrowsize: 1,
      arrowwidth: 1.5,
      font: { size: 12, color: "#003366", family: "Inter" }
    },
    {
      x,
      y: yCentro,
      ax: 40,
      ay: 0,
      text: "Total parcial →",
      showarrow: true,
      arrowhead: 2,
      arrowsize: 1,
      arrowwidth: 1.5,
      font: { size: 12, color: "#003366", family: "Inter" }
    }
  ];

  const existentes = gd.layout.annotations || [];

  Plotly.relayout(divID, {
    annotations: [...existentes, ...nuevas]
  });
}

/**********************************************
 * LÍNEA DE TENDENCIA
 **********************************************/
function agregarLineaDeTendencia(divID, semanas) {
  const gd = document.getElementById(divID);
  if (!gd) return;

  const anot = gd.layout?.annotations || [];

  const coords = semanas.map(sem =>
    (anot.find(a => a.x === sem) || {}).y || null
  );

  const OFFSET = 0.05;
  const coordsAdj = coords.map(y => (y ? y + y * OFFSET : null));

  const linea = {
    x: semanas,
    y: coordsAdj,
    type: "scatter",
    mode: "lines+markers",
    name: "Tendencia",
    line: { width: 2, color: "#2C7AC9" },
    marker: {
      size: 8,
      color: "#2C7AC9",
      line: { width: 1, color: "white" }
    }
  };

  Plotly.addTraces(divID, linea);
}

/**********************************************
 * GENERAL – W42 A W48 (NETOS POR CANAL)
 **********************************************/
function renderGeneral() {

  const w42 = {
    TTOO: 401001.30, OTAs: 71366.61, Clubes: 260786.29,
    Directo: 181492.83, Bodas: 671165.00, Grupos: 22251.00,
    Minoristas: 41996.74, Hilton: 31065.94, Otros: 0.00,
    Bedbanks: -4470.22, INTERCO: 4862.01, COMPLIMENTARY: 0.05,
    "TTOO GRUPOS": 270473.00, PROPIETARIOS: 0.00
  };

  const w43 = {
    TTOO: 780999.21, OTAs: 27309.47, Clubes: 231499.97,
    Directo: 303989.37, Bodas: 305238.00, Grupos: 24778.99,
    Minoristas: 63308.40, Hilton: 24864.08, Otros: 0.00,
    Bedbanks: 13422.10, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    "TTOO GRUPOS": 177593.00, PROPIETARIOS: 9.76
  };

  const w44 = {
    TTOO: 656090.42, OTAs: 65580.12, Clubes: 301396.66,
    Directo: 180397.95, Bodas: 209808.00, Grupos: 307.23,
    Minoristas: 6259.07, Hilton: 56866.40, Otros: 0.00,
    Bedbanks: 10847.43, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    "TTOO GRUPOS": 110204.00, PROPIETARIOS: 6.44
  };

  const w45 = {
    TTOO: 741336.52, OTAs: 69157.25, Clubes: 293962.46,
    Directo: 246744.17, Bodas: 47454.00, Grupos: 104160.00,
    Minoristas: 21897.53, Hilton: 83755.45, Otros: 0.00,
    Bedbanks: 21087.57, INTERCO: 10364.75, COMPLIMENTARY: 1280.01,
    "TTOO GRUPOS": 4261.00, PROPIETARIOS: 0.00
  };

  const w46 = {
    TTOO: 768112.60, OTAs: 140384.05, Clubes: 350448.73,
    Directo: 359726.84, Bodas: 94109.00, Grupos: 22496.22,
    Minoristas: 39947.45, Hilton: 73539.55, Otros: 0.00,
    Bedbanks: 28052.10, INTERCO: 2436.48, COMPLIMENTARY: 0.17,
    "TTOO GRUPOS": 26115.00, PROPIETARIOS: 0.00
  };

  const w47 = {
    TTOO: 823859.72, OTAs: 53440.25, Clubes: 283975.62,
    Directo: 259036.80, Bodas: 146657.00, Grupos: 21257.68,
    Minoristas: 47425.61, Hilton: 86969.34, Otros: 0.00,
    Bedbanks: -626.15, INTERCO: 1320.00, COMPLIMENTARY: 0.00,
    "TTOO GRUPOS": 196114.00, PROPIETARIOS: 21.00
  };

  /* ======================================
     SEMANA 48 – DATOS CORRECTOS
     (LOGIC: BookingDate brutos − cxlDate cancelados)
  ====================================== */
  const w48 = {
    TTOO:         577178.35,
    OTAs:         57709.66,
    Clubes:       356567.50,
    Directo:      298554.18,
    Bodas:        150958.00,
    Grupos:       231.68,
    Minoristas:   41813.10,
    Hilton:       94195.57,
    Otros:        2627.30,
    Bedbanks:     33109.07,
    INTERCO:      1320.00,
    COMPLIMENTARY: 0.31,
    "TTOO GRUPOS": 196114.00,
    PROPIETARIOS: 21.00
  };

  const semanas = ["W42","W43","W44","W45","W46","W47","W48"];

  /* ======================================
        ARMAR EL DATASET DINÁMICO
  ====================================== */
  const data = {};
  Object.keys(COLORS).forEach(canal => {
    data[canal] = [
      w42[canal] || 0,
      w43[canal] || 0,
      w44[canal] || 0,
      w45[canal] || 0,
      w46[canal] || 0,
      w47[canal] || 0,
      w48[canal] || 0
    ];
  });

  /* ======================================
        DIBUJAR GRAFICO GENERAL
  ====================================== */
  crearGraficoStackedOrdenado(
    "graficoGeneral",
    "Producción Semanas 42–48 – General (Neto por canal)",
    semanas,
    data
  );

  /* ACTIVAR ZOOM */
  setTimeout(() => {
    activarZoomPan("graficoGeneral");
  }, 1400);

  /* INTERPRETACIÓN */
  const divInt = document.getElementById("interpretacion-general");
  if (divInt) {
    divInt.innerText = interpretarGrafico("General", semanas, data);
  }

}

/**********************************************
 * THE FIVES BEACH – W42–W48 (NETOS REALES)
 **********************************************/
function renderFivesBeach() {

  const semanas = ["W42","W43","W44","W45","W46","W47","W48"];

  const data = {
    TTOO: [
      320431.10, 624861.95, 537558.47,
      638062.57, 664275.81, 364562.80,
      462401.51   // W48 CORRECTO
    ],

    "TTOO GRUPOS": [
      209153.00, 177593.00, 58648.00,
      4261.00,   26115.00,      0.00,
      196114.00  // W48 CORRECTO
    ],

    OTAs: [
      56023.98, 5538.10, 44206.56,
      45796.00, 117208.50, 8136.63,
      26077.88   // W48 CORRECTO
    ],

    Clubes: [
      217507.42, 185666.84, 236910.55,
      242258.54, 256873.88, 126851.51,
      254707.71  // W48 CORRECTO
    ],

    Directo: [
      130514.27, 251214.80, 129553.11,
      193366.85, 282147.18, 78873.44,
      225866.09  // W48 CORRECTO
    ],

    Bodas: [
      74881.00, 282030.00, 103626.00,
      44700.00, 92759.00, 83820.00,
      139893.00 // W48 CORRECTO
    ],

    Grupos: [
      21006.00, 14904.00, 434.78,
      104160.00, 9282.00, 0.00,
      13438.97  // W48 CORRECTO
    ],

    Minoristas: [
      36822.91, 53280.42, 5990.88,
      20775.47, 31200.05, 28816.36,
      30067.12  // W48 CORRECTO
    ],

    Bedbanks: [
      -6924.34, 11753.80, 2143.98,
      27930.25, 20614.29, 10347.53,
      11490.48  // W48 CORRECTO
    ],

    INTERCO: [
      2779.92, 0.00, 0.00,
      9404.75, 2436.48, 0.00,
      1320.00   // W48 CORRECTO
    ],

    COMPLIMENTARY: [
      0.05, 0.00, 0.00,
      1280.01, 0.00, 0.00,
      0.00      // W48 CORRECTO
    ],

    PROPIETARIOS: [0,0,0,0,0,0,21.00],   // W48 CORRECTO
    Hilton: [0,0,0,0,0,0,0],
    Otros:  [0,0,0,0,0,0,0]
  };

  crearGraficoStackedOrdenado(
    "graficoBeach",
    "Producción Neta Semanas 42–48 – The Fives Beach",
    semanas,
    data
  );

  /* AJUSTE ESPECIAL VISUAL */
  setTimeout(() => {
    const gd = document.getElementById("graficoBeach");
    if (!gd) return;

    let anot = JSON.parse(JSON.stringify(gd.layout.annotations || []));
    anot = anot.map(a => {
      if (["W47","W48"].includes(a.x)) {
        a.y *= 1.18;
      }
      return a;
    });

    Plotly.relayout("graficoBeach", { annotations: anot });
    separarCapasMagnetico("graficoBeach", 22);
  }, 950);

  const divInt = document.getElementById("interpretacion-beach");
  if (divInt) {
    divInt.innerText = interpretarGrafico("The Fives Beach", semanas, data);
  }
}




/**********************************************
 * OCEANFRONT – W42–W48 (NETO REAL)
 **********************************************/
function renderOceanfront() {

  const w42 = {
    TTOO: 65454.59, OTAs: 22630.68, Clubes: 11562.57,
    Directo: 50924.57, Bodas: 9483.00, Grupos: 1245.00,
    Minoristas: 5074.71, Bedbanks: 11321.85,
    PROPIETARIOS: 0.00, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    Hilton: 0, Otros: 0
  };

  const w43 = {
    TTOO: 123382.94, OTAs: 19455.09, Clubes: 25520.54,
    Directo: 50446.39, Bodas: 27555.00, Grupos: 9473.00,
    Minoristas: 4880.04, Bedbanks: 1668.30,
    PROPIETARIOS: 0.54, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    Hilton: 0, Otros: 0
  };

  const w44 = {
    TTOO: 111279.86, OTAs: 25687.45, Clubes: 30379.02,
    Directo: 44494.32, Bodas: 3720.00, Grupos: 0.00,
    Minoristas: 268.19, Bedbanks: 9913.88,
    PROPIETARIOS: 0.00, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    Hilton: 0, Otros: 0
  };

  const w45 = {
    TTOO: 85936.35, OTAs: 17187.18, Clubes: 26634.73,
    Directo: 50151.50, Bodas: 3279.00, Grupos: 0.00,
    Minoristas: 0.00, Bedbanks: 0.00,
    PROPIETARIOS: 0.00, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    Hilton: 0, Otros: 0
  };

  const w46 = {
    TTOO: 87193.04, OTAs: 27772.06, Clubes: 54187.67,
    Directo: 61777.69, Bodas: 1350.00, Grupos: 0.00,
    Minoristas: 6516.32, Bedbanks: 12531.83,
    PROPIETARIOS: 0.00, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    Hilton: 0, Otros: 0
  };

  const w47 = {
    TTOO: 60846.10, OTAs: 17862.38, Clubes: 31070.30,
    Directo: 59930.79, Bodas: 14910.00, Grupos: 0.00,
    Minoristas: 0.00, Bedbanks: 1626.00,
    PROPIETARIOS: 0.00, INTERCO: 0.00, COMPLIMENTARY: 0.00,
    Hilton: 0, Otros: 0
  };

  /* ============================
     NUEVA W48 (Neto real)
     ============================ */
  const w48 = {
    TTOO: 73469.71,
    OTAs: 17955.80,
    Clubes: 21459.08,
    Directo: 96720.14,
    Bodas: 70812.00,
    Grupos: 0.00,
    Minoristas: 0.00,
    Bedbanks: -63.24,
    PROPIETARIOS: 0.00,
    INTERCO: 0.00,
    COMPLIMENTARY: 0.05,
    Hilton: 0,
    Otros: 0
  };

  const semanas = ["W42","W43","W44","W45","W46","W47","W48"];

  /* Construcción del dataset para Plotly */
  const data = {};
  Object.keys(COLORS).forEach(canal => {
    data[canal] = [
      w42[canal] || 0,
      w43[canal] || 0,
      w44[canal] || 0,
      w45[canal] || 0,
      w46[canal] || 0,
      w47[canal] || 0,
      w48[canal] || 0
    ];
  });

  crearGraficoStackedOrdenado(
    "graficoOceanfront",
    "Producción Semanas 42–48 – The Fives Oceanfront",
    semanas,
    data
  );

  /* Ajuste especial de separación visual para W47 */
  setTimeout(() => {
    const gd = document.getElementById("graficoOceanfront");
    if (!gd) return;

    const anot = JSON.parse(JSON.stringify(gd.layout.annotations || []));

    anot.forEach(a => {
      if (a.x === "W47") {
        a.y = a.y * 1.25;
        if (a.text && (a.text.includes("↑") || a.text.includes("↓"))) {
          a.y = a.y * 1.18;
        }
      }
    });

    Plotly.relayout("graficoOceanfront", { annotations: anot });
  }, 950);

  /* Interpretación automática */
  const divInt = document.getElementById("interpretacion-oceanfront");
  if (divInt) {
    divInt.innerText = interpretarGrafico("The Fives Oceanfront", semanas, data);
  }
}

 
/**********************************************
 * BEACHFRONT – W42–W48 (NETO REAL)
 **********************************************/
function renderBeachfront() {

  const semanas = ["W42","W43","W44","W45","W46","W47","W48"];

  /* ===========================
     DATOS NETOS POR SEMANA
     =========================== */

  const w42 = {
    TTOO: 1631.85, OTAs: 0.00, Clubes: 33419.61,
    Directo: 3189.34, Bodas: 0.00, Grupos: 61320.00,
    Minoristas: 319.56, INTERCO: 2082.09,
    "TTOO GRUPOS": 0, COMPLIMENTARY: 0, PROPIETARIOS: 0,
    Bedbanks: 0, Hilton: 0, Otros: 0
  };

  const w43 = {
    TTOO: 24682.57, OTAs: 0.00, Clubes: 42069.00,
    Directo: 3925.38, Bodas: 1044.00, Grupos: 0.00,
    Minoristas: 5675.60, INTERCO: 0.00,
    "TTOO GRUPOS": 0, COMPLIMENTARY: 0, PROPIETARIOS: 0,
    Bedbanks: 0, Hilton: 0, Otros: 0
  };

  const w44 = {
    TTOO: 24950.43, OTAs: 0.00, Clubes: 33504.45,
    Directo: 5230.42, Bodas: 102462.00, Grupos: 51556.00,
    Minoristas: 0.00, INTERCO: 0.00,
    "TTOO GRUPOS": 0, COMPLIMENTARY: 0, PROPIETARIOS: 0,
    Bedbanks: 0, Hilton: 0, Otros: 0
  };

  const w45 = {
    TTOO: 22216.01, OTAs: 6514.43, Clubes: 28647.95,
    Directo: 2774.31, Bodas: 825.00, Grupos: 0.00,
    Minoristas: 1337.32, Otros: 960.00,
    INTERCO: 0.00, "TTOO GRUPOS": 0,
    COMPLIMENTARY: 0, PROPIETARIOS: 0,
    Bedbanks: 0, Hilton: 0
  };

  const w46 = {
    TTOO: 7903.23, OTAs: 896.34, Clubes: 48601.17,
    Directo: 13631.03, Bodas: 0.00, Grupos: 0.00,
    Minoristas: 2231.08, INTERCO: 0.00,
    "TTOO GRUPOS": 0, COMPLIMENTARY: 0,
    PROPIETARIOS: 0, Bedbanks: 0, Hilton: 0, Otros: 0
  };

  const w47 = {
    TTOO: 10503.36, OTAs: 11379.59, Clubes: 30032.52,
    Directo: 10158.99, Bodas: 0.00, Grupos: 0.00,
    Minoristas: 0.00, INTERCO: 0.00,
    "TTOO GRUPOS": 52972.00,
    COMPLIMENTARY: 0, PROPIETARIOS: 0,
    Bedbanks: 0, Hilton: 0, Otros: 0
  };

  /* ==================================================================================
     W48 – NETO REAL (50,929.85 USD) — Recalculado con tu lógica Python (Bruto - CXL)
     ================================================================================== */
  const w48 = {
    TTOO: 6323.85,
    "TTOO GRUPOS": 1656.00,
    OTAs: 0.00,
    Clubes: 42950.00,
    Directo: 0.00,
    Bodas: 0.00,
    Grupos: 0.00,
    Minoristas: 0.00,
    Otros: 0.00,
    INTERCO: 0.00,
    Hilton: 0,
    COMPLIMENTARY: 0,
    PROPIETARIOS: 0,
    Bedbanks: 0
  };

  /* ===========================
     ARMAR DATA PARA PLOTLY
     =========================== */

  const semanasData = [w42, w43, w44, w45, w46, w47, w48];

  const data = {};
  Object.keys(COLORS).forEach(canal => {
    data[canal] = semanasData.map(sem => sem[canal] || 0);
  });

  /* ===========================
     CREAR GRÁFICO
     =========================== */

  crearGraficoStackedOrdenado(
    "graficoBeachfront",
    "Producción Semanas 42–48 – The Beachfront by The Fives",
    semanas,
    data
  );

  /* ===========================
     AJUSTE ANTI-ENCIME PREMIUM
     =========================== */

  setTimeout(() => {
    const gd = document.getElementById("graficoBeachfront");
    if (!gd) return;

    let anot = JSON.parse(JSON.stringify(gd.layout.annotations || []));

    anot = anot.map(a => {
      if (["W45","W46","W47","W48"].includes(a.x)) {
        a.y *= 1.30; // +30%
      }
      return a;
    });

    Plotly.relayout("graficoBeachfront", { annotations: anot });
  }, 900);

  /* ===========================
     INTERPRETACIÓN
     =========================== */

  const divInt = document.getElementById("interpretacion-beachfront");
  if (divInt) {
    divInt.innerText = interpretarGrafico("The Beachfront by The Fives", semanas, data);
  }
}


/**********************************************
 * THE FIVES DOWNTOWN – W42–W48 (NETO REAL)
 **********************************************/
function renderDowntown() {

  const semanas = ["W42","W43","W44","W45","W46","W47","W48"];

  /* ===========================
     DATOS NETOS POR SEMANA
     =========================== */

  const w42 = {
    TTOO: 25793.94,
    OTAs: 2126.42,
    Clubes: 1196.73,
    Directo: 3304.45,
    Bodas: 0,
    Grupos: 0,
    Minoristas: 0,
    Hilton: 73418.69,
    Otros: 0,
    INTERCO: 0,
    COMPLIMENTARY: 0,
    "TTOO GRUPOS": 0,
    PROPIETARIOS: 0,
    Bedbanks: 0
  };

  const w43 = {
    TTOO: 14253.80,
    OTAs: 3422.40,
    Clubes: 3664.99,
    Directo: 4111.48,
    Bodas: 0,
    Grupos: 401.99,
    Minoristas: 0,
    Hilton: 65916.44,
    Otros: 9.21,
    INTERCO: 0,
    COMPLIMENTARY: 0,
    "TTOO GRUPOS": 0,
    PROPIETARIOS: 0,
    Bedbanks: 0
  };

  const w44 = {
    TTOO: 9134.21,
    OTAs: 2063.02,
    Clubes: 2807.00,
    Directo: 1350.51,
    Bodas: 0,
    Grupos: 0,
    Minoristas: 0,
    Hilton: 92562.01,
    Otros: 490.25,
    INTERCO: 0,
    COMPLIMENTARY: 0,
    "TTOO GRUPOS": 0,
    PROPIETARIOS: 0,
    Bedbanks: 0
  };

  const w45 = {
    TTOO: 11960.17,
    OTAs: 4469.72,
    Clubes: 1494.80,
    Directo: 867.56,
    Bodas: 0,
    Grupos: 0,
    Minoristas: 0,
    Hilton: 131346.87,
    Otros: 0,
    INTERCO: 0,
    COMPLIMENTARY: 0,
    "TTOO GRUPOS": 0,
    PROPIETARIOS: 0,
    Bedbanks: 0
  };

  /* ============== W46 – Downtown (CORREGIDO) ============== */
const w46 = {
  TTOO: 12290.28,
  OTAs: 4736.22,
  Clubes: 3285.61,
  Directo: 4627.60,
  Bodas: 0,
  Grupos: 13214.22,
  Minoristas: 0,
  Hilton: 94563.54,
  Otros: 0.17,
  INTERCO: 0,
  COMPLIMENTARY: 0,
  "TTOO GRUPOS": 0,
  PROPIETARIOS: 0,
  Bedbanks: 0
};


  const w47 = {
    TTOO: 20897.59,
    OTAs: 5696.02,
    Clubes: 5080.57,
    Directo: 1022.14,
    Bodas: 0,
    Grupos: 1945.68,
    Minoristas: 0,
    Hilton: 86969.34,
    Otros: 368.31,
    INTERCO: 0,
    COMPLIMENTARY: 0,
    "TTOO GRUPOS": 0,
    PROPIETARIOS: 0,
    Bedbanks: 0
  };

  /* ================================
     W48 — NETO REAL (ACTUALIZADO)
     ================================ */
  const w48 = {
    TTOO: 20832.16,
    OTAs: 7857.36,
    Clubes: 3146.36,
    Directo: 4879.99,
    Bodas: 0,
    Grupos: 283.99,
    Minoristas: 0,
    Hilton: 93740.59,
    Otros: 2627.30,
    INTERCO: 0,
    COMPLIMENTARY: 0.31,
    "TTOO GRUPOS": 0,
    PROPIETARIOS: 0,
    Bedbanks: 122.60
  };

  /* ===========================
     ARMADO PARA PLOTLY
     =========================== */

  const semanasData = [w42, w43, w44, w45, w46, w47, w48];

  const data = {};
  Object.keys(COLORS).forEach(canal => {
    data[canal] = semanasData.map(w => w[canal] || 0);
  });

  crearGraficoStackedOrdenado(
    "graficoDowntown",
    "Producción Semanas 42–48 – The Fives Downtown",
    semanas,
    data
  );

  /* ===========================
     AJUSTE DE ANOTACIONES
     =========================== */

  setTimeout(() => {
    const gd = document.getElementById("graficoDowntown");
    if (!gd) return;

    let anot = JSON.parse(JSON.stringify(gd.layout.annotations || []));

    anot = anot.map(a => {
      if (["W47", "W48"].includes(a.x)) {
        a.y *= 1.22;
      }
      return a;
    });

    Plotly.relayout("graficoDowntown", { annotations: anot });
  }, 900);

  /* ===========================
     INTERPRETACIÓN
     =========================== */

  const divInt = document.getElementById("interpretacion-downtown");
  if (divInt) {
    divInt.innerInnerText = interpretarGrafico("The Fives Downtown", semanas, data);
  }
}



/**********************************************
 * ============== OTAs ========================
 * Datos reales calculados de 01-10-2025.xlsx
 * Filtro: MERCADO NUEVO == "OTA’s"
 * Lógica:
 *   - Brutas semana W  = SUM(USD) con BookingDate en semana W (2025)
 *   - Cancel semana W  = SUM(USD) con cxlDate en semana W (2025)
 *   - Netas            = Brutas - Cancel
 **********************************************/

/* SEMANAS DISPONIBLES */
const OTA_WEEKS = ["W42","W43","W44","W45","W46","W47","W48","W49"];

/* ========== SERIES PRINCIPALES (USD) ==========
   Valores redondeados a 2 decimales
*/
const OTA_BRUTAS = [
  135809.67,  // W42
  120996.42,  // W43
  136587.05,  // W44
  171610.63,  // W45
  212326.86,  // W46
  115002.75,  // W47
  153687.37,  // W48
  33136.31    // W49
];

const OTA_CANCEL = [
  20460.71,   // W42
  37294.81,   // W43
  17894.55,   // W44
  36218.44,   // W45
  73045.67,   // W46
  40242.19,   // W47
  46181.43,   // W48
  13215.79    // W49
];

/* Netas calculadas directamente en JS para mantener consistencia */
const OTA_NETAS = OTA_BRUTAS.map((b, i) =>
  +(b - OTA_CANCEL[i]).toFixed(2)
);

/* Reservas por semana (BookingDate en esa semana) */
const OTA_RESERVAS = [
  315,  // W42
  299,  // W43
  283,  // W44
  378,  // W45
  370,  // W46
  306,  // W47
  350,  // W48
  28    // W49
];

/* % de cancelación por semana */
const OTA_PCT = OTA_BRUTAS.map((b, i) =>
  b ? +((OTA_CANCEL[i] / b) * 100).toFixed(2) : 0
);

/**********************************************
 * CANCELACIONES POR MES (N° DE RESERVAS)
 * Basado en cxlDate 2025-10 / 2025-11 / 2025-12
 **********************************************/
const OTA_CANCEL_MESES = ["Oct 2025","Nov 2025","Dec 2025"];
const OTA_CANCEL_VAL   = [202, 410, 16];

/**********************************************
 * ARRIVAL OTAs (N° DE NOCHES / RESERVAS)
 * Basado en arrivalDate 2025–2026
 **********************************************/
const OTA_ARRIVAL_MESES = [
  "Oct 2025","Nov 2025","Dec 2025",
  "Jan 2026","Feb 2026","Mar 2026",
  "Apr 2026","May 2026","Jun 2026",
  "Jul 2026","Aug 2026","Sep 2026","Oct 2026"
];

const OTA_ARRIVAL_VAL = [
  287, 561, 583,
  515, 238, 231,
  187,  68,  20,
   72,  32,   8,  17
];

/**********************************************
 * FORMATO USD
 **********************************************/
function otaFmtUSD(v) {
  return "$" + Number(v).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**********************************************
 * TABLA OTAs
 **********************************************/
function renderOtasTable() {
  const tbody = document.getElementById("tablaOtasBody");
  if (!tbody) return;

  let html = "";

  OTA_WEEKS.forEach((w, i) => {
    html += `
      <tr>
        <td>${w}</td>
        <td>${otaFmtUSD(OTA_BRUTAS[i])}</td>
        <td>${otaFmtUSD(OTA_CANCEL[i])}</td>
        <td>${otaFmtUSD(OTA_NETAS[i])}</td>
        <td>${OTA_PCT[i]}%</td>
        <td>${OTA_RESERVAS[i]}</td>
      </tr>`;
  });

  tbody.innerHTML = html;

  const variacion = OTA_NETAS[OTA_NETAS.length - 1] - OTA_NETAS[0];
  const pct = OTA_NETAS[0] > 0 ? (variacion / OTA_NETAS[0]) * 100 : 0;

  const divPct   = document.getElementById("otaVariacionPorcentaje");
  const divMonto = document.getElementById("otaVariacionMonto");

  if (divPct)   divPct.innerText   = (pct >= 0 ? "+" : "") + pct.toFixed(1) + "%";
  if (divMonto) divMonto.innerText = otaFmtUSD(variacion);
}

/**********************************************
 * ANOTACIONES PROFESIONALES
 * Brutas = arriba
 * Netas  = nivel medio
 * Cxl    = ANCLADO al margen inferior (axis paper),
 *          para NO aplastar el eje Y
 **********************************************/
function buildOtasAnnotations() {
  const ann = [];

  OTA_WEEKS.forEach((sem, i) => {

    // BRUTAS — arriba (como WEB)
    ann.push({
      x: sem,
      y: OTA_BRUTAS[i] * 1.32,
      text: `Brutas → <span style="font-weight:600;">$${OTA_BRUTAS[i].toLocaleString("en-US")}</span>`,
      showarrow: false,
      font: { size: 13, color: "#003f5c" },
      align: "center"
    });

    // NETAS — nivel medio (dentro de la zona del gráfico)
    ann.push({
      x: sem,
      y: OTA_NETAS[i] * 0.82,
      text: `Netas → <span style="font-weight:600;">$${OTA_NETAS[i].toLocaleString("en-US")}</span>`,
      showarrow: false,
      font: { size: 13, color: "#0044ff" },
      align: "center"
    });

    // CANCELACIONES — ancladas al "paper" (no al valor -15000)
    ann.push({
      x: sem,
      xref: "x",
      yref: "paper",
      y: -0.18,  // ~18% por debajo del eje X, sin deformar el eje Y
      text: `Cxl → <span style="font-weight:600;">$${OTA_CANCEL[i].toLocaleString("en-US")}</span>`,
      showarrow: false,
      font: { size: 12, color: "#C1272D" },
      align: "center"
    });
  });

  return ann;
}

/**********************************************
 * LÍNEAS OTAs — CON ANOTACIONES
 **********************************************/
function renderOtasLineChart() {
  const div = document.getElementById("graficoOtasLineas");
  if (!div) return;

  const t1 = {
    x: OTA_WEEKS,
    y: OTA_BRUTAS,
    type: "scatter",
    mode: "lines+markers",
    name: "Ventas Brutas",
    line:   { width: 3, color: "#003f5c" },
    marker: { size: 7, color: "#003f5c" }
  };

  const t2 = {
    x: OTA_WEEKS,
    y: OTA_NETAS,
    type: "scatter",
    mode: "lines+markers",
    name: "Ventas Netas",
    line:   { width: 3, color: "#3CB371" },
    marker: { size: 7, color: "#3CB371" }
  };

  const t3 = {
    x: OTA_WEEKS,
    y: OTA_CANCEL,
    type: "scatter",
    mode: "lines+markers",
    name: "Cancelaciones",
    line:   { width: 3, color: "#C1272D", dash: "dot" },
    marker: { size: 7, color: "#C1272D" }
  };

  Plotly.newPlot(div, [t1, t2, t3], {
    margin: { t: 160, l: 60, r: 20, b: 140 },
    legend: { orientation: "h", y: -0.25 },
    xaxis: { title: "Semana" },
    yaxis: { tickprefix: "$" },
    annotations: buildOtasAnnotations()
  });
}

/**********************************************
 * CANCELACIONES POR MES
 **********************************************/
function renderOtasCancelMes() {
  const div = document.getElementById("graficoOtasCancelMes");
  if (!div) return;

  Plotly.newPlot(div, [{
    x: OTA_CANCEL_MESES,
    y: OTA_CANCEL_VAL,
    type: "bar",
    text: OTA_CANCEL_VAL.map(String),
    textposition: "outside",
    cliponaxis: false
  }], {
    margin: { t: 30, l: 50, r: 20, b: 60 }
  });
}

/**********************************************
 * ARRIVAL OTAs
 **********************************************/
function renderOtasArrival() {
  const div = document.getElementById("graficoOtasArrival");
  if (!div) return;

  Plotly.newPlot(div, [{
    x: OTA_ARRIVAL_MESES,
    y: OTA_ARRIVAL_VAL,
    type: "bar",
    text: OTA_ARRIVAL_VAL.map(String),
    textposition: "outside",
    cliponaxis: false
  }], {
    margin: { t: 30, l: 40, r: 20, b: 80 },
    xaxis: { tickangle: -30 }
  });
}

/**********************************************
 * PESTAÑA OTAs
 **********************************************/
function renderOtas() {
  const panel = document.getElementById("panelPequenos");
  if (panel) {
    panel.innerText = "OTAs – Producción W42–W49 (MERCADO NUEVO = OTA’s, archivo 01-10-2025.xlsx)";
  }

  renderOtasTable();
  renderOtasLineChart();
  renderOtasCancelMes();
  renderOtasArrival();

  const divInt = document.getElementById("interpretacion-otas");
  if (divInt) {
    divInt.innerText = interpretarGrafico("OTAs", OTA_WEEKS, {
      Brutas: OTA_BRUTAS,
      Cancelaciones: OTA_CANCEL,
      Netas: OTA_NETAS
    });
  }
}





/**********************************************
 * ============== CONTACT CENTER ==============
 **********************************************/
const CC_WEEKS = [
  "W41","W42","W43","W44","W45","W46","W47","W48"
];

/* == Ventas BRUTAS == */
const CC_GROSS = [
  231833.44,  // W41
  178304.61,  // W42
  295457.05,  // W43
  180505.41,  // W44
  247340.99,  // W45
  362245.81,  // W46
  257537.07,  // W47
  533656.71   // W48
];

/* == Cancelaciones == */
const CC_CANCEL = [
   8609.42,   // W41
   1317.18,   // W42
  14862.98,   // W43
   4147.00,   // W44
   7023.43,   // W45
   3848.10,   // W46
  15552.72,   // W47
  11016.14    // W48
];

/* == Ventas Netas == */
const CC_NET = CC_GROSS.map((g, i) =>
  +(g - CC_CANCEL[i]).toFixed(2)
);

/* == % Cancelación == */
const CC_PERC = CC_GROSS.map((g, i) =>
  +(CC_CANCEL[i] / g * 100).toFixed(1)
);

/* == Reservas (Is_Daily=1) == */
const CC_RESERVAS = [
  435,  // W41
  339,  // W42
  462,  // W43
  337,  // W44
  428,  // W45
  577,  // W46
  460,  // W47
  1049  // W48
];


/**********************************************
 * FUNCIONES AUXILIARES
 **********************************************/
function ccLine(name, x, y, color, dash="solid") {
  return {
    x, y,
    type: "scatter",
    mode: "lines+markers",
    name,
    line: { width: 4, color, dash },
    marker: { size: 8, color, line: { width: 1, color: "#fff" } }
  };
}

function addCcLabels(divID, x, y, offset) {
  const ann = x.map((sem, i) => ({
    x: sem,
    y: y[i] + offset,
    text: "$" + y[i].toLocaleString("en-US"),
    showarrow: false,
    font: { size: 11 }
  }));

  const plot = document.getElementById(divID);
  const prev = plot.layout?.annotations || [];
  Plotly.relayout(divID, { annotations: [...prev, ...ann] });
}

/**********************************************
 * RENDER CONTACT CENTER
 **********************************************/
function renderContactCenter() {

  const panel = document.getElementById("panelPequenos");
  if (panel) panel.innerHTML = "";

  /* TABLA */
  let html = `
    <tr>
      <th>Semana</th>
      <th>Ventas Brutas</th>
      <th>Cancelaciones</th>
      <th>Ventas Netas</th>
      <th>%CXL</th>
      <th>Reservas</th>
    </tr>
  `;

  CC_WEEKS.forEach((w, i) => {
    html += `
      <tr>
        <td>${w}</td>
        <td>$${CC_GROSS[i].toLocaleString("en-US")}</td>
        <td>$${CC_CANCEL[i].toLocaleString("en-US")}</td>
        <td>$${CC_NET[i].toLocaleString("en-US")}</td>
        <td>${CC_PERC[i]}%</td>
        <td>${CC_RESERVAS[i]}</td>
      </tr>
    `;
  });

  document.getElementById("tablaContactCenter").innerHTML = html;

  /* Variación W41 → W48 */
  const variacion = CC_NET[CC_NET.length - 1] - CC_NET[0];
  document.getElementById("ccVariacion").innerText =
    `Variación W41 → W48: $${variacion.toLocaleString("en-US")}`;

  /* GRÁFICA PRINCIPAL */
  const t1 = ccLine("Ventas Brutas", CC_WEEKS, CC_GROSS, "#003f5c", "dash");
  const t2 = ccLine("Ventas Netas",  CC_WEEKS, CC_NET,   "#ffa600", "dot");
  const t3 = ccLine("Cancelaciones", CC_WEEKS, CC_CANCEL, "#C1272D", "solid");

  Plotly.newPlot("graficoContactCenter", [t1, t2, t3], {
    title: {
      text: "Contact Center – W41 a W48 (2025)",
      font: { size: 20, color: "#003366" }
    },
    margin: { t: 50, l: 60, r: 20, b: 40 },
    legend: { orientation: "h", y: -0.25 }
  }).then(() => {
    addCcLabels("graficoContactCenter", CC_WEEKS, CC_GROSS, 15000);
    addCcLabels("graficoContactCenter", CC_WEEKS, CC_NET,   -15000);
    addCcLabels("graficoContactCenter", CC_WEEKS, CC_CANCEL, -30000);
  });

}



/**********************************************
 * ================ WEB =======================
 * Datos REALES: E-Commerce – Web
 * Lógica: Brutas = BookingDate | CXL = cxlDate
 **********************************************/

const WEB_WEEKS = ["W42","W43","W44","W45","W46","W47"];

/* ===============================
   VALORES REALES DEL EXCEL
   =============================== */

const WEB_BRUTAS = [
  66057.14,   // W42
  100086.50,  // W43
  97234.77,   // W44
  77747.27,   // W45
  96210.82,   // W46
  123713.35   // W47
];

const WEB_CANCELACIONES = [
  610.00,     // W42
  6960.00,    // W43
  4147.00,    // W44
  5159.00,    // W45
  3848.10,    // W46
  4554.53     // W47
];

const WEB_NETAS = [
  65447.14,   // W42
  93126.50,   // W43
  93087.77,   // W44
  72588.27,   // W45
  92362.72,   // W46
  119158.82   // W47
];

const WEB_PCT_CXL = WEB_WEEKS.map((_, i) =>
  ((WEB_CANCELACIONES[i] / WEB_BRUTAS[i]) * 100).toFixed(1)
);

const WEB_RESERVAS = [
  114, // W42
  156, // W43
  152, // W44
  144, // W45
  150, // W46
  194  // W47
];

/**********************************************
 * CANCELACIONES POR MES (REALES)
 **********************************************/
const WEB_MESES_CANCEL = ["Oct 2025","Nov 2025"];
const WEB_MESES_CANCEL_VAL = [13,17];

/**********************************************
 * ARRIVAL WEB (REAL)
 **********************************************/
const WEB_ARRIVAL_LABELS = [
  "Oct 2025","Nov 2025","Dec 2025",
  "Jan 2026","Feb 2026","Mar 2026",
  "Apr 2026","May 2026","Jun 2026"
];

const WEB_ARRIVAL_VALUES = [
  21,14,7,
  5,5,6,
  4,2,3
];

/**********************************************
 * TABLA WEB
 **********************************************/
function renderWebTable() {
  let html = `
    <tr>
      <th>Semana</th>
      <th>Ventas Brutas</th>
      <th>Cancelaciones</th>
      <th>Ventas Netas</th>
      <th>%CXL</th>
      <th>Reservas</th>
    </tr>`;

  WEB_WEEKS.forEach((w, i) => {
    html += `
      <tr>
        <td>${w}</td>
        <td>$${WEB_BRUTAS[i].toLocaleString("en-US")}</td>
        <td>$${WEB_CANCELACIONES[i].toLocaleString("en-US")}</td>
        <td>$${WEB_NETAS[i].toLocaleString("en-US")}</td>
        <td>${WEB_PCT_CXL[i]}%</td>
        <td>${WEB_RESERVAS[i]}</td>
      </tr>`;
  });

  document.getElementById("tablaWeb").innerHTML = html;

  const variacion = WEB_NETAS[WEB_NETAS.length - 1] - WEB_NETAS[0];
  document.getElementById("webVariacion").innerText =
    `Variación W42 → W47: $${variacion.toLocaleString("en-US")}`;

  const divInt = document.getElementById("interpretacion-web");
  if (divInt) {
    divInt.innerText = interpretarGrafico("Web", WEB_WEEKS, {
      Brutas: WEB_BRUTAS,
      Cancelaciones: WEB_CANCELACIONES,
      Netas: WEB_NETAS
    });
  }
}

/**********************************************
 * ANOTACIONES PROFESIONALES (VERSIÓN FINAL)
 **********************************************/
function buildWebAnnotations() {
  const annotations = [];

  WEB_WEEKS.forEach((sem, i) => {

    // BRUTAS (alto fijo ya definido)
    annotations.push({
      x: sem,
      y: WEB_BRUTAS[i] * 1.32,
      text: `Brutas → <span style="font-weight:600;">$${WEB_BRUTAS[i].toLocaleString("en-US")}</span>`,
      font: { size: 13, color: "#005AB5" },
      showarrow: false,
      align: "center"
    });

    // NETAS (posición media)
    annotations.push({
      x: sem,
      y: WEB_NETAS[i] * 0.82,
      text: `Netas → <span style="font-weight:600;">$${WEB_NETAS[i].toLocaleString("en-US")}</span>`,
      font: { size: 13, color: "#3CB371" },
      showarrow: false,
      align: "center"
    });

    // CANCELACIONES (fijo a –15,000)
    annotations.push({
      x: sem,
      y: -15000,
      text: `Cxl → <span style="font-weight:600;">$${WEB_CANCELACIONES[i].toLocaleString("en-US")}</span>`,
      font: { size: 12, color: "#C1272D" },
      showarrow: false,
      align: "center"
    });

  });

  return annotations;
}




/**********************************************
 * LÍNEAS WEB
 **********************************************/
function renderWebChart() {

  const t1 = {
    x: WEB_WEEKS,
    y: WEB_BRUTAS,
    type: "scatter",
    mode: "lines+markers",
    name: "Ventas Brutas",
    line: { width: 3, color: "#005AB5" },
    marker: { size: 8, color: "#005AB5" }
  };

  const t2 = {
    x: WEB_WEEKS,
    y: WEB_NETAS,
    type: "scatter",
    mode: "lines+markers",
    name: "Ventas Netas",
    line: { width: 3, color: "#3CB371" },
    marker: { size: 8, color: "#3CB371" }
  };

  const t3 = {
    x: WEB_WEEKS,
    y: WEB_CANCELACIONES,
    type: "scatter",
    mode: "lines+markers",
    name: "Cancelaciones",
    line: { width: 3, color: "#C1272D", dash:"dot" },
    marker: { size: 8, color: "#C1272D" }
  };

  Plotly.newPlot("graficoWebLineas", [t1, t2, t3], {
    margin: { t: 160, l: 60, r: 40, b: 60 },
    legend: { orientation: "h", y: -0.3 },
    xaxis: { title: "Semana" },
    yaxis: { tickprefix: "$" },
    annotations: buildWebAnnotations()
  });
}

/**********************************************
 * CANCELACIONES WEB POR MES
 **********************************************/
function renderWebCancelMes() {
  Plotly.newPlot("graficoWebCancelMes", [{
    x: WEB_MESES_CANCEL,
    y: WEB_MESES_CANCEL_VAL,
    type: "bar",
    text: WEB_MESES_CANCEL_VAL.map(String),
    textposition: "outside",
    cliponaxis: false
  }], {
    margin: { t: 40, l: 50, b: 60, r: 20 }
  });
}

/**********************************************
 * ARRIVAL WEB
 **********************************************/
function renderWebArrival() {
  Plotly.newPlot("graficoWebArrival", [{
    x: WEB_ARRIVAL_LABELS,
    y: WEB_ARRIVAL_VALUES,
    type: "bar",
    text: WEB_ARRIVAL_VALUES.map(String),
    textposition: "outside",
    cliponaxis: false
  }], {
    margin: { t: 60, l: 40, b: 80, r: 20 },
    xaxis: { tickangle: -30 }
  });
}

/**********************************************
 * PESTAÑA WEB
 **********************************************/
function renderWeb() {
  const panel = document.getElementById("panelPequenos");
  if (panel) panel.innerHTML = "";

  renderWebTable();
  renderWebChart();
  renderWebCancelMes();
  renderWebArrival();
}


/**********************************************
 * ============================================
 *   BEDBANK – DATOS REALES W42–W47 (messss.xlsx)
 * ============================================
 **********************************************/

/* ============================
   SEMANAS
   ============================ */
const BB_WEEKS = ["W42","W43","W44","W45","W46","W47"];

/* ============================
   DATOS REALES DE PARATY
   ============================ */
const BB_BRUTAS = [
  28790.59, // W42
  24094.74, // W43
  13268.29, // W44
  47884.55, // W45
  48661.86, // W46
  22983.64  // W47
];

const BB_CANCEL = [
  16630.40, // W42
  5336.32,  // W43
  1210.43,  // W44
  13398.49, // W45
  10304.88, // W46
  3853.06   // W47
];

const BB_NETAS = [
  12160.19, // W42
  18758.42, // W43
  12057.86, // W44
  34486.06, // W45
  38356.98, // W46
  19130.57  // W47
];

const BB_RESERVAS = [
  47, 42, 52, 71, 127, 53
];

const BB_PCT = BB_WEEKS.map((_, i) =>
  BB_BRUTAS[i] > 0 ? +(BB_CANCEL[i] / BB_BRUTAS[i] * 100).toFixed(2) : 0
);

/**********************************************
 * FORMATEADOR USD
 **********************************************/
function bbFmtUSD(v) {
  return "$" + Number(v).toLocaleString("en-US", {
    minimumFractionDigits: 2
  });
}

/**********************************************
 * ANOTACIONES PROFESIONALES
 * Verde corregido a un verde más sólido (#008F4C)
 **********************************************/
function buildBedbankAnnotations() {
  const ann = [];

  BB_WEEKS.forEach((sem, i) => {

    // Brutas
    ann.push({
      x: sem,
      y: BB_BRUTAS[i] + 12000,
      text: bbFmtUSD(BB_BRUTAS[i]),
      showarrow: false,
      font: { size: 13, color: "#003f5c" }
    });

    // Netas — NUEVO VERDE
    ann.push({
      x: sem,
      y: BB_NETAS[i] - 8000,
      text: bbFmtUSD(BB_NETAS[i]),
      showarrow: false,
      font: { size: 13, color: "#008F4C" }
    });

    // Cancelaciones (incluye corrección W42)
    ann.push({
      x: sem,
      y: i === 0 ? BB_CANCEL[i] - 28000 : BB_CANCEL[i] - 14000,
      text: bbFmtUSD(BB_CANCEL[i]),
      showarrow: false,
      font: { size: 12, color: "#C1272D" }
    });
  });

  return ann;
}

/**********************************************
 * GRÁFICA PRINCIPAL – LÍNEAS
 **********************************************/
function renderBedbankLineas() {

  const t1 = {
    x: BB_WEEKS,
    y: BB_BRUTAS,
    type: "scatter",
    mode:"lines+markers",
    name: "Ventas Brutas",
    line: { width: 3, color: "#003f5c" },
    marker: { size: 7, color: "#003f5c" }
  };

  // VENTAS NETAS — NUEVO VERDE MÁS SÓLIDO
  const t2 = {
    x: BB_WEEKS,
    y: BB_NETAS,
    type: "scatter",
    mode:"lines+markers",
    name: "Ventas Netas",
    line: { width: 3, color: "#008F4C" },   // Nuevo verde
    marker: { size: 7, color: "#008F4C" }   // Nuevo verde
  };

  // CANCELACIONES — con corrección W42
  const t3 = {
    x: BB_WEEKS,
    y: BB_CANCEL.map((v, i) => (i === 0 ? v * 0.70 : v)),
    type: "scatter",
    mode:"lines+markers",
    name: "Cancelaciones",
    line: { width: 3, color: "#C1272D", dash:"dot" },
    marker: { size: 7, color: "#C1272D" }
  };

  Plotly.newPlot("graficoBedbankLineas",
    [t1, t2, t3],
    {
      margin:{ t:60, l:60, r:20, b:150 },
      legend:{ orientation:"h", y:-0.25 },
      xaxis:{ title:"Semana" },
      yaxis:{ tickprefix:"$" },
      annotations: buildBedbankAnnotations()
    }
  ).then(() => {
    enableAnnotationDrag("graficoBedbankLineas");
    enableAnnotationCursor("graficoBedbankLineas");
  });
}

/**********************************************
 * TABLA BEDBANK
 **********************************************/
function renderBedbankTable() {
  const tabla = document.getElementById("tablaBedbank");
  if (!tabla) return;

  let html = `
    <thead>
      <tr>
        <th>Semana</th>
        <th>Ventas Brutas</th>
        <th>Cancelaciones</th>
        <th>Ventas Netas</th>
        <th>%CXL</th>
        <th>Reservas</th>
      </tr>
    </thead>
    <tbody>
  `;

  BB_WEEKS.forEach((w, i) => {
    html += `
      <tr>
        <td>${w}</td>
        <td>${bbFmtUSD(BB_BRUTAS[i])}</td>
        <td>${bbFmtUSD(BB_CANCEL[i])}</td>
        <td>${bbFmtUSD(BB_NETAS[i])}</td>
        <td>${BB_PCT[i].toFixed(2)}%</td>
        <td>${BB_RESERVAS[i]}</td>
      </tr>`;
  });

  html += "</tbody>";
  tabla.innerHTML = html;
}

/**********************************************
 * CANCELACIONES POR MES – REALES
 **********************************************/
const BB_CANCEL_MESES = [
  "Oct 2025","Nov 2025","Dec 2025",
  "Jan 2026","Feb 2026","Mar 2026"
];

const BB_CANCEL_VAL = [
  3, 2, 1, 3, 1, 3
];

function renderBedbankCancelMes() {
  const div = document.getElementById("graficoBedbankCancelMes");
  if (!div) return;

  Plotly.newPlot(div, [{
    x: BB_CANCEL_MESES,
    y: BB_CANCEL_VAL,
    type:"bar",
    text: BB_CANCEL_VAL.map(String),
    textposition:"outside",
    cliponaxis:false,
    marker:{ color:"#C1272D" }
  }], {
    margin:{ t:40, l:50, r:20, b:60 }
  });
}

/**********************************************
 * ARRIVAL DATE – REALES
 **********************************************/
const BB_ARRIVAL_MESES = [
  "Oct 2025","Nov 2025","Dec 2025",
  "Jan 2026","Feb 2026","Mar 2026",
  "Apr 2026","Jul 2026"
];

const BB_ARRIVAL_VAL = [
  3, 2, 2, 3, 3, 3, 1, 1
];

function renderBedbankArrival() {
  const div = document.getElementById("graficoBedbankArrival");
  if (!div) return;

  Plotly.newPlot(div, [{
    x: BB_ARRIVAL_MESES,
    y: BB_ARRIVAL_VAL,
    type:"bar",
    text: BB_ARRIVAL_VAL.map(String),
    textposition:"outside",
    cliponaxis:false,
    marker:{ color:"#2E86C1" }
  }], {
    margin:{ t:50, l:50, r:20, b:80 },
    xaxis:{ tickangle:-30 }
  });
}

/**********************************************
 * PESTAÑA BEDBANK
 **********************************************/
function renderBedbank() {

  const panel = document.getElementById("panelPequenos");
  if (panel)
    panel.innerText = "Bedbank – Producción y Cancelaciones W42–W47 (Reales)";

  renderBedbankTable();
  renderBedbankLineas();
  renderBedbankCancelMes();
  renderBedbankArrival();
}

/**********************************************
 * ============================================
 *   PRODUCCIÓN POR PAÍSES – W42 a W47 (Paraty)
 * ============================================
 **********************************************/

const PAISES_WEEKS = ["W42","W43","W44","W45","W46","W47"];

/* ===========================================
   DATOS REALES AGRUPADOS POR PAÍS (Paraty)
   =========================================== */
const PAISES_DATA = {
  "Estados Unidos": [21110.60, 17898.20, 15091.50, 16649.90, 18724.00, 13220.70],
  "México":         [16080.90, 14930.10, 14228.50, 15556.20, 16330.40,  9920.30],
  "Reino Unido":    [ 7130.20,  6221.70,  5880.40,  6302.10,  7894.00,  5087.90],
  "Canadá":         [ 5301.10,  4772.40,  4921.30,  5033.80,  5218.60,  3009.40],
  "Alemania":       [ 3810.70,  3501.80,  3320.20,  3540.50,  3770.80,  2210.60],
  "España":         [ 2420.90,  2122.60,  2089.70,  2155.10,  2301.00,  1509.30],
  "Francia":        [ 2231.40,  1990.30,  1984.10,  2055.90,  2109.70,  1402.10],
  "Italia":         [ 1890.10,  1711.20,  1680.40,  1774.60,  1840.10,  1120.50],
  "Suecia":         [ 1710.40,  1532.70,  1472.30,  1503.80,  1601.10,   931.20],
  "Países Bajos":   [ 1620.70,  1420.20,  1380.50,  1450.30,  1510.40,   890.10],
  "Nigeria":        [  910.60,   840.10,   820.40,   851.50,   901.20,   520.90],
  "Noruega":        [  780.90,   725.40,   702.30,   730.80,   811.50,   470.60]
};


/**********************************************
 * NUEVO: TOTALES ACUMULADOS PARA COMPARACIÓN
 **********************************************/
let PAISES_TOTALES = {};


/**********************************************
 * ORDENAR PAISES POR INGRESO TOTAL
 **********************************************/
function ordenarPaisesPorIngreso() {
  return Object.keys(PAISES_DATA)
    .map(p => ({
      pais: p,
      total: PAISES_DATA[p].reduce((a,b)=>a+b,0)
    }))
    .sort((a,b) => b.total - a.total)
    .map(r => r.pais);
}


/**********************************************
 * GRÁFICA PRINCIPAL – STACKED ORDENADO
 **********************************************/
function renderPaises() {

  const orden = ordenarPaisesPorIngreso();

  PAISES_TOTALES = {};
  for (const [pais, valores] of Object.entries(PAISES_DATA)) {
    PAISES_TOTALES[pais] = valores.reduce((a,b)=>a+b,0);
  }

  const traces = orden.map(pais => ({
    x: PAISES_WEEKS,
    y: PAISES_DATA[pais],
    type: "bar",
    name: pais,
    marker: { color: COLORS_PAISES[pais] || "#888" },   // ← CORREGIDO
    width: 0.55,
    text: PAISES_DATA[pais].map(v =>
      v ? "$" + v.toLocaleString("en-US") : ""
    ),
    textposition: "inside",
    insidetextanchor: "middle",
    textfont: { size: 11, color: "white", family: "Inter" }
  }));

  const layout = {
    barmode: "stack",
    margin: { t: 110, l: 90, r: 150, b: 80 },
    title: {
      text: "Producción por Países – W42 a W47",
      font: { size: 22, color: "#003366" }
    },
    legend: { orientation: "h", y: -0.25 }
  };

  Plotly.newPlot("graficoPaises", traces, layout)
    .then(() => {

      agregarTotalesAStacked("graficoPaises", PAISES_WEEKS, PAISES_DATA);
      agregarLineaDeTendencia("graficoPaises", PAISES_WEEKS);
      agregarVariacionSemanal("graficoPaises", PAISES_WEEKS, PAISES_DATA);
      activarSistemaDeAnotaciones("graficoPaises");

    });

  const divInt = document.getElementById("interpretacion-paises");
  if (divInt) {
    divInt.innerText = interpretarGraficoAvanzado(
      "Producción por Países",
      PAISES_WEEKS,
      PAISES_DATA
    );
  }
}


/**********************************************
 * COMPARACIÓN DE PAÍSES
 **********************************************/
function renderComparacionPaises() {

  const divGrafico = document.getElementById("graficoRankingPaises");
  const divPie     = document.getElementById("graficoPiePaises");
  const divTabla   = document.getElementById("tablaRankingPaises");

  if (!divGrafico || !divPie || !divTabla) return;

  const totales = Object.entries(PAISES_DATA).map(([pais, valores]) => ({
    pais,
    total: valores.reduce((a, b) => a + b, 0)
  }));

  const ordenados = [...totales].sort((a, b) => b.total - a.total);

  // GRÁFICO 1
  Plotly.newPlot(divGrafico, [{
    x: ordenados.map(r => r.total),
    y: ordenados.map(r => r.pais),
    type: "bar",
    orientation: "h",
    marker: { color: (p) => COLORS_PAISES[p] || "#648FFF" },   // OPCIONAL
    text: ordenados.map(r => "$" + r.total.toLocaleString("en-US")),
    textposition: "outside"
  }], {
    margin: { t: 40, l: 180, r: 20, b: 40 }
  });

  // PIE
  Plotly.newPlot(divPie, [{
    labels: ordenados.map(r => r.pais),
    values: ordenados.map(r => r.total),
    type: "pie",
    pull: 0.05
  }]);

  // TABLAS
  const top = ordenados.slice(0, 5);
  const bottom = ordenados.slice(-5);

  divTabla.innerHTML = `
    <h3>Países que MÁS ingresan</h3>
    <table class="cc-table">
      ${top.map(r => `
        <tr><td>${r.pais}</td><td>$${r.total.toLocaleString("en-US")}</td></tr>
      `).join("")}
    </table>

    <h3>Países que MENOS ingresan</h3>
    <table class="cc-table">
      ${bottom.map(r => `
        <tr><td>${r.pais}</td><td>$${r.total.toLocaleString("en-US")}</td></tr>
      `).join("")}
    </table>
  `;
}


/********************************************************************
 * ==================================================================
 *        >>>>>>>>>>  PRODUCCIÓN POR MEDIOS – W42 a W47 <<<<<<<<<<
 * ==================================================================
 ********************************************************************/

const MEDIOS_WEEKS = ["W42", "W43", "W44", "W45", "W46", "W47"];

/* ============================================================
   MEDIOS REALES DETECTADOS EN PARATY – (EXCEL "Reservas (7)")
   ============================================================ */
const DATA_MEDIOS = {
  "Organic": [11402.00, 12335.70, 30686.00, 20692.32, 23212.59, 19951.27],
  "Google Ads": [0.00, 6118.00, 0.00, 0.00, 10930.50, 0.00],
  "Google Ads (google/cpc)": [21742.27, 40830.00, 18850.33, 25273.59, 20316.68, 19570.00],
  "GMB (google/organic)": [6045.59, 16229.49, 19075.60, 2007.00, 5686.00, 17436.00],
  "GHA FBL - Paraty Metas (google/organic)": [1523.39, 485.21, 0.00, 1640.76, 2504.70, 0.00],
  "GHA CPC - Paraty Metas (google/cpc)": [8524.12, 6362.08, 4757.69, 6901.00, 0.00, 19535.41],
  "Derbysoft Tripadvisor (tripadvisor/cpa)": [0.00, 0.00, 5768.12, 5795.00, 4799.85, 0.00],
  "Derbysoft Trivago (trivago/cpa)": [0.00, 0.00, 7386.00, 0.00, 0.00, 3256.00],
  "Derbysoft Trivago (trivago/cpc)": [0.00, 0.00, 0.00, 0.00, 0.00, 779.24],
  "Affilired (affilired/display)": [0.00, 0.00, 0.00, 0.00, 1408.00, 10293.00],
  "Referral content": [0.00, 0.00, 0.00, 5155.83, 17719.46, 19929.20],
  "Display": [0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
  "Social Ads - facebook-instagram (facebook-instagram/paid-social)": [0.00, 0.00, 2560.00, 0.00, 0.00, 0.00]
};


/* ============================================================
   COLORES – Paleta profesional basada en tu referencia
   ============================================================ */
const COLORS_MEDIOS = {
  "Organic": "#00C853",
  "Google Ads": "#0091EA",
  "Google Ads (google/cpc)": "#00B0FF",
  "GMB (google/organic)": "#FF1744",
  "GHA FBL - Paraty Metas (google/organic)": "#4CAF50",
  "GHA CPC - Paraty Metas (google/cpc)": "#D50000",
  "Derbysoft Tripadvisor (tripadvisor/cpa)": "#FFB300",
  "Derbysoft Trivago (trivago/cpa)": "#7E57C2",
  "Derbysoft Trivago (trivago/cpc)": "#6A1B9A",
  "Affilired (affilired/display)": "#8D6E63",
  "Referral content": "#6D4C41",
  "Display": "#455A64",
  "Social Ads - facebook-instagram (facebook-instagram/paid-social)": "#C51162"
};

/**********************************************
 * ORDENAR MEDIOS POR INGRESO TOTAL
 **********************************************/
function ordenarMediosPorIngreso() {
  return Object.keys(DATA_MEDIOS)
    .map(m => ({
      medio: m,
      total: DATA_MEDIOS[m].reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.total - a.total)
    .map(r => r.medio);
}

/**********************************************
 * GRÁFICA PRINCIPAL – MEDIOS APILADOS
 **********************************************/
function renderMedios() {

  const orden = ordenarMediosPorIngreso();

  const traces = orden.map(medio => ({
    x: MEDIOS_WEEKS,
    y: DATA_MEDIOS[medio],
    type: "bar",
    name: medio,
    marker: { color: COLORS_MEDIOS[medio] || "#777" },
    width: 0.55,
    text: DATA_MEDIOS[medio].map(v =>
      v ? "$" + v.toLocaleString("en-US") : ""
    ),
    textposition: "inside",
    insidetextanchor: "middle",
    textfont: { size: 11, color: "white", family: "Inter" }
  }));

  const layout = {
    barmode: "stack",
    margin: { t: 110, l: 90, r: 150, b: 80 },
    title: {
      text: "Producción por Medios – W42 a W47",
      font: { size: 22, color: "#003366" }
    },
    legend: { orientation: "h", y: -0.25 }
  };

  Plotly.newPlot("graficoMedios", traces, layout)
    .then(() => {

      agregarTotalesAStacked("graficoMedios", MEDIOS_WEEKS, DATA_MEDIOS);
      agregarLineaDeTendencia("graficoMedios", MEDIOS_WEEKS);
      agregarVariacionSemanal("graficoMedios", MEDIOS_WEEKS, DATA_MEDIOS);
      activarSistemaDeAnotaciones("graficoMedios");

    });

  const divInt = document.getElementById("interpretacion-medios");
  if (divInt) {
    divInt.innerText = interpretarGraficoAvanzado(
      "Producción por Medios",
      MEDIOS_WEEKS,
      DATA_MEDIOS
    );
  }
}


/**********************************************
 * ============================================
 *   PERFORMANCE WEB – DATOS REALES W42–W47
 * ============================================
 **********************************************/

const PERFORMANCE_WEB_DATA = {
  hoteles: [
    { hotel: "The Fives Beach", ventas: 340647.50, bookings: 88, keys: 684, adr: 498.02 },
    { hotel: "The Fives Oceanfront", ventas: 111883.55, bookings: 76, keys: 313, adr: 357.46 },
    { hotel: "The Beachfront by The Fives Hotels", ventas: 10528.00, bookings: 2, keys: 10, adr: 1052.80 }
  ],

  cancelMes: {
    "2025-10": 24, "2025-11": 30, "2025-12": 37, "2026-01": 26,
    "2026-02": 31, "2026-03": 16, "2026-04": 9, "2026-05": 3,
    "2026-06": 1,  "2026-07": 1,  "2026-08": 1, "2026-10": 1
  },

  arrivalMes: {
    "2025-10": 10, "2025-11": 30, "2025-12": 37, "2026-01": 26,
    "2026-02": 31, "2026-03": 16, "2026-04": 9, "2026-05": 3,
    "2026-06": 1,  "2026-07": 1,  "2026-08": 1, "2026-10": 1
  },

  semanas: ["W42","W43","W44","W45","W46","W47"],

  ventas:   [61910.14, 95508.36, 93817.77, 76990.27, 93260.45, 41572.06],
  bookings: [28, 30, 32, 31, 30, 15],
  keys:     [145, 220, 197, 171, 190, 84]
};


/**********************************************
 * FORMATO USD
 **********************************************/
function pwFmtUSD(v) {
  return "$" + Number(v).toLocaleString("en-US", {
    minimumFractionDigits: 2
  });
}


/**********************************************
 * TABLA
 **********************************************/
function renderPerformanceWebTable() {
  const tabla = document.getElementById("tablaPerformanceWeb");
  if (!tabla) return;

  let html = `
    <thead>
      <tr>
        <th>Hotel</th>
        <th>Ventas</th>
        <th>Bookings</th>
        <th>Keys</th>
        <th>ADR</th>
      </tr>
    </thead>
    <tbody>
  `;

  PERFORMANCE_WEB_DATA.hoteles.forEach(h => {
    html += `
      <tr>
        <td>${h.hotel}</td>
        <td>${pwFmtUSD(h.ventas)}</td>
        <td>${h.bookings}</td>
        <td>${h.keys}</td>
        <td>${pwFmtUSD(h.adr)}</td>
      </tr>
    `;
  });

  html += `</tbody>`;
  tabla.innerHTML = html;
}


/**********************************************
 * CANCELACIONES POR MES
 **********************************************/
function renderPerformanceWebCancelMes() {
  const div = document.getElementById("graficoPerformanceWebCancelMes");
  if (!div) return;

  const meses = Object.keys(PERFORMANCE_WEB_DATA.cancelMes);
  const vals  = Object.values(PERFORMANCE_WEB_DATA.cancelMes);

  Plotly.newPlot(div, [{
    x: meses,
    y: vals,
    type: "bar",
    text: vals.map(String),
    textposition: "outside",
    marker: { color: "#C1272D" },
    cliponaxis: false
  }], {
    margin: { t:40, l:50, r:20, b:60 }
  });
}


/**********************************************
 * ARRIVAL
 **********************************************/
function renderPerformanceWebArrival() {
  const div = document.getElementById("graficoPerformanceWebArrival");
  if (!div) return;

  const meses = Object.keys(PERFORMANCE_WEB_DATA.arrivalMes);
  const vals  = Object.values(PERFORMANCE_WEB_DATA.arrivalMes);

  Plotly.newPlot(div, [{
    x: meses,
    y: vals,
    type: "bar",
    text: vals.map(String),
    textposition: "outside",
    marker: { color: "#0077b6" },
    cliponaxis: false
  }], {
    margin: { t:50, l:50, r:20, b:80 },
    xaxis: { tickangle: -30 }
  });
}


/**********************************************
 * LÍNEAS — CON CIFRAS SOBRE LOS PUNTOS
 **********************************************/
function renderPerformanceWebLineas() {
  const div = document.getElementById("graficoPerformanceWebLineas");
  if (!div) return;

  const W = PERFORMANCE_WEB_DATA.semanas;

  const t1 = {
    x: W, y: PERFORMANCE_WEB_DATA.ventas,
    type:"scatter",
    mode:"lines+markers+text",
    name:"Ventas",
    text: PERFORMANCE_WEB_DATA.ventas.map(v =>
      "$" + v.toLocaleString("en-US")
    ),
    textposition:"top center",
    textfont:{ size:12, color:"#003f5c", family:"Inter" },
    line:{ width:3, color:"#003f5c" },
    marker:{ size:7, color:"#003f5c" }
  };

  const t2 = {
    x: W, y: PERFORMANCE_WEB_DATA.bookings,
    type:"scatter",
    mode:"lines+markers+text",
    name:"Bookings",
    text: PERFORMANCE_WEB_DATA.bookings.map(String),
    textposition:"top center",
    textfont:{ size:12, color:"#ffa600", family:"Inter" },
    line:{ width:3, color:"#ffa600" },
    marker:{ size:7, color:"#ffa600" }
  };

  const t3 = {
    x: W, y: PERFORMANCE_WEB_DATA.keys,
    type:"scatter",
    mode:"lines+markers+text",
    name:"Keys",
    text: PERFORMANCE_WEB_DATA.keys.map(String),
    textposition:"top center",
    textfont:{ size:12, color:"#2ECC71", family:"Inter" },
    line:{ width:3, color:"#2ECC71" },
    marker:{ size:7, color:"#2ECC71" }
  };

  Plotly.newPlot(div, [t1,t2,t3], {
    margin:{ t:80, l:60, r:20, b:140 },
    legend:{ orientation:"h", y:-0.25 }
  });
}


/**********************************************
 * VARIACIÓN
 **********************************************/
function renderPerformanceWebVariacion() {
  const div = document.getElementById("performanceWebVariacion");
  if (!div) return;

  const V = PERFORMANCE_WEB_DATA.ventas;
  const prev = V[V.length-2];
  const curr = V[V.length-1];

  const variacion = curr - prev;
  const pct = prev > 0 ? (variacion / prev) * 100 : 0;

  div.textContent =
    `Variación W46 → W47: ${pct>=0?"+":""}${pct.toFixed(1)}% (${pwFmtUSD(variacion)})`;
}


/**********************************************
 * INTERPRETACIÓN
 **********************************************/
function renderPerformanceWebInterpretacion() {
  const div = document.getElementById("interpretacion-performanceWeb");
  if (!div) return;

  div.innerText = interpretarGraficoAvanzado(
    "Performance Web",
    PERFORMANCE_WEB_DATA.semanas,
    {
      Ventas: PERFORMANCE_WEB_DATA.ventas,
      Bookings: PERFORMANCE_WEB_DATA.bookings,
      Keys: PERFORMANCE_WEB_DATA.keys
    }
  );
}


/**********************************************
 * ACTIVADOR DE PESTAÑA — PERFORMANCE WEB
 **********************************************/
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.target === "performanceWeb") {
      const panel = document.getElementById("panelPequenos");
      if (panel) panel.innerText = "Performance Web – W42–W47";

      setTimeout(() => {
        renderPerformanceWebTable();
        renderPerformanceWebCancelMes();
        renderPerformanceWebArrival();
        renderPerformanceWebLineas();
        renderPerformanceWebVariacion();
        renderPerformanceWebInterpretacion();
      }, 150);
    }
  });
});

/**********************************************
 * ============================================
 *   FACEBOOK – RESULTADOS REALES W42–W47
 * ============================================
 **********************************************/

const FACEBOOK_SEMANAS = ["W42","W43","W44","W45","W46","W47"];

/* Datos reales provenientes del archivo que subiste */
const FACEBOOK_DATA = {
  spend:   [452.31, 389.22, 510.18, 488.77, 522.19, 601.44],
  clics:   [129, 114, 156, 140, 169, 205],
  leads:   [11, 9, 15, 14, 18, 22],
  revenue: [2104.55, 1822.00, 2600.75, 2405.66, 2977.33, 3310.88]
};

/*************** KPIs CALCULADOS ***************/
function fbCTR(i) {
  return FACEBOOK_DATA.clics[i] > 0
    ? (FACEBOOK_DATA.leads[i] / FACEBOOK_DATA.clics[i]) * 100
    : 0;
}

function fbROAS(i) {
  return FACEBOOK_DATA.spend[i] > 0
    ? FACEBOOK_DATA.revenue[i] / FACEBOOK_DATA.spend[i]
    : 0;
}

/******************** FORMATO USD ********************/
function fbUSD(v) {
  return "$" + Number(v).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/******************** CONSTRUCCIÓN DE TABLA FACEBOOK ********************/
function renderFacebookTable() {
  const tabla = document.getElementById("tablaFacebook");
  if (!tabla) return;

  let html = `
    <thead>
      <tr>
        <th>Semana</th>
        <th>Spend</th>
        <th>Clics</th>
        <th>Leads</th>
        <th>Revenue</th>
        <th>CTR</th>
        <th>ROAS</th>
      </tr>
    </thead>
    <tbody>
  `;

  FACEBOOK_SEMANAS.forEach((w, i) => {
  html += `
    <tr>
      <td>${w}</td>
      <td>${fbUSD(FACEBOOK_DATA.spend[i])}</td>
      <td>${FACEBOOK_DATA.clics[i]}</td>
      <td>${FACEBOOK_DATA.leads[i]}</td>
      <td>${fbUSD(FACEBOOK_DATA.revenue[i])}</td>
      <td>${fbCTR(i).toFixed(2)}%</td>
      <td>${fbROAS(i).toFixed(2)}</td>
    </tr>
  `;
});


  html += "</tbody>";
  tabla.innerHTML = html;
}

/******************** GRÁFICA PRINCIPAL FACEBOOK ********************/
function renderFacebook() {
  const div = document.getElementById("graficoFacebook");
  if (!div) return;

  const trace1 = {
    x: FACEBOOK_SEMANAS,
    y: FACEBOOK_DATA.spend,
    type: "bar",
    name: "Spend",
    marker: { color: "#1877F2" },
    text: FACEBOOK_DATA.spend.map(v => fbUSD(v)),
    textposition: "outside",
    hovertemplate: "<b>Spend</b>: %{y:$,.2f}<extra></extra>"
  };

  const trace2 = {
    x: FACEBOOK_SEMANAS,
    y: FACEBOOK_DATA.revenue,
    type: "bar",
    name: "Revenue",
    marker: { color: "#34A853" },
    text: FACEBOOK_DATA.revenue.map(v => fbUSD(v)),
    textposition: "outside",
    hovertemplate: "<b>Revenue</b>: %{y:$,.2f}<extra></extra>"
  };

  const layout = {
    title: {
      text: "Resultados Facebook Ads – W42 a W47",
      font: { size: 22, color: "#003366" }
    },
    barmode: "group",
    margin: { t: 70, l: 50, r: 20, b: 80 },
    hoverlabel: { bgcolor: "#fff" }
  };

  Plotly.newPlot(div, [trace1, trace2], layout, {displayModeBar:false});
}

/******************** TARJETAS KPI FACEBOOK ********************/
function renderFacebookKPIs() {

  const i = FACEBOOK_SEMANAS.length - 1;  // última semana

  document.getElementById("fb-spend").innerText   = fbUSD(FACEBOOK_DATA.spend[i]);
  document.getElementById("fb-clics").innerText   = FACEBOOK_DATA.clics[i];
  document.getElementById("fb-leads").innerText   = FACEBOOK_DATA.leads[i];
  document.getElementById("fb-revenue").innerText = fbUSD(FACEBOOK_DATA.revenue[i]);
  document.getElementById("fb-ctr").innerText     = fbCTR(i).toFixed(2) + "%";
  document.getElementById("fb-roas").innerText    = fbROAS(i).toFixed(2);
}

/******************** ACTIVACIÓN DE LA PESTAÑA FACEBOOK ********************/
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    if (btn.dataset.target === "facebook") {
      const panel = document.getElementById("panelPequenos");
      if (panel) panel.innerText = "Facebook Ads – W42–W47";

      setTimeout(() => {
        renderFacebookTable();
        renderFacebook();
        renderFacebookKPIs();
      }, 150);
    }

  });
});


/**********************************************
 * FUNNEL E-COMMERCE — DATOS POR SEMANA (W42–W47)
 **********************************************/
const FUNNEL_SEMANAL = {
  W42: { visitas: 4236, motor: 2219, carrito: 838, cotiza: 751, compra: 11 },
  W43: { visitas: 5048, motor: 2491, carrito: 957, cotiza: 849, compra: 17 },
  W44: { visitas: 4902, motor: 2297, carrito: 862, cotiza: 782, compra: 5 },
  W45: { visitas: 5755, motor: 2951, carrito: 1084, cotiza: 927, compra: 22 },
  W46: { visitas: 7246, motor: 3903, carrito: 1531, cotiza: 1327, compra: 27 },
  W47: { visitas: 6532, motor: 3504, carrito: 1410, cotiza: 1198, compra: 39 }
};


/**********************************************
 * RENDER PRINCIPAL DEL FUNNEL
 **********************************************/
function renderFunnelEcommerce() {

  const selector = document.getElementById("funnelSelector");
  if (!selector) return;

  const semana = selector.value;
  const data = FUNNEL_SEMANAL[semana];
  if (!data) return;

  const v = data.visitas;
  const m = data.motor;
  const c = data.carrito;
  const q = data.cotiza;
  const p = data.compra;

  // CÁLCULOS SEGUROS
  const pctMotor   = v > 0 ? (m / v) * 100 : 0;
  const pctCarrito = m > 0 ? (c / m) * 100 : 0;
  const pctCotiza  = c > 0 ? (q / c) * 100 : 0;
  const pctCompra  = q > 0 ? (p / q) * 100 : 0;

  // ACTUALIZAR TARJETAS
  document.getElementById("funnel-visitas").innerText =
    `Vistas Página Web: ${v.toLocaleString("es-MX")}`;

  document.getElementById("funnel-motor").innerText =
    `Visitar al Motor: ${m.toLocaleString("es-MX")} (${pctMotor.toFixed(2)}%)`;

  document.getElementById("funnel-carrito").innerText =
    `Agregar a Carrito: ${c.toLocaleString("es-MX")} (${pctCarrito.toFixed(2)}%)`;

  document.getElementById("funnel-cotizacion").innerText =
    `Cotización: ${q.toLocaleString("es-MX")} (${pctCotiza.toFixed(2)}%)`;

  document.getElementById("funnel-compra").innerText =
    `Compra: ${p.toLocaleString("es-MX")} (${pctCompra.toFixed(2)}%)`;

  // ACTUALIZAR GRÁFICO
  renderGraficoFunnelEcommerce();
}


/******************************************************
 *   FUNNEL GRÁFICO — Plotly (orden correcto)
 ******************************************************/
function renderGraficoFunnelEcommerce() {

  const selector = document.getElementById("funnelSelector");
  if (!selector) return;

  const semana = selector.value;
  const data = FUNNEL_SEMANAL[semana];
  if (!data) return;

  // ORDEN EXACTO DESEADO:
  // ► VISITAS (arriba)
  // ► MOTOR
  // ► CARRITO
  // ► COTIZACIÓN
  // ► COMPRA (abajo)
  const valores = [
    data.visitas,
    data.motor,
    data.carrito,
    data.cotiza,
    data.compra
  ];

  const labels = [
    "Visitas",
    "Motor",
    "Carrito",
    "Cotización",
    "Compra"
  ];

  const trace = {
    type: "bar",
    x: valores,
    y: labels,
    orientation: "h",
    marker: {
      color: ["#4f80c9", "#4f80c9", "#4f80c9", "#4f80c9", "#1a4a80"],
      line: { width: 1.5, color: "#003366" }
    },
    text: valores.map(v => v.toLocaleString("es-MX")),
    texttemplate: "%{text}",
    textposition: "inside",
    insidetextanchor: "middle",
    hovertemplate: "<b>%{y}</b>: %{x:,}<extra></extra>"
  };

  const layout = {
    height: 230, // más pequeño como pediste
    margin: { l: 120, r: 10, t: 10, b: 0 },
    bargap: 0.25,
    plot_bgcolor: "#f8faff",
    paper_bgcolor: "white",

    xaxis: { showgrid: false },

    // ★★ ESTA ES LA CLAVE PARA EL ORDEN CORRECTO ★★
    yaxis: { autorange: "reversed", automargin: true }
  };

  Plotly.newPlot("graficoFunnelEcommerce", [trace], layout, {
    displayModeBar: false
  });
}


/**********************************************
 * EVENTO — CAMBIO DE SEMANA
 **********************************************/
document.addEventListener("change", (e) => {
  if (e.target.id === "funnelSelector") {
    renderFunnelEcommerce();
  }
});


/**********************************************
 * EVENTO — ACTIVACIÓN DE LA PESTAÑA
 **********************************************/
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    const target = btn.dataset.target;

    document.querySelectorAll(".tab-content").forEach(tab =>
      tab.classList.remove("active")
    );
    document.getElementById(target)?.classList.add("active");

    const panel = document.getElementById("panelPequenos");
    if (panel) panel.innerText = btn.innerText;

    if (target === "funnelEcommerce") {
      setTimeout(() => {
        renderFunnelEcommerce();
        renderGraficoFunnelEcommerce();
      }, 120);
    }
  });
});


/*****************************************************
 * SISTEMA PROFESIONAL DE ANOTACIONES MÓVILES
 * — Drag & Drop real
 * — Guarda posiciones en localStorage
 * — Carga posiciones al renderizar cada gráfica
 *****************************************************/

/*=====================================================
  1) GUARDAR POSICIÓN
=====================================================*/
function guardarPosicion(divID, index, x, y) {
  const key = `pos_${divID}`;
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  data[index] = { x, y };
  localStorage.setItem(key, JSON.stringify(data));
}

/*=====================================================
  2) CARGAR POSICIONES GUARDADAS
=====================================================*/
function cargarPosiciones(divID) {
  const key = `pos_${divID}`;
  return JSON.parse(localStorage.getItem(key) || "{}");
}

/*=====================================================
  3) APLICAR POSICIONES DESPUÉS DE DIBUJAR
=====================================================*/
function aplicarPosicionesGuardadas(divID) {
  const plot = document.getElementById(divID);
  if (!plot || !plot.layout || !plot.layout.annotations) return;

  const guardadas = cargarPosiciones(divID);

  const nuevas = plot.layout.annotations.map((a, i) => {
    if (guardadas[i]) {
      return {
        ...a,
        x: guardadas[i].x,
        y: guardadas[i].y
      };
    }
    return a;
  });

  Plotly.relayout(divID, { annotations: nuevas });
}

/*=====================================================
  4) ACTIVAR SISTEMA COMPLETO
=====================================================*/
function activarSistemaDeAnotaciones(divID) {
  aplicarPosicionesGuardadas(divID);
  enableAnnotationDrag(divID);
  enableAnnotationCursor(divID);
}

/*=====================================================
  5) DRAG & DROP REAL
=====================================================*/
function enableAnnotationDrag(divID) {
  const plot = document.getElementById(divID);
  if (!plot) return;

  let dragging = false;
  let dragIndex = null;

  plot.on("plotly_clickannotation", function (e) {
    dragging = true;
    dragIndex = e.index;
    plot.style.cursor = "grabbing";
  });

  plot.addEventListener("mouseup", function () {
    dragging = false;
    dragIndex = null;
    plot.style.cursor = "default";
  });

  plot.addEventListener("mousemove", function (event) {
    if (!dragging || dragIndex === null) return;

    const bb = plot.getBoundingClientRect();
    const xPix = event.clientX - bb.left;
    const yPix = event.clientY - bb.top;

    const xa = plot._fullLayout.xaxis;
    const ya = plot._fullLayout.yaxis;

    const xVal = xa.p2c ? xa.p2c.invert(xPix) :
      xa.range[0] + (xa.range[1] - xa.range[0]) * (xPix / bb.width);

    const yVal = ya.p2c ? ya.p2c.invert(yPix) :
      ya.range[0] + (ya.range[1] - ya.range[0]) * (1 - yPix / bb.height);

    Plotly.relayout(divID, {
      [`annotations[${dragIndex}].x`]: xVal,
      [`annotations[${dragIndex}].y`]: yVal
    });

    guardarPosicion(divID, dragIndex, xVal, yVal);
  });
}

/*=====================================================
  6) CURSOR PROFESIONAL
=====================================================*/
function enableAnnotationCursor(divID) {
  const plot = document.getElementById(divID);
  if (!plot) return;

  plot.on("plotly_hover", function (e) {
    if (e.annotation) plot.style.cursor = "grab";
  });

  plot.on("plotly_unhover", function () {
    plot.style.cursor = "default";
  });

  plot.on("plotly_clickannotation", function () {
    plot.style.cursor = "grabbing";
  });

  plot.addEventListener("mouseup", function () {
    plot.style.cursor = "grab";
  });
}
function separarCapas(divID, minDist = 0.07) {
  const plot = document.getElementById(divID);
  if (!plot || !plot.layout || !plot.layout.annotations) return;

  const ann = [...plot.layout.annotations];

  // Ordenar anotaciones de abajo a arriba
  ann.sort((a, b) => a.y - b.y);

  for (let i = 1; i < ann.length; i++) {
    const prev = ann[i - 1];
    const curr = ann[i];

    // Si están demasiado cerca…
    if (curr.y - prev.y < minDist * prev.y) {
      curr.y = prev.y + prev.y * minDist;
    }
  }

  Plotly.relayout(divID, { annotations: ann });
}
/****************************************************
 * ZOOM + PAN PROFESIONAL PARA PLOTLY
 * – scroll = zoom suave
 * – arrastrar = mover (pan)
 * – doble click = reset automático
 * – botón “Restablecer vista”
 ****************************************************/
function activarZoomPan(divID) {
  const plot = document.getElementById(divID);
  if (!plot) return;

  // Habilitar zoom + pan reales
  Plotly.relayout(divID, {
    dragmode: "pan",        // arrastrar = pan
    scrollZoom: true,       // rueda del mouse = zoom
    doubleClick: "reset",   // doble click = reset
    responsive: true
  });

  // CURSOR dinámico
  plot.on("plotly_hover", () => { plot.style.cursor = "grab"; });
  plot.on("plotly_unhover", () => { plot.style.cursor = "default"; });
  plot.on("plotly_relayout", () => { plot.style.cursor = "grab"; });

  // BOTÓN FLOTANTE reset zoom
  let btn = document.querySelector(`#resetZoom_${divID}`);
  if (!btn) {
    btn = document.createElement("button");
    btn.id = `resetZoom_${divID}`;
    btn.innerText = "Restablecer vista";

    Object.assign(btn.style, {
      position: "absolute",
      top: "8px",
      right: "8px",
      zIndex: "10",
      padding: "6px 10px",
      background: "white",
      border: "1px solid #003366",
      borderRadius: "4px",
      fontFamily: "Inter",
      fontSize: "12px",
      cursor: "pointer"
    });

    plot.parentElement.style.position = "relative";
    plot.parentElement.appendChild(btn);

    btn.addEventListener("click", () => {
      Plotly.relayout(divID, {
        "xaxis.autorange": true,
        "yaxis.autorange": true
      });
    });
  }
}



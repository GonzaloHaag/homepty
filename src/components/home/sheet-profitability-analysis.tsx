"use client";

import {
  BarChartIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  CompassIcon,
  DatabaseIcon,
  DollarSignIcon,
  LayersIcon,
  RefreshCwIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
const testData = {
  // Location analytics data
  locationAnalytics: {
    location: "CDMX",
    marketData: {
      residentialPricing: "Polanco: $50,000 MXN/m², Iztapalapa: $20,000 MXN/m²",
      demandLevel: "Alto",
      tourismImpact: "Moderado",
      nearshoring: "Bajo",
    },
  },

  // Market filter data
  selectedMarkets: ["Residencial", "Turístico"], // Selected markets
  marketOptions: ["Residencial", "Turístico", "Industrial", "Comercial"], // Available market options

  // Segment filter data
  selectedSegments: ["Vivienda Media", "Turismo de Lujo"], // Selected segments
  segmentOptions: [
    "Vivienda Media",
    "Vivienda de Lujo",
    "Turismo de Lujo",
    "Logística",
  ], // Available segment options

  // Strategic recommendations
  strategicRecommendations: {
    context:
      "Análisis de mercado inmobiliario en CDMX, basado en datos de INEGI y tendencias 2025",
    forDevelopers:
      "⭐ Invertir en vivienda media en zonas de crecimiento como Azcapotzalco. Considerar desarrollos mixtos.",
    forInvestors:
      "⭐ Explorar propiedades vacacionales en destinos emergentes como Valle de Guadalupe con alto ROI en Airbnb.",
    forGovernment:
      "Fomentar incentivos fiscales para desarrollos sostenibles en zonas industriales de baja densidad.",
    isAdvanced: true,
  },

  // Last updated timestamp
  lastUpdated: new Date("2025-08-15T10:00:00"),
};
export const SheetProfitabilityAnalysis = () => {
  const [locationAnalytics] = useState(testData.locationAnalytics);
  const [selectedMarkets, setSelectedMarkets] = useState(
    testData.selectedMarkets
  );
  const [marketOptions] = useState(testData.marketOptions);
  const [selectedSegments, setSelectedSegments] = useState(
    testData.selectedSegments
  );
  const [segmentOptions] = useState(testData.segmentOptions);
  const [strategicRecommendations] = useState(
    testData.strategicRecommendations
  );
  const [lastUpdated] = useState(testData.lastUpdated);

  // Handlers for market and segment changes
  const handleMarketChange = (market, checked) => {
    setSelectedMarkets((prev) =>
      checked ? [...prev, market] : prev.filter((m) => m !== market)
    );
  };

  const handleSegmentChange = (segment, checked) => {
    setSelectedSegments((prev) =>
      checked ? [...prev, segment] : prev.filter((s) => s !== segment)
    );
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant={"default"}
          size={"lg"}
          title="Rentabilidad"
        >
          <TargetIcon /> Análisis de rentabilidad
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-x-2">
            <BarChartIcon /> Análisis de rentabilidad
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-y-2">
          {/* Barra de consulta IA */}
          <div className="flex items-center gap-2 p-4">
            <Input
              type="text"
              placeholder="Investiga con IA, ingresa el nicho de tu cliente y nosotros lo buscamos"
              className="flex-grow border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
            <Button
              size="sm"
              className="px-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <SparklesIcon size={16} />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            {/* Mensaje informativo sobre la fuente de datos */}
            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded p-3 mb-4 flex items-start gap-2">
              <CompassIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>
                Los análisis y recomendaciones se basan en los filtros aplicados
                y la ubicación buscada (
                {testData.locationAnalytics.location || "General"}). Selecciona
                mercados y segmentos para refinar.
              </span>
            </div>

            <div className="space-y-6">
              {/* 1. Áreas Clave de Análisis con Filtro */}
              <section>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                  <h4 className="text-md font-semibold flex items-center">
                    <LayersIcon className="h-4 w-4 text-blue-500 mr-2" />
                    Áreas Clave de Análisis
                  </h4>
                  {/* Filtro Mercado */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-2 gap-1"
                      >
                        <SlidersHorizontalIcon className="h-3 w-3" />
                        Mercado
                        {testData.selectedMarkets.length > 0 && (
                          <span className="ml-1 bg-blue-100 text-blue-600 rounded-full px-1.5 text-[10px] font-bold">
                            {testData.selectedMarkets.length}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrar por Mercado</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {testData.marketOptions.map((market) => (
                        <DropdownMenuCheckboxItem
                          key={market}
                          checked={testData.selectedMarkets.includes(market)}
                          onCheckedChange={(checked) =>
                            handleMarketChange(market, !!checked)
                          }
                        >
                          {market}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => setSelectedMarkets([])}
                        className="text-xs text-red-600"
                      >
                        Limpiar Selección
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Contenido de Áreas Clave (con ejemplos) */}
                <div className="space-y-4">
                  {/* a. Mercado Residencial (Mostrar si está seleccionado o no hay selección) */}
                  {(testData.selectedMarkets.length === 0 ||
                    testData.selectedMarkets.includes("Residencial")) && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <h5 className="font-medium mb-2 text-gray-800">
                        Mercado Residencial
                      </h5>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <DollarSignIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Precios por m²:</strong> Segmentación por
                          zonas (ej.{" "}
                          {testData.locationAnalytics.location || "CDMX"}:{" "}
                          {testData.locationAnalytics.marketData
                            ?.residentialPricing || "Polanco vs. Iztapalapa"}
                          ).
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <ClockIcon className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Demanda vs. Oferta:</strong> Inventarios
                          activos (
                          {testData.locationAnalytics.marketData?.demandLevel ||
                            "Moderado"}
                          ) y tiempo de venta/renta.
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <TrendingUpIcon className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Factores de Valorización:</strong> Proximidad
                          a transporte, seguridad, servicios.
                        </span>
                      </div>
                    </div>
                  )}
                  {/* b. Mercado Vacacional/Turístico (Mostrar si está seleccionado o no hay selección) */}
                  {(testData.selectedMarkets.length === 0 ||
                    testData.selectedMarkets.includes("Turístico")) && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <h5 className="font-medium mb-2 text-gray-800">
                        Mercado Vacacional/Turístico
                      </h5>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <BarChartIcon className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Rendimiento de Airbnb:</strong> Occupancy
                          rates y ROI en destinos como{" "}
                          {testData.locationAnalytics.location ||
                            "Tulum o Puerto Vallarta"}
                          .
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <ClockIcon className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Impacto del Turismo:</strong> Correlación
                          entre llegadas (
                          {testData.locationAnalytics.marketData
                            ?.tourismImpact || "variable"}
                          ) y precios.
                        </span>
                      </div>
                    </div>
                  )}
                  {/* c. Mercado Industrial (Mostrar si está seleccionado o no hay selección) */}
                  {(testData.selectedMarkets.length === 0 ||
                    testData.selectedMarkets.includes("Industrial")) && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <h5 className="font-medium mb-2 text-gray-800">
                        Mercado Industrial y Logístico
                      </h5>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <BriefcaseIcon className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Nearshoring:</strong> Análisis de clusters
                          industriales (
                          {testData.locationAnalytics.marketData?.nearshoring ||
                            "Alto"}
                          ) en{" "}
                          {testData.locationAnalytics.location ||
                            "Monterrey, Querétaro o Cd. Juárez"}
                          .
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <DollarSignIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Precios de Bodegas:</strong> Relación con
                          rutas de transporte y tratados comerciales.
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Añadir más secciones para otros mercados si es necesario, siguiendo el mismo estilo */}
                </div>
              </section>

              {/* 2. Identificación de Oportunidades de Inversión */}
              <section>
                <h4 className="text-md font-semibold flex items-center border-b border-gray-200 pb-2 mb-3">
                  <CompassIcon className="h-4 w-4 text-blue-500 mr-2" />
                  Identificación de Oportunidades{" "}
                  {testData.locationAnalytics.location &&
                    `en ${testData.locationAnalytics.location}`}
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  {/* Contenido de Oportunidades (con ejemplos) */}
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <TrendingUpIcon className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Análisis:</strong> Clusterización de municipios
                      con alto crecimiento poblacional y baja oferta de
                      vivienda.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <DatabaseIcon className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Data:</strong> Censo de Población (INEGI) +
                      registros de permisos de construcción.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Resultado:</strong> Recomendar desarrollo de
                      vivienda media en zonas como{" "}
                      {testData.locationAnalytics.location ||
                        "Mérida o Querétaro"}
                      .
                    </span>
                  </div>
                  {/* Se pueden añadir más puntos de oportunidad si es necesario */}
                </div>
              </section>

              {/* 3. Recomendaciones Estratégicas con Filtro (ESTILO MODIFICADO) */}
              <section>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                  {/* ... (Título y Dropdown de Segmento sin cambios aquí) ... */}
                  <h4 className="text-md font-semibold flex items-center">
                    <TrendingUpIcon className="h-4 w-4 text-blue-500 mr-2" />
                    Recomendaciones Estratégicas
                    {testData.strategicRecommendations.isAdvanced && (
                      <span className="ml-2 text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Personalizadas
                      </span>
                    )}
                  </h4>
                  {/* Filtro Segmento */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-2 gap-1"
                      >
                        <BriefcaseIcon className="h-3 w-3" />
                        Segmento
                        {testData.selectedSegments.length > 0 && (
                          <span className="ml-1 bg-blue-100 text-blue-600 rounded-full px-1.5 text-[10px] font-bold">
                            {testData.selectedSegments.length}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* ... (Contenido del Dropdown sin cambios) ... */}
                      <DropdownMenuLabel>
                        Filtrar por Segmento
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {testData.segmentOptions.map((segment) => (
                        <DropdownMenuCheckboxItem
                          key={segment}
                          checked={testData.selectedSegments.includes(segment)}
                          onCheckedChange={(checked) =>
                            handleSegmentChange(segment, !!checked)
                          }
                        >
                          {segment}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => setSelectedSegments([])}
                        className="text-xs text-red-600"
                      >
                        Limpiar Selección
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Contexto y lista de recomendaciones (ESTILO MODIFICADO) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  {" "}
                  {/* Añadido padding p-4 */}
                  <p className="text-xs text-gray-500 italic mb-4">
                    {" "}
                    {/* Aumentado margen inferior mb-4 */}
                    Recomendaciones basadas en:{" "}
                    {testData.strategicRecommendations.context}
                  </p>
                  <div className="space-y-4">
                    {" "}
                    {/* Contenedor para las recomendaciones */}
                    {/* Recomendación Desarrolladores */}
                    <div className="flex items-start">
                      <div className="w-1 h-auto bg-blue-500 rounded-full mr-3 mt-1 flex-shrink-0 self-stretch"></div>{" "}
                      {/* Línea vertical azul */}
                      <div className="text-sm">
                        <strong className="text-blue-600 block mb-1">
                          Para Desarrolladores:
                        </strong>
                        {/* Mostrar estrella si está marcada */}
                        <span
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html:
                              testData.strategicRecommendations.forDevelopers.replace(
                                "⭐"
                              ),
                          }}
                        ></span>
                      </div>
                    </div>
                    {/* Recomendación Inversionistas */}
                    <div className="flex items-start">
                      <div className="w-1 h-auto bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0 self-stretch"></div>{" "}
                      {/* Línea vertical verde */}
                      <div className="text-sm">
                        <strong className="text-green-600 block mb-1">
                          Para Inversionistas:
                        </strong>
                        {/* Mostrar estrella si está marcada */}
                        <span
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html:
                              testData.strategicRecommendations.forInvestors.replace(
                                "⭐",
                                <span className="text-amber-500 font-bold">
                                  ⭐
                                </span>
                              ),
                          }}
                        ></span>
                      </div>
                    </div>
                    {/* Recomendación Gobierno */}
                    <div className="flex items-start">
                      <div className="w-1 h-auto bg-purple-500 rounded-full mr-3 mt-1 flex-shrink-0 self-stretch"></div>{" "}
                      {/* Línea vertical púrpura */}
                      <div className="text-sm">
                        <strong className="text-purple-600 block mb-1">
                          Para Gobierno:
                        </strong>
                        {/* Mostrar estrella si está marcada */}
                        <span
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html:
                              testData.strategicRecommendations.forGovernment.replace(
                                "⭐",
                                '<span class="text-amber-500 font-bold">⭐</span>'
                              ),
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                  {/* Fecha de Actualización */}
                  <div className="mt-5 pt-3 border-t border-gray-200 flex items-center text-xs text-gray-500">
                    <RefreshCwIcon className="h-3 w-3 mr-1.5 text-gray-400" />{" "}
                    {/* Usar RefreshCw u otro icono adecuado */}
                    Actualizado:{" "}
                    {testData.lastUpdated.toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

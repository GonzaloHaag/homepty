"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FilterRangePrice = () => {
  // Valores por defecto fijos
  const minLimit = 0;
  const maxLimit = 1000000;
  const initialMin = 100000;
  const initialMax = 500000;

  // Estados para valores temporales (antes de aplicar)
  const [tempMin, setTempMin] = useState(initialMin);
  const [tempMax, setTempMax] = useState(initialMax);

  // Estados para valores aplicados (los que se muestran arriba)
  const [appliedMin, setAppliedMin] = useState(initialMin);
  const [appliedMax, setAppliedMax] = useState(initialMax);

  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const handleMinChange = (value: string) => {
    const numValue = Number.parseInt(value) || minLimit;
    if (numValue <= tempMax) {
      setTempMin(Math.max(minLimit, numValue));
    }
  };

  const handleMaxChange = (value: string) => {
    const numValue = Number.parseInt(value) || maxLimit;
    if (numValue >= tempMin) {
      setTempMax(Math.min(maxLimit, numValue));
    }
  };

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number.parseInt(e.target.value);
    if (type === "min" && value <= tempMax) {
      setTempMin(value);
    } else if (type === "max" && value >= tempMin) {
      setTempMax(value);
    }
  };

  const handleApply = () => {
    setAppliedMin(tempMin);
    setAppliedMax(tempMax);
    setIsOpen(false);
    console.log("Filtros aplicados:", { min: tempMin, max: tempMax });
  };

  return (
    <div className="relative w-full">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <span>
          Precio: {formatPrice(appliedMin)} - {formatPrice(appliedMax)}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {/* Título */}
          <h3 className="text-base font-medium mb-4">
            Ajustar rango de precios
          </h3>

          {/* Slider dual */}
          <div className="relative mb-4">
            <div className="relative h-2 bg-gray-200 rounded-full">
              {/* Barra activa entre los dos valores */}
              <div
                className="absolute h-2 bg-blue-500 rounded-full"
                style={{
                  left: `${
                    ((tempMin - minLimit) / (maxLimit - minLimit)) * 100
                  }%`,
                  width: `${
                    ((tempMax - tempMin) / (maxLimit - minLimit)) * 100
                  }%`,
                }}
              />

              {/* Slider mínimo */}
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={tempMin}
                onChange={(e) => handleSliderChange(e, "min")}
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: 1 }}
              />

              {/* Slider máximo */}
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={tempMax}
                onChange={(e) => handleSliderChange(e, "max")}
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: 2 }}
              />
            </div>

            {/* Valores debajo del slider */}
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{formatPrice(tempMin)}</span>
              <span>{formatPrice(tempMax)}</span>
            </div>
          </div>

          {/* Inputs numéricos */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <Label htmlFor="min-price" className="text-xs text-gray-500">
                Mínimo
              </Label>
              <Input
                id="min-price"
                type="number"
                value={tempMin}
                onChange={(e) => handleMinChange(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs text-gray-500">
                Máximo
              </Label>
              <Input
                id="max-price"
                type="number"
                value={tempMax}
                onChange={(e) => handleMaxChange(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="sm"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApply}
              className="bg-blue-500 hover:bg-blue-600"
              size="sm"
            >
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

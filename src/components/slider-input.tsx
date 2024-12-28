"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function SliderInput({ value, onChange }: SliderInputProps) {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 10) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Slider
          min={0}
          max={10}
          step={1}
          value={[value]}
          onValueChange={handleSliderChange}
          className="flex-grow"
        />
        <Input
          type="number"
          min={0}
          max={10}
          value={value}
          onChange={handleInputChange}
          className="w-16 text-center"
        />
      </div>
    </div>
  );
}

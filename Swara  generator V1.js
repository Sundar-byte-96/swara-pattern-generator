import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const swaras = ["S", "R", "G", "M", "P", "D", "N", "S↑"];

const generatePattern = (num, complexity, selectedSwaras, patternType) => {
  let availableSwaras = swaras.filter((swara) => selectedSwaras.includes(swara));
  let pattern = [];
  let stepLimit = complexity === "Low" ? 2 : 3;

  if (patternType === "Arohana") {
    availableSwaras = availableSwaras.sort((a, b) => swaras.indexOf(a) - swaras.indexOf(b));
  } else if (patternType === "Avarohana") {
    availableSwaras = availableSwaras.sort((a, b) => swaras.indexOf(b) - swaras.indexOf(a));
  }

  let prevIndex = Math.floor(Math.random() * availableSwaras.length);
  for (let i = 0; i < num; i++) {
    let newIndex;
    do {
      newIndex = prevIndex + (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * stepLimit + 1);
    } while (newIndex < 0 || newIndex >= availableSwaras.length);
    
    pattern.push(availableSwaras[newIndex]);
    prevIndex = newIndex;
  }
  return pattern;
};

export default function SwaraPatternGenerator() {
  const [numSwaras, setNumSwaras] = useState(4);
  const [complexity, setComplexity] = useState("Low");
  const [patternType, setPatternType] = useState("Mixed");
  const [selectedSwaras, setSelectedSwaras] = useState(swaras);
  const [pattern, setPattern] = useState([]);

  const handleGenerate = () => {
    const newPattern = generatePattern(numSwaras, complexity, selectedSwaras, patternType);
    setPattern(newPattern);
  };

  const toggleSwaraSelection = (swara) => {
    setSelectedSwaras((prev) =>
      prev.includes(swara) ? prev.filter((s) => s !== swara) : [...prev, swara]
    );
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <Card className="p-4 w-full max-w-md">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Swara Pattern Generator</h2>
          <div className="mb-2">
            <label className="block mb-1">Number of Swaras</label>
            <input
              type="number"
              min="3"
              max="8"
              value={numSwaras}
              onChange={(e) => setNumSwaras(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Complexity</label>
            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              className="border p-2 w-full"
            >
              <option>Low</option>
              <option>High</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Pattern Type</label>
            <select
              value={patternType}
              onChange={(e) => setPatternType(e.target.value)}
              className="border p-2 w-full"
            >
              <option>Mixed</option>
              <option>Arohana</option>
              <option>Avarohana</option>
              <option>Vakra</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Select Swaras</label>
            <div className="grid grid-cols-4 gap-2">
              {swaras.map((swara) => (
                <Button
                  key={swara}
                  onClick={() => toggleSwaraSelection(swara)}
                  className={`p-2 ${selectedSwaras.includes(swara) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {swara}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={handleGenerate} className="mt-4 w-full bg-green-500 text-white">
            Generate Pattern
          </Button>
          <div className="mt-4 p-2 border">
            <h3 className="font-bold">Generated Pattern:</h3>
            <p className="text-lg mt-2">{pattern.join(" - ")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

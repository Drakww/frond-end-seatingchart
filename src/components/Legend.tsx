import React from "react";

// Estructura de datos simplificada para las categorías
const categories = [
  { display: "Row Tickets Sales", dataKey: "Tickets Sales", color: "#ed3625ff" },
  { display: "GA Tickets Sales", dataKey: "Tickets Sales", color: "#09C82C" },
  { display: "Vip/Celebrities", dataKey: "Vip/Celebridades", color: "#e2d700ff" },
  { display: "Sponsor", dataKey: "Sponsor", color: "#0c00efff" },
  { display: "Influencers", dataKey: "Influencers", color: "#009fd9ff" },
  { display: "Press Magazines", dataKey: "Press Magazines", color: "#9d00ffff" },
  { display: "Potential Brands", dataKey: "Potential Brands", color: "#ff00eaff" },
  { display: "Project Lab Guest", dataKey: "Project Lab Guest", color: "#0a5300ff" },
  { display: "Complimentary", dataKey: "Complimentary", color: "#ff8400ff" },
  { display: "-Guests per Brand", dataKey: "Guests per Brand", color: "" },
  { display: "-Selected Models", dataKey: "Selected Models", color: "" },
  { display: "-Giveaway", dataKey: "Giveaway", color: "" },
  { display: "-Performers Guests", dataKey: "Performers Guests", color: "" },
  { display: "-Collabs", dataKey: "Collabs", color: "" }
];

interface LegendProps {
  ticketMap: {
    [ticketType: string]: {
      [category: string]: number;
    };
  };
}

export const Legend: React.FC<LegendProps> = ({ ticketMap }) => {
  const calculateRowCategoryCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {};

    // Inicializa todos los contadores en 0
    categories.forEach(cat => {
      counts[cat.display] = 0;
    });

    for (const ticketType in ticketMap) {
      if (Object.prototype.hasOwnProperty.call(ticketMap, ticketType)) {
        const categoriesInType = ticketMap[ticketType];

        // Lógica para el conteo de boletos de fila y GA
        if (ticketType.startsWith("Row ")) {
          counts["Row Tickets Sales"] += categoriesInType["Tickets Sales"] || 0;
        } else if (ticketType.startsWith("General")) {
          counts["GA Tickets Sales"] += categoriesInType["Tickets Sales"] || 0;
        }

        // Lógica para el resto de las categorías
        for (const category of categories) {
          // Salta las categorías de boletos ya manejadas
          if (category.dataKey === "Tickets Sales") {
            continue;
          }

          const count = categoriesInType[category.dataKey] || 0;
          counts[category.display] += count;

          // Lógica adicional: si es una subcategoría de Complimentary, suma el valor a Complimentary
          if (category.display.startsWith("-")) {
            counts["Complimentary"] += count;
          }
        }
      }
    }
    return counts;
  };

  const rowCategoryCounts = calculateRowCategoryCounts();

  return (
    <div className="flex flex-col gap-4 mt-4 md:mt-6 sm:mt-0 border border-black p-4 rounded-xl">
      <h3 className="bebas text-2xl text-center">Ticket Category Guide</h3>
      {categories.map((cat) => (
        <div key={cat.display} className="flex items-center gap-2">
          {cat.color && (
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
          )}
          <span className="text-sm font-semibold font-outfit text-black">
            {cat.display}
            <span className="ml-2 text-gray-500">({rowCategoryCounts[cat.display] || 0})</span>
          </span>
        </div>
      ))}
    </div>
  );
};
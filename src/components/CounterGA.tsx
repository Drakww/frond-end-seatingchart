import React from "react";

//Para 
// const categoryColors: Record<string, string> = {
// //   "Tickets Sales": "#3498db" se quita
//   "Press Magazines": "#e67e22",
//   "Sponsor": "#2ecc71",
//   "Influencers": "#2ac703ff",
//   "Project Lab Guest": "#1003c7ff"
// };

interface CounterGAProps {
  ticketMap: {
    [ticketType: string]: {
      [category: string]: number;
    };
  };
}

export const CounterGA: React.FC<CounterGAProps> = ({
  ticketMap,
}) => {
  const generalData = ticketMap["General Admission"] || {};
  const {"Tickets Sales": ticketsSales, ...generalNew} = generalData;
  const total = Object.values(generalNew).reduce((a, b) => a + b, 0);


  return (
    <div className="flex items-center justify-center rounded-lg py-2 w-8 h-10 lg:h-10 lg:w-16 text-xs bebas bg-gray-200 text-black shadow-inner flex-col">
      <div className="text-center font-bold text-xl">{total}</div>
    </div>
  );
};

import React from "react";

interface TicketMap {
  [ticketType: string]: {
    [category: string]: number;
  };
}

interface GeneralAdmissionBoxProps {
  ticketMap: TicketMap;
}

export const GeneralAdmissionBox: React.FC<GeneralAdmissionBoxProps> = ({
  ticketMap,
}) => {
  const generalData = ticketMap["General Admission"] || {};
  const ticketsSales = generalData["Tickets Sales"];
  // console.log(ticketsSales)
  // const total = Object.values(generalData).reduce((a, b) => a + b, 0);

  return (
    <div
      className="flex items-center justify-center rounded-lg py-2 w-8 h-10 lg:w-15 lg:h-10 text-xs bebas bg-gray-200 text-black shadow-inner flex-col">
      <div className="text-center font-bold text-xl">{ticketsSales}</div>
    </div>
  );
};
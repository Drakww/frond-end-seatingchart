import React from "react"; 

export interface Fecha {
  status: string;
  lastUpdate: string;
}

interface DateProps {
  fecha?: Fecha | null; // acepta null o undefined
}

const Date: React.FC<DateProps> = ({ fecha }) => {
  if (!fecha) {
    return (
      <div className="p-4 bg-gray-200 text-gray-800 rounded-lg shadow-md">
        <p className="font-bold text-lg">Last update</p>
        <p className="text-sm">Loading....</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-200 text-gray-800 rounded-lg shadow-md">
      <p className="font-bold text-lg">Last update</p>
      <p className="text-sm">{fecha.lastUpdate}</p>
    </div>
  );
};

export default Date;

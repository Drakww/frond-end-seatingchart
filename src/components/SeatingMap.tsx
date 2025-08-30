import React from "react";
import { SeatRow } from "./SeatRow";
import { GeneralAdmissionBox } from "./GeneralAdmissionBox";
import { Legend } from "./Legend";
import '../App.css'
import { SpecialCategories } from "./SpecialCategories";

import VipExperienceIz from "./vipExperience/VipExperienceIz";
import VipExperienceDere from "./vipExperience/VipExperienceDere";
import { CounterGA } from "./CounterGA";
import Date from "./update/Date";

interface TicketMap {
  [ticketType: string]: {
    [category: string]: number;
  };
}

interface SeatingMapProps {
  ticketMap: TicketMap;
  extras: { [categoryName: string]: number };
  isMiniMap?: boolean;
  fecha?: {
    status: string;
    lastUpdate: string;
  } | null;
}

export const SeatingMap: React.FC<SeatingMapProps> = ({ ticketMap, extras, isMiniMap, fecha }) => {



  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center">
      {/* Date */}
      <div className={isMiniMap ? "hidden" : "absolute left-2 mt-4 lg:block hidden"}>
        <Date fecha={fecha}/>
      </div>
      
      {/* Legend */}
      <div className={isMiniMap ? "hidden" : "hidden lg:block lg:mb-[14.5rem] mt-4"}>
        <Legend ticketMap={ticketMap} />
        <SpecialCategories extras={extras} />
      </div>

      {/* Seating Chart y Texto*/}
      <div className={isMiniMap ? "w-full flex flex-col items-center" : "w-full flex flex-col items-center mt-2 height-personalice md:mb-4 lg:mb-0 lg:w-auto lg:mx-6"}>

        {/* Seating Chart */}
        <div className="flex flex-row justify-around w-full">
          <p className="bebas text-xl lg:text-2xl">LEFT ROW</p>
          <p className="bebas text-xl lg:text-2xl">RIGHT ROW</p>
        </div>
        {/* Seating Chart */}
        <div className="scale-personalice flex flex-row justify-center">
          <div className={isMiniMap ? "hidden": "block"}><VipExperienceIz extras={extras}/> {/**Vip experience izquierda */}</div>
          {/* Left Rows (Vertical) */}
          <div className="position: relative flex flex-row items-start gap-1  pr-2 rounded-xl">
            {/*GA PANEL */}
            {/*Titulo pantallas pequeñas */}
            <h2 className="position: absolute bottom-5 left-5 z-1 lg:hidden sm:hidden bebas text-3xl">
              FREE <br/>
              GA 
              <CounterGA ticketMap={ticketMap}/>
            </h2>
            {/*Titulo pantallas grandes */}
            <h2 className="position: absolute bottom-15 left-10 z-1 hidden  lg:block bebas
              sm:block sm:text-xl sm:bottom-10 sm:left-0
            ">
              FREE General <br />Admission
              <div>
                <CounterGA ticketMap={ticketMap}/>
              </div>
            </h2>

            <div className="position: absolute bottom-0 flex items-end z-0">
              <div className="bg-[#09C82C] w-9 h-59 rounded-r-lg 
                md:w-12
              ">
              </div>
              <div className="bg-[#09C82C] w-12 h-39  rounded-tr-lg -ml-2
                md:w-15
              ">
              </div>
              <div className="bg-[#09C82C] w-12 h-19 rounded-r-lg -ml-1.5
                md:w-14.5
              ">
              </div>
            </div>
            {[5, 4, 3, 2, 1].map((row) => (
              <div key={`left-${row}`} className="flex flex-col justify-end items-center ">
                <SeatRow fila={row} side="Left" ticketMap={ticketMap} />
              </div>
            ))}
          </div>

          {/* RUNWAY */}
          <div className=" md:w-30 w-15 bg-black h-140 text-white text-center px-3 py-12 rounded-xl  md:min-w-[80px] flex flex-col justify-center items-center shadow-lg">
            <span className="w-100 transform rotate-90 font-bold text-3xl tracking-wide md:text-2xl bebas">RUNWAY 7 FASHION</span>
          </div>

          {/* Right Rows (Vertical) */}
          <div className=" position: relative flex flex-row items-start gap-1  pl-2 rounded-xl">

            {/*GA PANEL */}
            {/*Titulo pantallas pequeñas */}
            <h2 className="position: absolute bottom-5 right-3 z-1 lg:hidden sm:hidden bebas text-3xl">
              GA <br/>
              Sales
              <div>
                <GeneralAdmissionBox ticketMap={ticketMap}/>
              </div>
            </h2>
            {/*Titulo pantallas grandes */}
            <h2 className="position: absolute bottom-15 right-10 z-1 hidden lg:block bebas
              sm:block sm:text-xl sm:bottom-10 sm:-right-[32px]
            ">
              General Admission<br /> Sales
              <div>
                <GeneralAdmissionBox ticketMap={ticketMap}/>
              </div>
            </h2>

            <div className="position: absolute bottom-0 right-0 items-end flex flex-row-reverse z-0">
              <div className="bg-[#09C82C] w-9 h-59 rounded-tl-lg
                md:w-12
              ">
              </div>
              <div className="bg-[#09C82C] w-12 h-39 rounded-tl-lg -mr-2
                md:w-15
              ">
              </div>
              <div className="bg-[#09C82C] w-12 h-19 rounded-l-lg -mr-1.5
                md:w-14.5
              ">
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={`right-${row}`} className="flex flex-col justify-end items-center ">
                <SeatRow fila={row} side="Right" ticketMap={ticketMap} />
              </div>
            ))}
          </div>
          <div className={isMiniMap ? "hidden": "block"}><VipExperienceDere extras={extras}/>{/**Vip experience derecha */}</div>
        </div>


      </div>

      {/* General Admission Box y Leyenda: Solo visible en mapa GRANDE */}
      {/* La prop isMiniMap es 'false' en esta sección */}
      {isMiniMap ? null : (
        <div className="sm:w-full justify-around sm:mt-4 sm:flex sm:flex-row-reverse lg:w-auto lg:mt-0 lg:mb-[15.3rem]">
          
          <div>
            <div className=" sm:mt-0 sm:block lg:hidden">
              <Date fecha={fecha}/>
              <Legend ticketMap={ticketMap} />
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

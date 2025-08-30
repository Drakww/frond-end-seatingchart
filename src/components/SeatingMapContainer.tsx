import React, { useEffect, useState } from "react";
import { SeatingMap } from "./SeatingMap";
import type { Fecha } from "./update/Date";

// Define el orden explícito de tus horas de función
const FIXED_HOUR_ORDER: { [key: string]: number } = {
  "11AM": 1,
  "1PM": 2,
  "3PM": 3,
  "5PM": 4,
  "7PM": 5,
  "9PM": 6,
};

export const SeatingMapContainer = () => {
  const [allData, setAllData] = useState<{ [showKey: string]: any }>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [ticketMap, setTicketMap] = useState<any>({});
  const [currentExtras, setCurrentExtras] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [fecha, setFecha] = useState<Fecha | null>(null);


  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwpodW-IZzOPPvHLlCfc1a9yfumk5ySXNY_5MMSvpNif7RNo23AqTsNg-8mHMvGOZEr/exec')
      .then(respuesta => respuesta.json())
      .then((data: Fecha) => {
        // console.log(typeof data);
        setFecha(data);
      })
      .catch(error => console.error('Error al obtener la data:', error))
  }, []);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbz9JGC2lRHR_vy8mOn74ticCqdb3DrRMfy9YIzdaTBmVehzivR8dW3ONfXo0F57GMU/exec")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const { seats, extras } = data;
        setAllData({ seats, extras });
        const allShowKeys = Object.keys(seats);
        const uniqueDays = Array.from(new Set(allShowKeys.map(key => key.split(" - ")[0].trim())));
        const sortedDays = sortDays(uniqueDays);

        if (sortedDays.length > 0) {
          const firstDay = sortedDays[0];
          setSelectedDay(firstDay);
          const hoursForFirstDay = getHoursForDay(firstDay, allShowKeys);
          if (hoursForFirstDay.length > 0) {
            const firstHour = sortHours(hoursForFirstDay)[0];
            setSelectedHour(firstHour);
            const showKey = `${firstDay} - ${firstHour}`;
            setTicketMap(seats[showKey] || {});
            setCurrentExtras(extras[showKey] || {});
          } else {
            setTicketMap({});
            setCurrentExtras({});
          }
        } else {
          setError("No hay datos de espectáculos disponibles en el servidor.");
          setTicketMap({});
          setCurrentExtras({});
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar los datos:", err);
        setError("Error al cargar los datos de los espectáculos. Por favor, intenta de nuevo más tarde.");
        setLoading(false);
      });
  }, []);

  const getDayNumber = (dayStr: string) => parseInt(dayStr.replace(/\D/g, ''));
  const sortDays = (days: string[]) => days.sort((a, b) => getDayNumber(a) - getDayNumber(b));
  const sortHours = (hours: string[]) => {
    return hours.sort((a, b) => {
      const orderA = FIXED_HOUR_ORDER[a] !== undefined ? FIXED_HOUR_ORDER[a] : 999;
      const orderB = FIXED_HOUR_ORDER[b] !== undefined ? FIXED_HOUR_ORDER[b] : 999;
      return orderA - orderB;
    });
  };

  const getHoursForDay = (day: string, allKeys: string[]) => {
    return Array.from(new Set(allKeys
      .filter(key => key.startsWith(day + " - "))
      .map(key => key.split(" - ")[1].trim())));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value;
    setSelectedDay(newDay);

    if (newDay === "All") {
      setSelectedHour("All Show times");
      setTicketMap({});
      setCurrentExtras({});
    } else {
      const allShowKeys = Object.keys(allData.seats || {});
      const hoursForNewDay = getHoursForDay(newDay, allShowKeys);
      if (hoursForNewDay.length > 0) {
        const firstHour = sortHours(hoursForNewDay)[0];
        setSelectedHour(firstHour);
        const showkey = `${newDay} - ${firstHour}`;
        setTicketMap(allData.seats?.[showkey] || {});
        setCurrentExtras(allData.extras?.[showkey] || {});
      } else {
        setSelectedHour(null);
        setTicketMap({});
        setCurrentExtras({});
      }
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = e.target.value;
    setSelectedHour(newHour);

    if (selectedDay !== "All" && newHour !== "All Show times") {
      const showKey = `${selectedDay} - ${newHour}`;
      setTicketMap(allData.seats?.[showKey] || {});
      setCurrentExtras(allData.extras?.[showKey] || {});
    } else {
      setTicketMap({});
      setCurrentExtras({});
    }
  };

  const allShowKeys = Object.keys(allData.seats || {});
  const availableDays = sortDays(Array.from(new Set(allShowKeys.map(key => key.split(" - ")[0].trim()))));
  const availableHoursForSelectedDay = selectedDay && selectedDay !== "All"
    ? sortHours(getHoursForDay(selectedDay, allShowKeys))
    : sortHours(Array.from(new Set(allShowKeys.map(key => key.split(" - ")[1].trim()))));

  if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0F0F0F]">
      <div className="bg-[#0F0F0F] border-2 border-[#E6E6E6] rounded-2xl p-10 shadow-[0_0_20px_#FFFFFF] flex flex-col items-center space-y-6 w-96">
        
        {/* Logo con animación original */}
        <img
          src="/Logo.png"
          alt="Logo"
          className="w-24 h-24 object-contain animate-bounce drop-shadow-[0_0_15px_#FFFFFF]"
        />

        {/* Texto futurista */}
        <p className="text-[#E6E6E6] text-xl font-mono tracking-wide animate-pulse">
          Loading seat map...
        </p>

        {/* Loader circular con efecto neón */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-t-transparent border-[#E6E6E6] rounded-full animate-spin" />
          <div className="absolute inset-1 border-2 border-[#acacac] border-l-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-red-100 rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-6 w-96 text-red-700 border border-red-400">
          <p className="text-xl font-semibold text-center">¡Error!</p>
          <p className="text-center">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300">Recargar</button>
        </div>
      </div>
    );
  }

  const getAllCombinations = () => {
    const result: { day: string, hour: string }[] = [];
    if (!allData.seats) return result;

    const keys = Object.keys(allData.seats);

    const filteredKeys = keys.filter(key => {
      const [day, hour] = key.split(" - ").map(str => str.trim());
      const matchDay = selectedDay === "All" || day === selectedDay;
      const matchHour = selectedHour === "All Show times" || hour === selectedHour;
      return matchDay && matchHour;
    });

    filteredKeys.forEach(k => {
      const [day, hour] = k.split(" - ").map(str => str.trim());
      result.push({ day, hour });
    });

    return result.sort((a, b) => {
      const dayOrder = getDayNumber(a.day) - getDayNumber(b.day);
      if (dayOrder !== 0) return dayOrder;
      return FIXED_HOUR_ORDER[a.hour] - FIXED_HOUR_ORDER[b.hour];
    });
  };

  return (
    <div>
      <div className="py-4 bg-black flex items-center justify-center relative md:mb-0">
        <div className="absolute lg:left-10 left-10 top-5.5 lf:top-0 ">
          <img src="Logo.png" alt="Logo" className="h-auto w-6 lg:w-16" />
        </div>
        <div>{/**Qie este centrado */}
          <h2 className="text-white font-bold bebas text-3xl mb-2 text-center md:text-4xl">
            Digital seating chart
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 w-full px-4 gap-2">
            <label className="md:p-0 text-white font-semibold bebas text-[1.5rem] ">
              Select Day:
              <select
                value={selectedDay || ""}
                onChange={handleDayChange}
                className="ml-2 px-2 py-1 rounded bg-white md:bg-black text-black md:text-white border border-white bebas text-xl "
              >
                <option value="" disabled>Seleccionar día</option>
                <option value="All">All</option>
                {availableDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>

            {selectedDay && (
              <label className="md:p-0 text-white font-semibold bebas text-[1.5rem] mt-2 lg:mt-0">
                Select Hour:
                <select
                  value={selectedHour || ""}
                  onChange={handleHourChange}
                  className="ml-2 px-2 py-1 rounded bg-white md:bg-black text-black md:text-white border border-white bebas text-xl"
                  disabled={!selectedDay}
                >
                  <option value="" disabled>Seleccionar hora</option>
                  <option value="All Show times">All Show times</option>
                  {selectedDay === "All"
                    ? sortHours(Array.from(new Set(allShowKeys.map(key => key.split(" - ")[1].trim()))))
                      .map((hour) => <option key={hour} value={hour}>{hour}</option>)
                    : availableHoursForSelectedDay.map((hour) => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                </select>
              </label>
            )}
          </div>
        </div>
      </div>

      {selectedDay && selectedHour && (selectedDay === "All" || selectedHour === "All Show times") ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {getAllCombinations().map(({ day, hour }) => {
            const key = `${day} - ${hour}`;
            const seatData = allData.seats?.[key];
            const extrasData = allData.extras?.[key];

            if (!seatData) return null;

            return (
              <div
                key={key}
                className="border p-4 rounded-lg shadow hover:shadow-xl transition cursor-pointer"
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedHour(hour);
                  setTicketMap(seatData);
                  setCurrentExtras(extrasData || {});
                }}
              >
                <h3 className="text-lg font-bold text-center">{day} - {hour}</h3>
                {/* Aquí se usa SeatingMap en modo "mini" */}
                <SeatingMap ticketMap={seatData} extras={extrasData || {}} isMiniMap={true} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex bg-white">
          {selectedDay && selectedHour && Object.keys(ticketMap).length > 0 ? (
            // Aquí se usa SeatingMap en modo "normal"
            <SeatingMap ticketMap={ticketMap} extras={currentExtras} fecha={fecha}/>
          ) : (
            <div className="flex flex-1 items-center justify-center text-black text-xl text-center p-4">
              <p>Selecciona un día y una hora para ver el mapa de asientos.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
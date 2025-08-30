import React, { useEffect, useState } from 'react';

// Mapeo de paquetes a colores de Tailwind CSS.
// Los valores de color están en formato #RRGGBBAA para Tailwind
const packageColors: { [key: string]: string } = {
    'BRONZE': 'bg-[#835320ff]',
    'SILVER': 'bg-[#c8c8c8ff]',
    'GOLD': 'bg-[#ffcc00ff]',
    'PLATINUM': 'bg-[#7b7b7bff]',
    'available': 'bg-gray-200' // Usamos una clase de Tailwind para los disponibles
};

// --- Tu lista estática de IDs de asientos en el orden correcto ---
const orderedSeatIds = [
    'asiento-1', 'asiento-2', 'asiento-3', 'asiento-4', 'asiento-5',
    'asiento-6', 'asiento-7', 'asiento-8', 'asiento-9', 'asiento-10',
    'asiento-11', 'asiento-12', 'asiento-13', 'asiento-14', 'asiento-15',
    'asiento-16', 'asiento-17', 'asiento-18', 'asiento-19', 'asiento-20',
    'asiento-21', 'asiento-22', 'asiento-23', 'asiento-24', 'asiento-25',
    'asiento-26', 'asiento-27', 'asiento-28', 'asiento-29', 'asiento-30'
];

interface VipExperienceDereProps {
    extras: { [category: string]: number };
}

const VipExperienceDere: React.FC<VipExperienceDereProps> = ({ extras }) => {
    // Estado para guardar el paquete asignado a cada asiento.
    const [seatAssignments, setSeatAssignments] = useState<{ [id: string]: string }>({});

    useEffect(() => {
        const newAssignments: { [id: string]: string } = {};
        let seatIndex = 0;

        // Itera sobre los paquetes y asigna los asientos en el orden de `orderedSeatIds`.
        for (const packageName of Object.keys(packageColors)) {
            // No asignamos un color si la categoría es 'available'
            if (packageName !== 'available' && extras[packageName] > 0) {
                for (let i = 0; i < extras[packageName]; i++) {
                    if (orderedSeatIds[seatIndex]) {
                        const seatId = orderedSeatIds[seatIndex];
                        newAssignments[seatId] = packageName;
                        seatIndex++;
                    }
                }
            }
        }

        // El resto de los asientos que no fueron asignados se marcan como disponibles.
        for (let i = seatIndex; i < orderedSeatIds.length; i++) {
            newAssignments[orderedSeatIds[i]] = 'available';
        }

        setSeatAssignments(newAssignments);
    }, [extras]); // La dependencia `extras` hace que la lógica se ejecute solo cuando cambien los datos.

    // Función para obtener la clase de color
    const getSeatColorClass = (seatId: string) => {
        const status = seatAssignments[seatId] || 'available';
        return packageColors[status];
    };

    return (
        <div className="lg:flex md:flex hidden rounded-sm w-[10rem] h-140  items-center justify-center flex-col text-center relative ">
            <div className='absolute bg-[#09C82C] w-[50%] h-59 left-0 bottom-0 '></div>
            <div className='absolute bg-[#09C82C] w-[50%] h-99 left-1 top-0 rounded-t-lg'></div>
            
            <div className='z-2 relative'>
                <img src="/SeatingDere.png" alt="SeantingIz" className='w-auto h-[35rem] ' />
                
                {/* Asientos de la 1 a la 30, ahora pintados dinámicamente */}
                <div id="asiento-1" className={`absolute w-2 h-2 rounded-full cursor-pointer top-[8px] left-[108px] ${getSeatColorClass('asiento-1')}`}></div>
                <div id="asiento-2" className={`absolute w-2 h-2 rounded-full cursor-pointer top-[26px] left-[108px] ${getSeatColorClass('asiento-2')}`}></div>
                <div id="asiento-3" className={`absolute w-2 h-2 rounded-full cursor-pointer top-[84px] left-[103px] ${getSeatColorClass('asiento-3')}`}></div>
                <div id="asiento-4" className={`absolute w-2 h-2 rounded-full cursor-pointer top-[104px] left-[103px] ${getSeatColorClass('asiento-4')}`}></div>
                <div id="asiento-5" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[147.5px] left-[80px] ${getSeatColorClass('asiento-5')}`}></div>
                <div id="asiento-6" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[159.5px] left-[78px] ${getSeatColorClass('asiento-6')}`}></div>
                <div id="asiento-7" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[173px] left-[79px] ${getSeatColorClass('asiento-7')}`}></div>
                <div id="asiento-8" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[181.5px] left-[89px] ${getSeatColorClass('asiento-8')}`}></div>
                <div id="asiento-9" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[140.5px] left-[123px] ${getSeatColorClass('asiento-9')}`}></div>
                <div id="asiento-10" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[148px] left-[131px] ${getSeatColorClass('asiento-10')}`}></div>
                <div id="asiento-11" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[158px] left-[134.5px] ${getSeatColorClass('asiento-11')}`}></div>
                <div id="asiento-12" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[169px] left-[136px] ${getSeatColorClass('asiento-12')}`}></div>
                <div id="asiento-13" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[179px] left-[133.5px] ${getSeatColorClass('asiento-13')}`}></div>
                <div id="asiento-14" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[189px] left-[126.5px] ${getSeatColorClass('asiento-14')}`}></div>
                <div id="asiento-15" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[252px] left-[110.5px] ${getSeatColorClass('asiento-15')}`}></div>
                <div id="asiento-16" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[257.5px] left-[126.5px] ${getSeatColorClass('asiento-16')}`}></div>
                <div id="asiento-17" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[272.5px] left-[136.5px] ${getSeatColorClass('asiento-17')}`}></div>
                <div id="asiento-18" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[292.5px] left-[135.5px] ${getSeatColorClass('asiento-18')}`}></div>
                <div id="asiento-19" className={`absolute w-2.5 h-2.5 rounded-full cursor-pointer top-[308.5px] left-[125.5px] ${getSeatColorClass('asiento-19')}`}></div>
                <div id="asiento-20" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[254.5px] left-[76.5px] ${getSeatColorClass('asiento-20')}`}></div>
                <div id="asiento-21" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[264.5px] left-[65.5px] ${getSeatColorClass('asiento-21')}`}></div>
                <div id="asiento-22" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[280.5px] left-[61.5px] ${getSeatColorClass('asiento-22')}`}></div>
                <div id="asiento-23" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[295.5px] left-[60.5px] ${getSeatColorClass('asiento-23')}`}></div>
                <div id="asiento-24" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[311.5px] left-[60.5px] ${getSeatColorClass('asiento-24')}`}></div>
                <div id="asiento-25" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[326.5px] left-[65.5px] ${getSeatColorClass('asiento-25')}`}></div>
                <div id="asiento-26" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[364.5px] left-[120.5px] ${getSeatColorClass('asiento-26')}`}></div>
                <div id="asiento-27" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[380.5px] left-[120.5px] ${getSeatColorClass('asiento-27')}`}></div>
                <div id="asiento-28" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[394.5px] left-[110.5px] ${getSeatColorClass('asiento-28')}`}></div>
                <div id="asiento-29" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[398.5px] left-[96.5px] ${getSeatColorClass('asiento-29')}`}></div>
                <div id="asiento-30" className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[394.5px] left-[82.5px] ${getSeatColorClass('asiento-30')}`}></div>
            </div>
        </div>
    );
};

export default VipExperienceDere;
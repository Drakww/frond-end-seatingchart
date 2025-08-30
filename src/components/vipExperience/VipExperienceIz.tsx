import React, { useEffect, useState } from 'react';

// Mapeo de paquetes a colores de Tailwind CSS.
const packageColors: { [key: string]: string } = {
    'BRONZE': 'bg-[#835320ff]',
    'SILVER': 'bg-[#c8c8c8ff]',
    'GOLD': 'bg-[#ffcc00ff]',
    'PLATINUM': 'bg-[#7b7b7bff]',
    'available': 'bg-gray-200', // Clase para asientos disponibles
};

// IDs de los asientos del lado izquierdo en orden.
const orderedLeftSeatIds = [
    'asiento-31', 'asiento-32', 'asiento-33', 'asiento-34', 'asiento-35',
    'asiento-36', 'asiento-37', 'asiento-38', 'asiento-39', 'asiento-40',
    'asiento-41', 'asiento-42', 'asiento-43', 'asiento-44', 'asiento-45',
    'asiento-46', 'asiento-47', 'asiento-48', 'asiento-49', 'asiento-50',
    'asiento-51', 'asiento-52', 'asiento-53', 'asiento-54', 'asiento-55',
    'asiento-56', 'asiento-57', 'asiento-58', 'asiento-59', 'asiento-60',
    'asiento-61', 'asiento-62', 'asiento-63', 'asiento-64', 'asiento-65',
    'asiento-66', 'asiento-67', 'asiento-68', 'asiento-69', 'asiento-70',
    'asiento-71', 'asiento-72', 'asiento-73', 'asiento-74', 'asiento-75',
    'asiento-76', 'asiento-77', 'asiento-78', 'asiento-79', 'asiento-80',
    'asiento-81', 'asiento-82', 'asiento-83', 'asiento-84', 'asiento-85',
    'asiento-86', 'asiento-87', 'asiento-88', 'asiento-89', 'asiento-90',
    'asiento-91'
];

interface VipExperienceIzProps {
    extras: { [category: string]: number };
}

const VipExperienceIz: React.FC<VipExperienceIzProps> = ({ extras }) => {
    // Estado para guardar el paquete asignado a cada asiento.
    const [seatAssignments, setSeatAssignments] = useState<{ [id: string]: string }>({});

    useEffect(() => {
        let totalPeopleCount = 0;
        for (const category in extras) {
            totalPeopleCount += extras[category];
        }

        const newAssignments: { [id: string]: string } = {};
        
        // Calcula cuántas personas quedan por asignar después de llenar los 30 asientos del lado derecho.
        // const remainingPeople = Math.max(0, totalPeopleCount - 30);
        let leftSeatIndex = 0;

        // Asignamos los paquetes restantes a los asientos izquierdos.
        // Se itera por los paquetes en el orden en que aparecen en 'extras'.
        for (const packageName of Object.keys(extras)) {
            let peopleToAssign = extras[packageName];
            
            // Si el paquete ya ha sido cubierto en los 30 primeros asientos, continuamos.
            // Esto es importante para que los asientos izquierdos tomen el paquete restante.
            const totalPeople = Object.keys(extras).reduce((acc, current) => acc + extras[current], 0);
            
            // Si el total de personas es menor a 31, no asignamos nada en la izquierda.
            if (totalPeople <= 30) {
                break;
            }
            
            // Asignamos las personas restantes de cada paquete en orden.
            let assignedInRightSide = 0;
            // Calcular cuántas personas de este paquete se asignaron en la derecha
            // Esta lógica es crucial, el lado izquierdo solo debe asignar lo que sobra.
            if (totalPeopleCount > 30) {
                let currentTotal = 0;
                for (const packageKey of Object.keys(extras)) {
                    if (packageKey === packageName) {
                        assignedInRightSide = Math.min(30 - currentTotal, peopleToAssign);
                        break;
                    }
                    currentTotal += extras[packageKey];
                }
            }
            
            const remainingForThisPackage = peopleToAssign - assignedInRightSide;
            
            for (let i = 0; i < remainingForThisPackage; i++) {
                if (leftSeatIndex < orderedLeftSeatIds.length) {
                    const seatId = orderedLeftSeatIds[leftSeatIndex];
                    newAssignments[seatId] = packageName;
                    leftSeatIndex++;
                }
            }
        }

        // Marcar el resto de los asientos como disponibles.
        for (const seatId of orderedLeftSeatIds) {
            if (!newAssignments[seatId]) {
                newAssignments[seatId] = 'available';
            }
        }

        setSeatAssignments(newAssignments);
    }, [extras]);

    // Función para obtener la clase de color
    const getSeatColorClass = (seatId: string) => {
        const status = seatAssignments[seatId] || 'available';
        return packageColors[status];
    };

    return (
        <div className="lg:flex md:flex hidden rounded-sm w-[10rem] h-140 items-center justify-center flex-col text-center relative ">
            {/* Elementos de fondo */}
            <div className='absolute bg-[#09C82C] w-[50%] h-59 right-0 bottom-0 '></div>
            <div className='absolute bg-[#09C82C] w-[50%] h-99 right-1 top-0 rounded-t-lg'></div>
            
            {/* Puntos Vip Izquierdo */}
            <div className='z-2 relative'>
                <img src="/SeatingIz.png" alt="SeatingIz" className='w-auto h-[35rem]' />
                
                {/* Asientos del 31 en adelante, con los IDs únicos y en orden */}
                <div id='asiento-31' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[405.5px] left-[78px] ${getSeatColorClass('asiento-31')}`}></div>
                <div id='asiento-32' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[390.5px] left-[62px] ${getSeatColorClass('asiento-32')}`}></div>
                <div id='asiento-33' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[390.5px] left-[92px] ${getSeatColorClass('asiento-33')}`}></div>
                <div id='asiento-34' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[378.5px] left-[92px] ${getSeatColorClass('asiento-34')}`}></div>
                <div id='asiento-35' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[378.5px] left-[62px] ${getSeatColorClass('asiento-35')}`}></div>
                <div id='asiento-36' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[366.5px] left-[62px] ${getSeatColorClass('asiento-36')}`}></div>
                <div id='asiento-37' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[366.5px] left-[92px] ${getSeatColorClass('asiento-37')}`}></div>
                <div id='asiento-38' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[353.5px] left-[92px] ${getSeatColorClass('asiento-38')}`}></div>
                <div id='asiento-39' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[353.5px] left-[62px] ${getSeatColorClass('asiento-39')}`}></div>
                <div id='asiento-40' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[383.5px] left-[28px] ${getSeatColorClass('asiento-40')}`}></div>
                <div id='asiento-41' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[398.5px] left-[42px] ${getSeatColorClass('asiento-41')}`}></div>
                <div id='asiento-42' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[414.5px] left-[27px] ${getSeatColorClass('asiento-42')}`}></div>
                <div id='asiento-43' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[419.5px] left-[11px] ${getSeatColorClass('asiento-43')}`}></div>
                <div id='asiento-44' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[408.5px] left-[6px] ${getSeatColorClass('asiento-44')}`}></div>
                <div id='asiento-45' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[397.5px] left-[4px] ${getSeatColorClass('asiento-45')}`}></div>
                <div id='asiento-46' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[386.5px] left-[6px] ${getSeatColorClass('asiento-46')}`}></div>
                <div id='asiento-47' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[377.5px] left-[12px] ${getSeatColorClass('asiento-47')}`}></div>
                <div id='asiento-48' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[328.5px] left-[58px] ${getSeatColorClass('asiento-48')}`}></div>
                <div id='asiento-49' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[328.5px] left-[84px] ${getSeatColorClass('asiento-49')}`}></div>
                <div id='asiento-50' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[335.5px] left-[44px] ${getSeatColorClass('asiento-50')}`}></div>
                <div id='asiento-51' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[335.5px] left-[19px] ${getSeatColorClass('asiento-51')}`}></div>
                <div id='asiento-52' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[288.5px] left-[59px] ${getSeatColorClass('asiento-52')}`}></div>
                <div id='asiento-53' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[288.5px] left-[91px] ${getSeatColorClass('asiento-53')}`}></div>
                <div id='asiento-54' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[294.5px] left-[28.5px] ${getSeatColorClass('asiento-54')}`}></div>
                <div id='asiento-55' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[288.5px] left-[16.5px] ${getSeatColorClass('asiento-55')}`}></div>
                <div id='asiento-56' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[278px] left-[7.5px] ${getSeatColorClass('asiento-56')}`}></div>
                <div id='asiento-57' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[259px] left-[8px] ${getSeatColorClass('asiento-57')}`}></div>
                <div id='asiento-58' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[254px] left-[41px] ${getSeatColorClass('asiento-58')}`}></div>
                <div id='asiento-59' className={`absolute w-[0.7rem] h-[0.7rem] rounded-full cursor-pointer top-[265px] left-[47.5px] ${getSeatColorClass('asiento-59')}`}></div>
                <div id='asiento-60' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[252px] left-[62px] ${getSeatColorClass('asiento-60')}`}></div>
                <div id='asiento-61' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[252px] left-[90px] ${getSeatColorClass('asiento-61')}`}></div>
                <div id='asiento-62' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[241px] left-[90px] ${getSeatColorClass('asiento-62')}`}></div>
                <div id='asiento-63' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[241px] left-[62px] ${getSeatColorClass('asiento-63')}`}></div>
                <div id='asiento-64' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[230px] left-[90px] ${getSeatColorClass('asiento-64')}`}></div>
                <div id='asiento-65' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[230px] left-[62px] ${getSeatColorClass('asiento-65')}`}></div>
                <div id='asiento-66' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[232px] left-[41px] ${getSeatColorClass('asiento-66')}`}></div>
                <div id='asiento-67' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[232px] left-[10px] ${getSeatColorClass('asiento-67')}`}></div>
                <div id='asiento-68' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[210px] left-[10px] ${getSeatColorClass('asiento-68')}`}></div>
                <div id='asiento-69' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[199px] left-[10px] ${getSeatColorClass('asiento-69')}`}></div>
                <div id='asiento-70' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[199px] left-[41.5px] ${getSeatColorClass('asiento-70')}`}></div>
                <div id='asiento-71' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[210px] left-[41.5px] ${getSeatColorClass('asiento-71')}`}></div>
                <div id='asiento-72' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[187px] left-[76.5px] ${getSeatColorClass('asiento-72')}`}></div>
                <div id='asiento-73' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[180px] left-[67.5px] ${getSeatColorClass('asiento-73')}`}></div>
                <div id='asiento-74' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[170px] left-[60.5px] ${getSeatColorClass('asiento-74')}`}></div>
                <div id='asiento-75' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[172px] left-[31.5px] ${getSeatColorClass('asiento-75')}`}></div>
                <div id='asiento-76' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[172px] left-[3.5px] ${getSeatColorClass('asiento-76')}`}></div>
                <div id='asiento-77' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[152px] left-[10.5px] ${getSeatColorClass('asiento-77')}`}></div>
                <div id='asiento-78' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[138px] left-[10.5px] ${getSeatColorClass('asiento-78')}`}></div>
                <div id='asiento-79' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[125px] left-[10.5px] ${getSeatColorClass('asiento-79')}`}></div>
                <div id='asiento-80' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[112px] left-[10.5px] ${getSeatColorClass('asiento-80')}`}></div>
                <div id='asiento-81' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[139px] left-[43.5px] ${getSeatColorClass('asiento-81')}`}></div>
                <div id='asiento-82' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[127px] left-[43.5px] ${getSeatColorClass('asiento-82')}`}></div>
                <div id='asiento-83' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[86px] left-[43.5px] ${getSeatColorClass('asiento-83')}`}></div>
                <div id='asiento-84' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[86px] left-[9.5px] ${getSeatColorClass('asiento-84')}`}></div>
                <div id='asiento-85' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[62px] left-[9.5px] ${getSeatColorClass('asiento-85')}`}></div>
                <div id='asiento-86' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[62px] left-[42.5px] ${getSeatColorClass('asiento-86')}`}></div>
                <div id='asiento-87' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[40px] left-[36.5px] ${getSeatColorClass('asiento-87')}`}></div>
                <div id='asiento-88' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[34px] left-[45.5px] ${getSeatColorClass('asiento-88')}`}></div>
                <div id='asiento-89' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[38px] left-[10.5px] ${getSeatColorClass('asiento-89')}`}></div>
                <div id='asiento-90' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[24px] left-[10.5px] ${getSeatColorClass('asiento-90')}`}></div>
                <div id='asiento-91' className={`absolute w-[0.6rem] h-[0.6rem] rounded-full cursor-pointer top-[13.5px] left-[15.5px] ${getSeatColorClass('asiento-91')}`}></div>
            </div>
        </div>
    );
};

export default VipExperienceIz;
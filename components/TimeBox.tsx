// components/TimeBox.tsx
import React from 'react'

// Define os tipos das propriedades que o componente receberá
interface TimeBoxProps {
  value: string;
  label: string;
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center w-16 md:w-20">
      {/* A animação do transition é mais complexa em React,
          vamos focar na funcionalidade primeiro. A troca de número será instantânea. */}
      <span
        key={value}
        className="block bg-white text-black rounded-lg px-3 py-2 md:px-4 md:py-3 text-4xl md:text-6xl font-extrabold shadow-lg tracking-wider"
      >
        {value}
      </span>
      <small className="uppercase text-[0.6rem] mt-1 tracking-widest">{label}</small>
    </div>
  )
}

export default TimeBox
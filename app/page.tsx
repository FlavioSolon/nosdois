// app/page.tsx
'use client' // Diretiva necessária para usar hooks como useState e useEffect

import { useState, useEffect } from 'react'
import Image from 'next/image' // Componente de imagem otimizado do Next.js
import TimeBox from '@/components/TimeBox'
import { IoHeartOutline } from 'react-icons/io5'; // Um ícone simples e genérico para substituir o cacto

// Imagens para a galeria
const images = ['/img/couple1.jpg', '/img/couple2.jpg']

// Data-alvo: 28 SET 2025 00:00 (BRT, -03:00)
const targetDate = new Date('2025-09-28T00:00:00-03:00').getTime()

export default function HomePage() {
  const [counter, setCounter] = useState([
    { label: 'dias', value: '00' },
    { label: 'horas', value: '00' },
    { label: 'min', value: '00' },
    { label: 'seg', value: '00' },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = targetDate - Date.now()

      if (diff <= 0) {
        clearInterval(timer)
        setCounter([
            { label: 'dias', value: '00' },
            { label: 'horas', value: '00' },
            { label: 'min', value: '00' },
            { label: 'seg', value: '00' },
        ]);
        return
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0')
      const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0')

      setCounter([
        { label: 'dias', value: days },
        { label: 'horas', value: hours },
        { label: 'min', value: minutes },
        { label: 'seg', value: seconds },
      ])
    }, 1000)

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center bg-black font-inter text-white overflow-x-hidden">
      <header className="w-full text-center pt-10 pb-4 animate__animated animate__fadeInDown">
        <h1 className="font-great text-5xl md:text-7xl leading-tight">
          Flávio Sólon <span className="mx-2">💍</span> Brenda Raica
        </h1>
        {/* Frase do amor aumentada e com texto mais completo */}
        <p className="mt-2 text-lg tracking-wide opacity-90 md:text-xl md:mt-3">
          🌵 Nosso amor floresce e nos guia em cada passo. 🌵
        </p>
      </header>

      {/* Galeria de imagens centralizada e otimizada para mobile */}
      <section className="flex w-full justify-center px-4 overflow-hidden"> {/* Removido overflow-x-auto e snap */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4 max-w-screen-lg"> {/* Contêiner flexível para as imagens */}
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0 flex justify-center"> {/* Garante que cada imagem seja um item flexível e centralizada */}
              <Image
                src={src}
                alt="Casal feliz"
                // Ajuste para priorizar mobile: usar 'fill' e um contêiner com tamanho fixo para manter a proporção
                // Ou usar width/height fixos para controle mais rígido, com ajuste de 'object-cover'
                width={320} // Tamanho um pouco maior para mobile, ajustando para caber na tela
                height={427} // Proporcional a 320 (ex: 320 * 4/3)
                className="rounded-2xl shadow-xl object-cover" // object-cover para preencher o espaço
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 flex flex-col items-center gap-6 md:mt-8"> {/* Aumento do espaçamento superior */}
        <div className="flex gap-3 md:gap-5"> {/* Aumento do espaçamento entre as caixas de tempo */}
          {counter.map((unit) => (
            <TimeBox
              key={unit.label}
              value={unit.value}
              label={unit.label}
            />
          ))}
        </div>

        {/* Animação mais sutil para a frase "Coisa boa não se compartilha" */}
        <p className="animate__animated animate__fadeIn animate__slower animate__infinite text-center font-semibold italic text-xl md:text-2xl opacity-90">
          “Coisa boa não se compartilha”
        </p>

        <div className="animate__animated animate__fadeInUp animate__slower animate__infinite alternate flex gap-2 text-3xl md:text-4xl"> {/* Ícone mais simples e maior */}
          {/* Gera 5 ícones de coração */}
          {[...Array(5)].map((_, i) => <IoHeartOutline key={i} className="text-primary" />)} {/* Cor primária para o coração */}
        </div>
      </section>

      <footer className="mt-auto py-6 text-sm opacity-70"> {/* Aumento do padding e opacidade */}
        Feito com ❤️
      </footer>
    </main>
  )
}
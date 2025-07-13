// app/page.tsx
'use client' // Diretiva necessária para usar hooks como useState e useEffect

import { useState, useEffect, useRef } from 'react' // Importe useRef
import Image from 'next/image' // Componente de imagem otimizado do Next.js
import TimeBox from '@/components/TimeBox'
import { IoHeartOutline } from 'react-icons/io5'; // Um ícone simples e genérico
import { IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'; // Ícones para controle de volume

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
  ]);

  const audioRef = useRef<HTMLAudioElement>(null); // Referência para o elemento de áudio
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar se a música está tocando

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
        // Se a data-alvo for alcançada, você pode querer pausar a música ou mudar para outra
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
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
  }, []) // O array vazio faz com que o useEffect rode apenas uma vez (como o onMounted)

  // Função para controlar a reprodução/pausa da música
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          // Captura erros de reprodução (ex: bloqueio de autoplay)
          console.error("Erro ao tentar reproduzir a música:", error);
          // Você pode adicionar uma mensagem para o usuário aqui, se quiser
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-black font-inter text-white overflow-x-hidden">
      {/* Elemento de áudio escondido */}
      <audio ref={audioRef} src="/music/sonosdois.mp3" loop preload="auto" />

      {/* Botão de play/pause flutuante */}
      <button
        onClick={togglePlayPause}
        className="fixed bottom-4 right-4 z-50 p-3 bg-primary rounded-full shadow-lg text-white text-2xl md:text-3xl hover:scale-110 transition-transform duration-200"
        aria-label={isPlaying ? "Pausar música" : "Reproduzir música"}
      >
        {isPlaying ? <IoVolumeHighOutline /> : <IoVolumeMuteOutline />}
      </button>

      <header className="w-full text-center pt-10 pb-4 animate__animated animate__fadeInDown">
        <h1 className="font-great text-5xl md:text-7xl leading-tight">
          Flávio Sólon <span className="mx-2">💍</span> Brenda Raica
        </h1>
        <p className="mt-2 text-lg tracking-wide opacity-90 md:text-xl md:mt-3">
          Nosso amor floresce e nos guia em cada passo.
        </p>
      </header>

      <section className="flex w-full justify-center px-4 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4 max-w-screen-lg">
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0 flex justify-center">
              <Image
                src={src}
                alt="Casal feliz"
                width={320}
                height={427}
                className="rounded-2xl shadow-xl object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 flex flex-col items-center gap-6 md:mt-8">
        <div className="flex gap-3 md:gap-5">
          {counter.map((unit) => (
            <TimeBox
              key={unit.label}
              value={unit.value}
              label={unit.label}
            />
          ))}
        </div>

        <p className="animate__animated animate__fadeIn animate__slower animate__infinite text-center font-semibold italic text-xl md:text-2xl opacity-90">
          “Coisa boa não se compartilha”
        </p>

        <div className="animate__animated animate__fadeInUp animate__slower animate__infinite alternate flex gap-2 text-3xl md:text-4xl">
          {[...Array(5)].map((_, i) => <IoHeartOutline key={i} className="text-primary" />)}
        </div>
      </section>

      <footer className="mt-auto py-6 text-sm opacity-70">
        Feito com ❤️
      </footer>
    </main>
  )
}
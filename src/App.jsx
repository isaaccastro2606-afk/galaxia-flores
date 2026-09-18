import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, X } from 'lucide-react';

export default function App() {
  const [started, setStarted] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const canvasRef = useRef(null);
  const flowerCanvasRef = useRef(null);

  // GALAXIA OPTIMIZADA Y RESPONSIVE
  useEffect(() => {
    if (!started) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const isMobile = window.innerWidth < 768;
    const galaxyRadius = Math.min(window.innerWidth, window.innerHeight) * (isMobile ? 0.42 : 0.55);

    // Estrellas de fondo
    const backgroundStars = Array.from({ length: isMobile ? 80 : 130 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.01 + 0.005
    }));

    // Elementos de la Galaxia
    const numElements = isMobile ? 110 : 160;
    const elements = [];
    const flowers = ['🌻', '🌷', '🌷', '🌻'];

    for (let i = 0; i < numElements; i++) {
      const armIndex = i % 3;
      const armOffset = (armIndex * Math.PI * 2) / 3;

      elements.push({
        angle: Math.random() * Math.PI * 2 + armOffset,
        radius: Math.random() * galaxyRadius,
        speed: 0.0012 + Math.random() * 0.0018,
        size: Math.random() * (isMobile ? 16 : 20) + (isMobile ? 12 : 14),
        type: i % 2 === 0 ? 'flower' : 'star',
        flowerSymbol: flowers[Math.floor(Math.random() * flowers.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    // TUS 7 FRASES PERSONALIZADAS 🩵
    const phrases = [
      "Cuídate mucho siempre",
      "Siempre voy a estar orgulloso de ti",
      "Te mereces todo lo bonito",
      "Siempre serás el amor de mi vida",
      "No necesito un motivo para quererte",
      "Siempre puedes contar con mi apoyo",
      "Gracias por siempre haber estado para mí"
    ];

    const floatingTexts = phrases.map((text, idx) => ({
      text,
      angle: (idx * (Math.PI * 2)) / phrases.length,
      radius: (isMobile ? 70 : 100) + idx * (isMobile ? 22 : 28),
      speed: 0.0008 + idx * 0.0002
    }));

    const render = () => {
      ctx.fillStyle = '#010005';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Dibujar Estrellas de Fondo
      ctx.fillStyle = '#ffffff';
      backgroundStars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
        ctx.globalAlpha = Math.abs(star.alpha);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Constelaciones
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, isMobile ? 80 : 110, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, isMobile ? 150 : 210, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, isMobile ? 220 : 310, 0, Math.PI * 2);
      ctx.stroke();

      // Dibujar Flores y Estrellas
      elements.forEach((el) => {
        el.angle += el.speed;
        el.rotation += el.rotationSpeed;

        const x = centerX + Math.cos(el.angle) * el.radius;
        const y = centerY + Math.sin(el.angle) * el.radius;

        if (el.type === 'flower') {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(el.rotation);
          ctx.font = `${el.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(el.flowerSymbol, 0, 0);
          ctx.restore();
        } else {
          ctx.fillStyle = '#ffd700';
          ctx.globalAlpha = el.alpha;
          ctx.beginPath();
          ctx.arc(x, y, isMobile ? 1.4 : 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // Dibujar Frases
      ctx.font = isMobile ? '10px sans-serif' : '12px sans-serif';
      ctx.fillStyle = '#ffeaa7';
      ctx.textAlign = 'center';

      floatingTexts.forEach((txt) => {
        txt.angle += txt.speed;
        const x = centerX + Math.cos(txt.angle) * txt.radius;
        const y = centerY + Math.sin(txt.angle) * txt.radius;
        ctx.fillText(txt.text, x, y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [started]);

  // DIBUJO DE LA FLOR EN VIVO
  useEffect(() => {
    if (!showCard) return;

    const canvas = flowerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let progress = 0;
    let animId;

    const drawAnimatedFlower = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // 1. Tallo
      if (progress > 0) {
        ctx.strokeStyle = '#4caf50';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 35);
        const stemY = Math.max(cy, cy + 35 - progress * 35);
        ctx.lineTo(cx, stemY);
        ctx.stroke();
      }

      // 2. Pétalos
      if (progress > 0.2) {
        const petalProgress = (progress - 0.2) / 0.8;
        const totalPetals = 12;
        const petalsToDraw = Math.floor(petalProgress * totalPetals);

        for (let i = 0; i < petalsToDraw; i++) {
          const angle = (i * Math.PI * 2) / totalPetals;
          ctx.save();
          ctx.translate(cx, cy - 8);
          ctx.rotate(angle);

          ctx.fillStyle = '#ffd700';
          ctx.beginPath();
          ctx.ellipse(0, -18, 5, 14, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 3. Centro
      if (progress > 0.75) {
        ctx.fillStyle = '#5d4037';
        ctx.beginPath();
        ctx.arc(cx, cy - 8, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      if (progress < 1) {
        progress += 0.06;
        animId = requestAnimationFrame(drawAnimatedFlower);
      }
    };

    drawAnimatedFlower();

    return () => cancelAnimationFrame(animId);
  }, [showCard]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white select-none font-sans">
      
      {/* PANTALLA INICIAL */}
      {!started && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 text-center">
          <div 
            onClick={() => setStarted(true)}
            className="group cursor-pointer flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-white/5 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-amber-500/10"
          >
            <div className="relative">
              <span className="text-5xl md:text-6xl animate-bounce block">🌻</span>
              <Sparkles className="absolute -top-2 -right-2 text-amber-300 w-5 h-5 md:w-6 md:h-6 animate-pulse" />
            </div>
            <h1 className="text-xl md:text-2xl font-light tracking-widest text-amber-200 group-hover:text-amber-100">
              Toca para iniciar
            </h1>
          </div>
        </div>
      )}

      {/* GALAXIA CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* INTERFAZ */}
      {started && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 md:p-6 pointer-events-none">
          
          <header className="text-center mt-2 md:mt-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100">
              Feliz Día de las Flores Amarillas 🌻
            </h1>
          </header>

          {/* BOTÓN REUBICADO MÁS ARRIBA EN PANTALLAS MÓVILES */}
          <footer className="text-center mb-24 md:mb-12 pointer-events-auto">
            <button
              onClick={() => setShowCard(true)}
              className="px-6 py-3 rounded-full bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/50 text-amber-200 text-xs md:text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-md flex items-center gap-2 mx-auto shadow-lg shadow-amber-500/10 active:scale-95"
            >
              <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
              Abrir Mensaje
            </button>
          </footer>
        </div>
      )}

      {/* CARTA / MENSAJE */}
      {showCard && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xs sm:max-w-sm max-h-[85vh] overflow-y-auto p-5 md:p-6 rounded-2xl bg-gradient-to-b from-[#181204] to-[#090701] border border-amber-500/40 text-center shadow-2xl">
            
            <button 
              onClick={() => setShowCard(false)}
              className="absolute top-3 right-3 text-amber-400/60 hover:text-amber-300 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* FLOR DIBUJÁNDOSE EN VIVO */}
            <div className="flex justify-center my-1">
              <canvas ref={flowerCanvasRef} width={100} height={85} className="block" />
            </div>

            {/* FOTO */}
            <div className="my-3 mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden border-2 border-amber-400/50 shadow-md">
              <img 
                src="/foto.jpg" 
                alt="Nosotros" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=400";
                }}
              />
            </div>

            {/* MENSAJE PRINCIPAL CON CORAZÓN AZUL CLARO 🩵 */}
            <p className="text-sm sm:text-base md:text-lg font-medium text-amber-100 leading-relaxed tracking-wide mt-3">
              "Te amaré hoy, mañana y te amaré toda la vida." 🩵
            </p>

            <div className="mt-5 pt-3 border-t border-amber-500/20 text-[10px] sm:text-xs text-amber-400/60 uppercase tracking-widest">
              Para Nalvis ✨
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
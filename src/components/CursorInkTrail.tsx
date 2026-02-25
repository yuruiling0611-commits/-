import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  size: number;
  opacity: number;
  age: number;
}

const CursorInkTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw points
      pointsRef.current = pointsRef.current.filter(p => {
        p.age += 1;
        p.opacity *= 0.96;
        p.size *= 0.98;
        
        if (p.opacity < 0.01) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 26, 26, ${p.opacity})`;
        ctx.fill();
        
        // Add a slight blur effect
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(26, 26, 26, 0.2)';
        
        return true;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const sizeOffset = Math.random() * 6 - 3;
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 7 + sizeOffset,
        opacity: 0.4,
        age: 0
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Create a splash effect
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 40;
        const size = Math.random() * 15 + 10;
        pointsRef.current.push({
          x: e.clientX + Math.cos(angle) * distance,
          y: e.clientY + Math.sin(angle) * distance,
          size: size,
          opacity: 0.6,
          age: 0
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[1002]" 
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default CursorInkTrail;
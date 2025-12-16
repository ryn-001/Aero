import { useState, useEffect, useRef } from 'react';

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  ...props
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const move = e => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const limitX = width / 2 + padding * 0.5;
      const limitY = height / 2 + padding * 0.5;

      if (Math.abs(dx) < limitX && Math.abs(dy) < limitY) {
        setPos({
          x: dx / (magnetStrength * 1.2),
          y: dy / (magnetStrength * 1.2)
        });
      } else {
        setPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [padding, disabled, magnetStrength]);

  return (
    <div ref={ref} style={{ display: 'inline-block' }} {...props}>
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: 'transform 0.3s ease',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;

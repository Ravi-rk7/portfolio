'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

const MotionPreference = createContext({
  stopped: false,
  systemReduced: false,
  toggle: () => {},
});
export const useMotionPreference = () => useContext(MotionPreference);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const systemReduced = !!useReducedMotion();
  useEffect(() => {
    try {
      setPaused(localStorage.getItem('rk-motion') === 'paused');
    } catch {
      /* Storage is optional. */
    }
  }, []);
  const stopped = paused || systemReduced;
  useEffect(() => {
    document.documentElement.dataset.motion = stopped ? 'paused' : 'on';
  }, [stopped]);
  function toggle() {
    setPaused((value) => {
      try {
        localStorage.setItem('rk-motion', value ? 'on' : 'paused');
      } catch {
        /* Storage is optional. */
      }
      return !value;
    });
  }
  return (
    <MotionPreference.Provider value={{ stopped, systemReduced, toggle }}>
      <MotionConfig reducedMotion={stopped ? 'always' : 'user'}>
        {children}
      </MotionConfig>
    </MotionPreference.Provider>
  );
}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { stopped } = useMotionPreference();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        stopped ? { y: 0, opacity: 1 } : { y: [24, 0], opacity: [0.4, 1] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrambleText({
  text,
  className = '',
  onMount = false,
}: {
  text: string;
  className?: string;
  onMount?: boolean;
}) {
  const { stopped } = useMotionPreference();
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const run = useCallback(() => {
    if (stopped) return;
    if (timer.current) clearInterval(timer.current);
    let progress = 0;
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    timer.current = setInterval(() => {
      progress += 0.6;
      setDisplay(
        text
          .split('')
          .map((letter, index) =>
            letter === ' ' || index < progress
              ? letter
              : symbols[Math.floor(Math.random() * symbols.length)],
          )
          .join(''),
      );
      if (progress >= text.length && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, 35);
  }, [text, stopped]);
  useEffect(() => {
    if (onMount && !stopped) run();
    else setDisplay(text);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [text, stopped, onMount, run]);
  return (
    <span className={className} onPointerEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

export function MagneticLink({
  children,
  href,
  className = '',
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  const { stopped } = useMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });
  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: stopped ? 0 : springX, y: stopped ? 0 : springY }}
      onPointerMove={(event) => {
        if (stopped || event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </motion.a>
  );
}

export function PixelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { stopped } = useMotionPreference();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let width = 0,
      height = 0,
      frame = 0,
      last = 0;
    let pointer = { x: -1000, y: -1000 };
    function resize() {
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }
    function draw(time: number) {
      context!.clearRect(0, 0, width, height);
      for (let x = 14; x < width; x += 28) {
        for (let y = 14; y < height; y += 28) {
          const distance = Math.hypot(pointer.x - x, pointer.y - y);
          const influence = Math.max(0, 1 - distance / 200);
          const wave =
            (Math.sin(x * 0.014 + y * 0.011 + time * 0.0005) + 1) / 2;
          const alpha = 0.025 + wave * 0.055 + influence * 0.25;
          const size = 2 + influence * 4;
          context!.fillStyle = 'rgba(255,225,210,' + alpha + ')';
          context!.fillRect(x, y, size, size);
        }
      }
    }
    function tick(time: number) {
      if (time - last > 40 && document.visibilityState === 'visible') {
        draw(time);
        last = time;
      }
      frame = requestAnimationFrame(tick);
    }
    const parent = canvas.parentElement!;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || stopped) return;
      const bounds = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
    };
    const onLeave = () => {
      pointer = { x: -1000, y: -1000 };
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);
    if (!stopped) frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, [stopped]);
  return <canvas className="pixel-field" ref={canvasRef} aria-hidden="true" />;
}

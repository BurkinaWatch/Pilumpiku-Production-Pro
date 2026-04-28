import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export function AnimatedCounter({ end, suffix = "", label }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-6xl md:text-8xl text-primary mb-4">
        {count}{suffix}
      </div>
      <div className="uppercase tracking-[0.3em] text-xs text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

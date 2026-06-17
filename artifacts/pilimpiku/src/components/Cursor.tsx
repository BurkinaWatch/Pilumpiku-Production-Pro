import { useEffect, useRef } from "react";

export function Cursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const pendingX = useRef(0);
  const pendingY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const cycleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cycleStarted = useRef(false);

  const startCycle = (el: HTMLDivElement) => {
    if (cycleStarted.current) return;
    cycleStarted.current = true;

    const tick = () => {
      el.setAttribute("data-flap", "1");
      cycleTimer.current = setTimeout(() => {
        el.removeAttribute("data-flap");
        cycleTimer.current = setTimeout(tick, 2000);
      }, 5000);
    };

    tick();
  };

  const moveTo = (el: HTMLDivElement, x: number, y: number) => {
    pendingX.current = x;
    pendingY.current = y;

    if (rafRef.current === undefined) {
      rafRef.current = requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = `translate(${pendingX.current - 14}px, ${pendingY.current - 14}px)`;
        rafRef.current = undefined;
      });
    }
  };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const dt = now - lastT.current || 1;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      lastX.current = e.clientX;
      lastY.current = e.clientY;
      lastT.current = now;

      moveTo(el, e.clientX, e.clientY);

      if (speed > 0.25) startCycle(el);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const now = performance.now();
      const dx = touch.clientX - lastX.current;
      const dy = touch.clientY - lastY.current;
      const dt = now - lastT.current || 1;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      lastX.current = touch.clientX;
      lastY.current = touch.clientY;
      lastT.current = now;

      moveTo(el, touch.clientX, touch.clientY);

      if (speed > 0.25) startCycle(el);
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      lastX.current = touch.clientX;
      lastY.current = touch.clientY;
      lastT.current = performance.now();
      moveTo(el, touch.clientX, touch.clientY);
      startCycle(el);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(cycleTimer.current);
      cycleStarted.current = false;
    };
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 28,
        height: 28,
        pointerEvents: "none",
        zIndex: 100000,
        willChange: "transform",
        opacity: 0,
      }}
    >
      <svg
        viewBox="0 0 28 28"
        width="28"
        height="28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <g className="cursor-wing-left">
          <path d="M14 13C11.5 9.5 6 6 3 9C1 11.5 4 15 14 13Z" fill="#E98616" />
          <path d="M14 15C11 15 5 18 6 21.5C7 24 11 23 14 15Z" fill="#E98616" fillOpacity="0.72" />
        </g>
        <g className="cursor-wing-right">
          <path d="M14 13C16.5 9.5 22 6 25 9C27 11.5 24 15 14 13Z" fill="#E98616" />
          <path d="M14 15C17 15 23 18 22 21.5C21 24 17 23 14 15Z" fill="#E98616" fillOpacity="0.72" />
        </g>
        <ellipse cx="14" cy="14" rx="1" ry="4.5" fill="#3a1000" />
        <circle cx="14" cy="8.5" r="1.8" fill="#3a1000" />
        <circle cx="13.2" cy="7.5" r="0.5" fill="#E98616" />
        <circle cx="14.8" cy="7.5" r="0.5" fill="#E98616" />
      </svg>
    </div>
  );
}

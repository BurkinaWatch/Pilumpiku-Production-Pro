import { useEffect, useRef } from "react";

export function Cursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const pendingX = useRef(0);
  const pendingY = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const flapTimer = useRef<ReturnType<typeof setTimeout>>();
  const isFlapping = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const dt = now - lastT.current || 1;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      lastX.current = e.clientX;
      lastY.current = e.clientY;
      lastT.current = now;
      pendingX.current = e.clientX;
      pendingY.current = e.clientY;

      if (rafRef.current === undefined) {
        rafRef.current = requestAnimationFrame(() => {
          el.style.transform = `translate(${pendingX.current - 14}px, ${pendingY.current - 14}px)`;
          rafRef.current = undefined;
        });
      }

      if (speed > 0.25 && !isFlapping.current) {
        isFlapping.current = true;
        el.setAttribute("data-flap", "1");
      }

      clearTimeout(flapTimer.current);
      flapTimer.current = setTimeout(() => {
        isFlapping.current = false;
        el.removeAttribute("data-flap");
      }, 2000);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(flapTimer.current);
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
        zIndex: 9999,
        willChange: "transform",
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

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const dismiss = () => {
    if (exiting) return;
    setExiting(true);
    audioRef.current?.pause();
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const enableSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
    setSoundBlocked(false);
  };

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2500);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => dismiss();
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.85;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setSoundBlocked(true);
      });
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <audio
            ref={audioRef}
            src="/audio/generique.mp3"
            preload="none"
          />

          <video
            ref={videoRef}
            src="/video/generique.mp4"
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/img/logo.jpg"
              alt="Pilimpiku"
              className="w-10 h-10 object-contain rounded-md"
            />
            <div className="text-white">
              <p className="font-semibold tracking-[0.2em] text-sm uppercase leading-none">
                Pilimpiku
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 leading-none mt-0.5">
                Production
              </p>
            </div>
          </motion.div>

          <AnimatePresence>
            {soundBlocked && (
              <motion.button
                key="sound-enable"
                onClick={enableSound}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute top-8 right-10 flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-xs tracking-widest uppercase"
              >
                <VolumeX size={14} />
                <span>Activer le son</span>
              </motion.button>
            )}
            {!soundBlocked && (
              <motion.button
                key="sound-toggle"
                onClick={toggleMute}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className="absolute top-8 right-10 text-white/40 hover:text-white/80 transition-colors duration-300"
                title={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSkip && (
              <motion.button
                key="skip"
                onClick={dismiss}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-10 right-10 group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 text-sm tracking-widest uppercase"
              >
                <span>Passer</span>
                <span className="inline-block w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

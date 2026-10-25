'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// No audio files yet: the oven crackle is synthesised with Web Audio.
// Swap in /public/sound/*.mp3 later (door-creak, wood-crackle, peel-scrape).
type Ctx = { on: boolean; toggle: () => void; blip: (kind: 'creak' | 'scrape' | 'tick') => void };
const SoundCtx = createContext<Ctx | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const ac = useRef<AudioContext | null>(null);
  const crackle = useRef<{ stop: () => void } | null>(null);

  const ctx = () => {
    if (!ac.current) ac.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return ac.current;
  };

  const startCrackle = () => {
    const a = ctx();
    const len = a.sampleRate * 4;
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      // soft hiss + random pops
      d[i] = (Math.random() * 2 - 1) * 0.015;
      if (Math.random() < 0.0009) {
        const amp = 0.3 + Math.random() * 0.5;
        const n = 30 + Math.floor(Math.random() * 120);
        for (let j = 0; j < n && i + j < len; j++) d[i + j] += (Math.random() * 2 - 1) * amp * Math.exp(-j / 18);
      }
    }
    const src = a.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const lp = a.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2400;
    const g = a.createGain();
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.35, a.currentTime + 1);
    src.connect(lp).connect(g).connect(a.destination);
    src.start();
    crackle.current = {
      stop: () => {
        g.gain.linearRampToValueAtTime(0, a.currentTime + 0.4);
        setTimeout(() => src.stop(), 450);
      },
    };
  };

  const toggle = useCallback(() => {
    setOn((v) => {
      const next = !v;
      if (next) startCrackle();
      else crackle.current?.stop();
      try { localStorage.setItem('gnam-sound', next ? '1' : '0'); } catch {}
      return next;
    });
  }, []);

  const blip = useCallback((kind: 'creak' | 'scrape' | 'tick') => {
    if (!on) return;
    const a = ctx();
    const o = a.createOscillator();
    const g = a.createGain();
    if (kind === 'creak') { o.type = 'sawtooth'; o.frequency.setValueAtTime(90, a.currentTime); o.frequency.linearRampToValueAtTime(140, a.currentTime + 0.7); }
    else if (kind === 'scrape') { o.type = 'triangle'; o.frequency.setValueAtTime(300, a.currentTime); o.frequency.linearRampToValueAtTime(120, a.currentTime + 0.5); }
    else { o.type = 'square'; o.frequency.value = 1800; }
    const dur = kind === 'tick' ? 0.02 : kind === 'creak' ? 0.8 : 0.55;
    g.gain.setValueAtTime(kind === 'tick' ? 0.03 : 0.06, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    o.connect(g).connect(a.destination);
    o.start();
    o.stop(a.currentTime + dur);
  }, [on]);

  useEffect(() => () => crackle.current?.stop(), []);

  return <SoundCtx.Provider value={{ on, toggle, blip }}>{children}</SoundCtx.Provider>;
}

export function useSound() {
  const c = useContext(SoundCtx);
  if (!c) throw new Error('useSound outside provider');
  return c;
}

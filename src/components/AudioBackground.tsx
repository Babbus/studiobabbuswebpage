"use client";

import { useEffect, useRef } from "react";

type RGBA = [number, number, number, number];

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.trim().replace("#", "");
  if (h.length === 3) return [parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16)];
  if (h.length === 6) return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  return null;
}
const lerp = (a:number,b:number,t:number)=>a+(b-a)*t;
const lerpColor = (a:RGBA,b:RGBA,t:number):RGBA=>[
  Math.round(lerp(a[0],b[0],t)),
  Math.round(lerp(a[1],b[1],t)),
  Math.round(lerp(a[2],b[2],t)),
  lerp(a[3],b[3],t)
];
function makeNoise(seed=Math.random()*1e9){
  const rand=(x:number)=>{x^=x<<13;x^=x>>17;x^=x<<5;return (x<0?~x+1:x)%2147483647};
  const rnd=(x:number,y:number)=>{const n=rand(rand((x+seed)|0)+y|0);return (n%10000)/10000};
  const smooth=(t:number)=>t*t*(3-2*t);
  return (x:number,y:number)=>{const xi=Math.floor(x),yi=Math.floor(y);const xf=x-xi,yf=y-yi;const v00=rnd(xi,yi),v10=rnd(xi+1,yi),v01=rnd(xi,yi+1),v11=rnd(xi+1,yi+1);const u=smooth(xf),v=smooth(yf);return lerp(lerp(v00,v10,u),lerp(v01,v11,u),v)}
}

export default function AudioBackground(){
  const canvasRef=useRef<HTMLCanvasElement|null>(null);
  const rafRef=useRef<number|null>(null);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d",{alpha:true}); if(!ctx) return;

    // Offscreen low-res texture for performance
    const tex=document.createElement("canvas");
    const tctx=tex.getContext("2d",{alpha:true}); if(!tctx) return;

    let W=0,H=0,D=1;
    const setSize=()=>{
      W=window.innerWidth; H=window.innerHeight; D=Math.min(window.devicePixelRatio||1,2);
      canvas.style.width=`${W}px`; canvas.style.height=`${H}px`;
      canvas.width=Math.floor(W*D); canvas.height=Math.floor(H*D);
      ctx.setTransform(D,0,0,D,0,0);
      // choose texture size proportional to screen but capped
      const TX=Math.min(360, Math.max(220, Math.floor(W/4)));
      const TY=Math.min(200, Math.max(120, Math.floor(H/6)));
      tex.width=TX; tex.height=TY;
    };
    setSize(); window.addEventListener("resize",setSize);

    // Brand colors (fixed) for reliable inversion
    const teal = hexToRgb("#1ABC9C")!;
    const gold = hexToRgb("#F1C40F")!;
    const deepNavy = hexToRgb("#0E1A2B")!;
    const pureWhite = hexToRgb("#FFFFFF")!;

    const darkStops:RGBA[]=[[deepNavy[0],deepNavy[1],deepNavy[2],0.0],[teal[0],teal[1],teal[2],0.35],[150,120,255,0.55],[gold[0],gold[1],gold[2],0.75],[255,255,255,0.85]];
    const lightStops:RGBA[]=[[pureWhite[0],pureWhite[1],pureWhite[2],0.9],[gold[0],gold[1],gold[2],0.65],[150,120,255,0.45],[teal[0],teal[1],teal[2],0.3],[deepNavy[0],deepNavy[1],deepNavy[2],0.06]];

    const mqDark=window.matchMedia('(prefers-color-scheme: dark)');
    const isDark=()=>{const attr=document.documentElement.getAttribute('data-theme'); if(attr==='dark')return true; if(attr==='light')return false; return mqDark.matches;};

    const noise=makeNoise();

    let last=performance.now(); const fps=24; const interval=1000/fps; let acc=0;

    const render=(now:number)=>{
      const dt=now-last; last=now; acc+=dt; if(acc<interval){ rafRef.current=requestAnimationFrame(render); return;} acc=0;

      const TX=tex.width, TY=tex.height;
      const img=tctx.createImageData(TX, TY); const data=img.data;
      const t=Date.now()/1000;

      const useStops = isDark() ? darkStops : lightStops;
      const sample=(val:number):RGBA=>{ const c=Math.max(0,Math.min(1,val)); const m=useStops.length-1; const p=c*m; const i=Math.floor(p); return lerpColor(useStops[i], useStops[Math.min(i+1,m)], p-i); };

      // Generate spectrogram-like texture
      let off=0;
      for(let ypx=0; ypx<TY; ypx++){
        const fy=ypx/TY;
        for(let xpx=0; xpx<TX; xpx++){
          const fx=xpx/TX;
          const bands = 0.28*(1 - Math.abs(Math.sin((fy*TY)*0.08 + t*0.45)));
          const n1 = noise(fx*8.0 + Math.sin(t*0.25)*0.3, fy*48.0 + 3.0);
          const n2 = noise(fx*16.0 + 1.7, fy*96.0 + t*0.35);
          const n3 = noise(fx*32.0 + 4.1, fy*192.0 + t*0.6);
          let v = 0.5*n1 + 0.3*n2 + 0.2*n3 + bands;
          v = Math.pow(Math.max(0, v), 1.2);
          const [R,G,B,A]=sample(v);
          data[off++] = R; data[off++] = G; data[off++] = B; data[off++] = Math.round(A*255);
        }
      }
      tctx.putImageData(img,0,0);

      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0,0,W,H);
      ctx.globalAlpha = isDark() ? 0.18 : 0.12; // much subtler
      ctx.drawImage(tex, 0, 0, TX, TY, 0, 0, W, H);
      ctx.globalAlpha = 1;

      rafRef.current=requestAnimationFrame(render);
    };

    rafRef.current=requestAnimationFrame(render);

    return ()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current); window.removeEventListener("resize",setSize); };
  },[]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-[1] pointer-events-none" aria-hidden="true"/>;
} 
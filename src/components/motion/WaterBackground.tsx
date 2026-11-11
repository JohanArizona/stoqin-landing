"use client";

import { useEffect, useRef } from "react";

/**
 * Permukaan air transparan di belakang hero.
 *
 * - Tidak ada kotak/gambar: yang terlihat hanya pola titik halus latar yang membias,
 *   plus kilau cahaya & bayangan tipis di puncak riak. Saat air tenang, lapisan ini nyaris tak terlihat.
 * - Fisika: persamaan gelombang 2D di grid kecil (CPU), dirender WebGL dengan alpha.
 * - Gerak kursor di area hero = jejak riak; klik/ketuk = cipratan; diam = tetesan pelan sesekali.
 * - Hanya berjalan saat terlihat. Tanpa WebGL / "kurangi gerakan" = pola titik diam.
 */
export default function WaterBackground({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    if (!wrap || !host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tex = document.createElement("canvas");
    const glCanvas = document.createElement("canvas");
    for (const c of [tex, glCanvas]) {
      c.setAttribute("aria-hidden", "true");
      c.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none";
    }

    let gl: WebGLRenderingContext | null = null;
    if (!reduce) {
      gl = glCanvas.getContext("webgl", { antialias: false, premultipliedAlpha: true, alpha: true, powerPreference: "low-power" });
    }
    wrap.appendChild(gl ? glCanvas : tex);

    // ---------- Pola latar: titik-titik halus (transparan) ----------
    const drawScene = (w: number, h: number, dpr: number) => {
      tex.width = Math.round(w * dpr);
      tex.height = Math.round(h * dpr);
      const ctx = tex.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const step = 24;
      ctx.fillStyle = "rgba(15, 26, 20, 0.16)";
      for (let y = step / 2; y < h; y += step) {
        for (let x = step / 2; x < w; x += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // ---------- Simulasi air ----------
    let SW = 0,
      SH = 0;
    let cur = new Float32Array(0),
      prev = new Float32Array(0),
      bytes = new Uint8Array(0);
    const setupSim = (w: number, h: number) => {
      SW = w < 640 ? 110 : 200;
      SH = Math.max(40, Math.round((SW * h) / w));
      cur = new Float32Array(SW * SH);
      prev = new Float32Array(SW * SH);
      bytes = new Uint8Array(SW * SH);
    };
    const disturb = (sx: number, sy: number, radius: number, amount: number) => {
      const r2 = radius * radius;
      for (let y = Math.max(1, Math.floor(sy - radius)); y < Math.min(SH - 1, Math.ceil(sy + radius)); y++) {
        for (let x = Math.max(1, Math.floor(sx - radius)); x < Math.min(SW - 1, Math.ceil(sx + radius)); x++) {
          const d2 = (x - sx) ** 2 + (y - sy) ** 2;
          if (d2 < r2) cur[y * SW + x] += amount * (1 - Math.sqrt(d2) / radius);
        }
      }
    };
    const stepSim = () => {
      for (let y = 1; y < SH - 1; y++) {
        const o = y * SW;
        for (let x = 1; x < SW - 1; x++) {
          const i = o + x;
          const v = (cur[i - 1] + cur[i + 1] + cur[i - SW] + cur[i + SW]) * 0.5 - prev[i];
          prev[i] = v * 0.984;
        }
      }
      const t = cur;
      cur = prev;
      prev = t;
    };

    // ---------- WebGL ----------
    let prog: WebGLProgram | null = null;
    let imgTex: WebGLTexture | null = null;
    let hTex: WebGLTexture | null = null;
    let uPx: WebGLUniformLocation | null = null;
    if (gl) {
      const vs = `attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
      // Keluaran premultiplied alpha: titik yang membias + bayangan hijau tipis + kilau putih.
      const fs = `precision mediump float;varying vec2 uv;uniform sampler2D img;uniform sampler2D hm;uniform vec2 px;
      void main(){
        float l=texture2D(hm,uv-vec2(px.x,0.)).r, r=texture2D(hm,uv+vec2(px.x,0.)).r;
        float d=texture2D(hm,uv-vec2(0.,px.y)).r, u=texture2D(hm,uv+vec2(0.,px.y)).r;
        vec2 g=vec2(r-l,u-d);
        vec4 dots=texture2D(img,clamp(uv+g*.2,0.001,.999));
        vec3 n=normalize(vec3(-g*7.,1.));
        vec3 L=normalize(vec3(-.45,.55,.7));
        float spec=max(pow(max(dot(n,L),0.),36.)-pow(L.z,36.),0.);
        float shade=max(-dot(g,vec2(-.45,.55))*2.4,0.);
        float aSh=clamp(shade*.34,0.,.3);
        float aSp=clamp(spec*1.3,0.,.9);
        vec4 c=dots;                                         // premultiplied dari canvas
        c=vec4(vec3(0.,.41,.05)*aSh,aSh)+c*(1.-aSh);          // bayangan hijau
        c=vec4(vec3(1.)*aSp,aSp)+c*(1.-aSp);                  // kilau
        gl_FragColor=c;
      }`;
      const sh = (type: number, src: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, src);
        gl!.compileShader(s);
        return s;
      };
      prog = gl.createProgram()!;
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        glCanvas.replaceWith(tex);
        gl = null;
      } else {
        gl.useProgram(prog);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, "p");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        const mk = (unit: number) => {
          const t = gl!.createTexture();
          gl!.activeTexture(gl!.TEXTURE0 + unit);
          gl!.bindTexture(gl!.TEXTURE_2D, t);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
          return t;
        };
        imgTex = mk(0);
        hTex = mk(1);
        gl.uniform1i(gl.getUniformLocation(prog, "img"), 0);
        gl.uniform1i(gl.getUniformLocation(prog, "hm"), 1);
        uPx = gl.getUniformLocation(prog, "px");
        gl.clearColor(0, 0, 0, 0);
      }
    }

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      drawScene(w, h, dpr);
      setupSim(w, h);
      if (gl && prog) {
        glCanvas.width = Math.round(w * dpr);
        glCanvas.height = Math.round(h * dpr);
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, imgTex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);
        gl.uniform2f(uPx, 1 / SW, 1 / SH);
      }
    };
    layout();
    const ro = new ResizeObserver(() => layout());
    ro.observe(wrap);

    if (!gl) {
      return () => {
        ro.disconnect();
        tex.remove();
      };
    }

    // ---------- Interaksi (didengar di seluruh hero, kanvas tidak menghalangi klik) ----------
    let lastX = -1,
      lastY = -1,
      lastInput = 0;
    const toSim = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      return [((e.clientX - r.left) / r.width) * SW, ((e.clientY - r.top) / r.height) * SH] as const;
    };
    const onMove = (e: PointerEvent) => {
      const [x, y] = toSim(e);
      if (lastX >= 0) {
        const dist = Math.hypot(x - lastX, y - lastY);
        const n = Math.min(14, Math.ceil(dist / 1.5));
        for (let k = 1; k <= n; k++) disturb(lastX + ((x - lastX) * k) / n, lastY + ((y - lastY) * k) / n, 2.6, 1.25);
      }
      lastX = x;
      lastY = y;
      lastInput = performance.now();
    };
    const onLeave = () => {
      lastX = lastY = -1;
    };
    const onDown = (e: PointerEvent) => {
      const [x, y] = toSim(e);
      disturb(x, y, 5.5, 9);
      lastInput = performance.now();
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    let visible = false;
    let lastDrop = 0;
    const g = gl;
    const loop = (t: number) => {
      raf = 0;
      if (!visible) return;
      if (t - lastInput > 2500 && t - lastDrop > 1400) {
        disturb(4 + Math.random() * (SW - 8), 4 + Math.random() * (SH - 8), 3, 2.6);
        lastDrop = t;
      }
      stepSim();
      // Baris sim 0 = atas layar, sedangkan uv.y 0 = bawah → tulis terbalik.
      for (let y = 0; y < SH; y++) {
        const src = y * SW;
        const dst = (SH - 1 - y) * SW;
        for (let x = 0; x < SW; x++) {
          const v = 128 + cur[src + x] * 26;
          bytes[dst + x] = v < 0 ? 0 : v > 255 ? 255 : v;
        }
      }
      g.activeTexture(g.TEXTURE1);
      g.bindTexture(g.TEXTURE_2D, hTex);
      g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false);
      g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      g.pixelStorei(g.UNPACK_ALIGNMENT, 1);
      g.texImage2D(g.TEXTURE_2D, 0, g.LUMINANCE, SW, SH, 0, g.LUMINANCE, g.UNSIGNED_BYTE, bytes);
      g.clear(g.COLOR_BUFFER_BIT);
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      g.getExtension("WEBGL_lose_context")?.loseContext();
      glCanvas.remove();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_75%,transparent)] ${className}`}
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ARROW, CUBE_FRONT, CUBE_SIDE, LogoMark } from "@/components/brand/Logo";

/**
 * Logo Stoqin 3D: tiga path logo diekstrusi dengan Three.js.
 * - Three.js dimuat dinamis hanya saat elemen mendekati layar (tidak membebani muatan awal).
 * - Mengikuti pointer, bisa diputar dengan drag (dengan inersia), dan berhenti me-render saat tak terlihat.
 * - Reduced motion / WebGL tidak ada → logo SVG datar.
 */
export default function Logo3D({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"idle" | "3d" | "flat">("idle");

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("flat");
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        setMode("flat");
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab";
      renderer.domElement.setAttribute("aria-hidden", "true");
      wrap.appendChild(renderer.domElement);
      setMode("3d");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
      camera.position.set(0, 0, 76);

      scene.add(new THREE.HemisphereLight(0xffffff, 0xd9e8dc, 1.6));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(12, 18, 24);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xfff1c4, 1.4);
      rim.position.set(-20, -6, -10);
      scene.add(rim);

      const loader = new SVGLoader();
      const group = new THREE.Group();
      const parts: [string, number, number][] = [
        [CUBE_SIDE, 0x00770d, 3.2],
        [CUBE_FRONT, 0x00aa13, 3.2],
        [ARROW, 0x2bb83b, 4.2],
      ];
      const geos: import("three").BufferGeometry[] = [];
      const mats: import("three").Material[] = [];
      for (const [d, color, depth] of parts) {
        const data = loader.parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`);
        const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.38, metalness: 0.04, side: THREE.DoubleSide });
        mats.push(mat);
        for (const p of data.paths) {
          for (const shape of SVGLoader.createShapes(p)) {
            const geo = new THREE.ExtrudeGeometry(shape, {
              depth,
              bevelEnabled: true,
              bevelThickness: 0.35,
              bevelSize: 0.22,
              bevelSegments: 5,
              curveSegments: 28,
            });
            geo.translate(0, 0, -depth / 2);
            geos.push(geo);
            group.add(new THREE.Mesh(geo, mat));
          }
        }
      }
      // SVG: sumbu Y ke bawah → balik, lalu pusatkan.
      group.scale.set(1.6, -1.6, 1.6);
      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      group.position.sub(center);
      const pivot = new THREE.Group();
      pivot.add(group);
      scene.add(pivot);

      const resize = () => {
        const w = wrap.clientWidth || 1;
        const h = wrap.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      // Interaksi: pointer → kemiringan; drag → putaran dengan inersia.
      let tx = 0,
        ty = 0,
        spin = 0,
        vel = 0.004,
        dragging = false,
        lastX = 0,
        t = 0;
      const onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        tx = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 1.2;
        ty = ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 0.9;
        if (dragging) {
          vel = (e.clientX - lastX) * 0.006;
          spin += vel;
          lastX = e.clientX;
        }
      };
      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        renderer.domElement.style.cursor = "grabbing";
      };
      const onUp = () => {
        dragging = false;
        renderer.domElement.style.cursor = "grab";
      };
      const onClick = () => {
        vel += 0.18;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      renderer.domElement.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      renderer.domElement.addEventListener("dblclick", onClick);

      let raf = 0;
      let visible = false;
      const loop = () => {
        raf = 0;
        if (!visible) return;
        t += 0.016;
        if (!dragging) {
          vel += (0.004 - vel) * 0.02; // kembali pelan ke putaran santai
          spin += vel;
        }
        pivot.rotation.y += (spin + tx * 0.9 - pivot.rotation.y) * 0.08;
        pivot.rotation.x += (ty * 0.6 + Math.sin(t * 0.9) * 0.05 - pivot.rotation.x) * 0.08;
        pivot.position.y = Math.sin(t * 1.2) * 0.6;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      });
      io.observe(wrap);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        geos.forEach((g) => g.dispose());
        mats.forEach((m) => m.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Muat Three.js hanya saat mendekati layar.
    const pre = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          pre.disconnect();
          start();
        }
      },
      { rootMargin: "400px" },
    );
    pre.observe(wrap);

    return () => {
      disposed = true;
      pre.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={wrapRef} className="absolute inset-0" data-cursor="Putar" />
      {mode !== "3d" ? (
        <div className="absolute inset-0 grid place-items-center">
          <LogoMark className="h-[58%] w-auto" />
        </div>
      ) : null}
      {/* bayangan lantai */}
      <div aria-hidden className="pointer-events-none absolute bottom-[4%] left-1/2 h-[7%] w-[46%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-xl" />
    </div>
  );
}

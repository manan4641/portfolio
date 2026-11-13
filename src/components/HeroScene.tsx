"use client";

import { useEffect, useRef } from "react";
import { fontStack, intro, pointer, prefersReduced } from "@/lib/motion";

/**
 * Fixed full-viewport three.js scene behind the Home page.
 * Direct port of initHero() from the design file. three.js is imported lazily
 * after first paint so it never blocks the server-rendered hero text (LCP).
 */
export default function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    let dead = false;
    let raf = 0;
    let dispose: (() => void) | undefined;

    const start = async () => {
      let THREE: typeof import("three");
      try {
        [THREE] = await Promise.all([import("three"), document.fonts?.ready]);
      } catch {
        return;
      }
      if (dead) return;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return;
      }
      const reduced = prefersReduced();
      const FD = fontStack("display"), FB = fontStack("body"), FM = fontStack("mono");
      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      cam.position.set(0, 0, 9);
      type G = CanvasRenderingContext2D;
      const tex = (w: number, h: number, draw: (g: G, w: number, h: number) => void) => {
        const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d")!, w, h);
        const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
      };
      const rr = (g: G, x: number, y: number, w: number, h: number, r: number, fill?: string | CanvasGradient | null, stroke?: string) => {
        g.beginPath(); g.roundRect(x, y, w, h, r);
        if (fill) { g.fillStyle = fill; g.fill(); }
        if (stroke) { g.strokeStyle = stroke; g.lineWidth = 2; g.stroke(); }
      };
      const rig = new THREE.Group(); scene.add(rig);
      const floats: { o: import("three").Object3D; x: number; y: number; sp: number; amp: number; ph: number }[] = [];
      const addFloat = <T extends import("three").Object3D>(o: T, sp: number, amp: number) => { floats.push({ o, x: o.position.x, y: o.position.y, sp, amp, ph: Math.random() * 6 }); return o; };
      scene.add(new THREE.AmbientLight(0x9fc4e8, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 1.4); dl.position.set(3, 4, 6); scene.add(dl);
      const p1 = new THREE.PointLight(0x4a9ee6, 60, 30); p1.position.set(-4, 2, 4); scene.add(p1);
      const p2 = new THREE.PointLight(0xf6b40e, 60, 30); p2.position.set(5, -2, 3); scene.add(p2);
      const dark = new THREE.MeshStandardMaterial({ color: 0x1b212b, metalness: 0.85, roughness: 0.32 });

      // monitor
      const mon = new THREE.Group(); rig.add(mon);
      mon.add(new THREE.Mesh(new THREE.BoxGeometry(3.74, 2.36, 0.1), dark));
      const screenTex = tex(1280, 800, (g, w, h) => {
        let gr: CanvasGradient = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, "#0a0e14"); gr.addColorStop(1, "#0f1a2a"); g.fillStyle = gr; g.fillRect(0, 0, w, h);
        gr = g.createRadialGradient(w * 0.78, h * 0.4, 0, w * 0.78, h * 0.4, 420); gr.addColorStop(0, "rgba(74,158,230,.55)"); gr.addColorStop(1, "rgba(74,158,230,0)"); g.fillStyle = gr; g.fillRect(0, 0, w, h);
        g.fillStyle = "#8cc4f2"; g.beginPath(); g.arc(70, 62, 12, 0, 7); g.fill(); g.fillStyle = "rgba(255,255,255,.55)";
        [560, 680, 800, 920].forEach((x) => rr(g, x, 55, 76, 12, 6, "rgba(255,255,255,.4)")); rr(g, 1080, 40, 140, 44, 22, "#eef3f8");
        g.fillStyle = "#fff"; g.font = `700 64px ${FD}`; g.fillText("A portfolio showcasing", 70, 248); g.fillText("my journey as a", 70, 320);
        gr = g.createLinearGradient(70, 0, 560, 0); gr.addColorStop(0, "#8cc4f2"); gr.addColorStop(1, "#eef6fd"); g.fillStyle = gr; g.fillText("Web Developer", 70, 392);
        rr(g, 70, 440, 470, 14, 7, "rgba(255,255,255,.3)"); rr(g, 70, 470, 380, 14, 7, "rgba(255,255,255,.3)"); rr(g, 70, 530, 210, 60, 30, "#4a9ee6"); rr(g, 300, 530, 160, 60, 30, null, "rgba(255,255,255,.4)");
        rr(g, 850, 170, 360, 420, 28, "rgba(255,255,255,.07)", "rgba(255,255,255,.2)"); rr(g, 880, 200, 300, 190, 16, "rgba(140,196,242,.35)"); rr(g, 880, 420, 220, 14, 7, "rgba(255,255,255,.45)"); rr(g, 880, 452, 280, 12, 6, "rgba(255,255,255,.22)"); rr(g, 880, 520, 120, 40, 20, "#f6b40e");
        [70, 460, 850].forEach((x) => rr(g, x, 660, 360, 200, 22, "rgba(255,255,255,.06)", "rgba(255,255,255,.14)"));
      });
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.22), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false })); scr.position.z = 0.052; mon.add(scr);
      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.8, 0.06), dark); neck.position.set(0, -1.5, -0.06); mon.add(neck);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.76, 0.05, 48), dark); base.position.set(0, -1.92, 0); base.scale.z = 0.55; mon.add(base); addFloat(mon, 0.6, 0.06);

      // glow
      const glowTex = tex(256, 256, (g) => { const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, "rgba(90,165,235,.9)"); gr.addColorStop(0.4, "rgba(74,140,220,.28)"); gr.addColorStop(1, "rgba(74,140,220,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); });
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.7 })); glow.scale.set(9, 9, 1); glow.position.set(0, 0, -2); rig.add(glow);

      // panels
      const panel = (t: import("three").Texture, w: number, h: number, x: number, y: number, z: number, ry: number) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide, toneMapped: false, depthWrite: false }));
        m.position.set(x, y, z); m.rotation.y = ry; rig.add(m); return m;
      };
      const codeTex = tex(640, 760, (g, w, h) => {
        rr(g, 3, 3, w - 6, h - 6, 30, "rgba(13,19,30,.86)", "rgba(140,196,242,.5)");
        ["#3a4658", "#3a4658", "#3a4658"].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(46 + i * 30, 50, 9, 0, 7); g.fill(); });
        g.font = `500 25px ${FM}`;
        const L: [string, string][][] = [[["<?php", "#f9c846"]], [], [["add_action", "#8cc4f2"], ["( ", "#c8d3e0"], ["'init'", "#9fd8ff"], [", function () {", "#c8d3e0"]], [["  register_post_type", "#8cc4f2"], ["(", "#c8d3e0"]], [["    'project'", "#9fd8ff"], [", [", "#c8d3e0"]], [["    'public'", "#9fd8ff"], [" => ", "#c8d3e0"], ["true", "#f9c846"], [",", "#c8d3e0"]], [["    'show_in_rest'", "#9fd8ff"], [" => ", "#c8d3e0"], ["true", "#f9c846"], [",", "#c8d3e0"]], [["    'supports'", "#9fd8ff"], [" => [", "#c8d3e0"]], [["      'title'", "#9fd8ff"], [", ", "#c8d3e0"], ["'editor'", "#9fd8ff"]], [["    ],", "#c8d3e0"]], [["  ] );", "#c8d3e0"]], [["} );", "#c8d3e0"]], [], [["// fast. secure. editable.", "#74829a"]]];
        L.forEach((segs, i) => { let x = 44; g.fillStyle = "#4a5870"; g.fillText(String(i + 1).padStart(2, " "), x, 130 + i * 42); x += 56; segs.forEach((s) => { g.fillStyle = s[1]; g.fillText(s[0], x, 130 + i * 42); x += g.measureText(s[0]).width; }); });
      });
      addFloat(panel(codeTex, 1.55, 1.84, -2.3, 0.3, 0.95, 0.38), 0.8, 0.1);
      const vitTex = tex(640, 360, (g, w, h) => {
        rr(g, 3, 3, w - 6, h - 6, 30, "rgba(13,19,30,.86)", "rgba(249,200,70,.5)"); g.fillStyle = "#c8d3e0"; g.font = `600 26px ${FB}`; g.fillText("Core Web Vitals", 44, 66);
        ["LCP", "INP", "CLS"].forEach((t, i) => { const x = 120 + i * 200, y = 210; g.lineWidth = 14; g.lineCap = "round"; g.strokeStyle = "rgba(255,255,255,.1)"; g.beginPath(); g.arc(x, y, 62, 0, 7); g.stroke(); g.strokeStyle = ["#9fd8ff", "#8cc4f2", "#f9c846"][i]; g.beginPath(); g.arc(x, y, 62, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * [0.94, 0.9, 0.97][i]); g.stroke(); g.fillStyle = "#fff"; g.font = `700 30px ${FM}`; g.textAlign = "center"; g.fillText(t, x, y + 10); g.textAlign = "left"; });
      });
      addFloat(panel(vitTex, 1.7, 0.96, 1.9, -1.2, 1.05, -0.3), 1, 0.09);
      const phoneTex = tex(360, 720, (g, w, h) => {
        rr(g, 3, 3, w - 6, h - 6, 46, "rgba(13,19,30,.9)", "rgba(159,216,255,.5)"); rr(g, 130, 24, 100, 16, 8, "rgba(255,255,255,.18)");
        const gr = g.createLinearGradient(0, 80, w, 320); gr.addColorStop(0, "#4a9ee6"); gr.addColorStop(1, "#f6b40e"); rr(g, 30, 76, 300, 220, 24, gr);
        rr(g, 30, 326, 220, 20, 10, "rgba(255,255,255,.7)"); rr(g, 30, 362, 280, 14, 7, "rgba(255,255,255,.25)"); rr(g, 30, 390, 240, 14, 7, "rgba(255,255,255,.25)");
        rr(g, 30, 440, 142, 150, 20, "rgba(255,255,255,.08)", "rgba(255,255,255,.16)"); rr(g, 188, 440, 142, 150, 20, "rgba(255,255,255,.08)", "rgba(255,255,255,.16)"); rr(g, 30, 620, 300, 56, 28, "#eef3f8");
      });
      addFloat(panel(phoneTex, 0.78, 1.56, 2.5, 0.75, 0.55, -0.42), 0.7, 0.12);

      // orb
      const orb = new THREE.Group(); orb.position.set(-1.75, 1.75, -1.1); rig.add(orb);
      orb.add(new THREE.Mesh(new THREE.SphereGeometry(0.46, 48, 32), new THREE.MeshStandardMaterial({ color: 0x0c1f36, emissive: 0x2f7fd0, emissiveIntensity: 0.75, roughness: 0.2, metalness: 0.6 })));
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.72, 1)), new THREE.LineBasicMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0.38 })); orb.add(wire);
      const ringM = new THREE.MeshBasicMaterial({ color: 0xf9c846, transparent: true, opacity: 0.6 });
      const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.007, 8, 120), ringM); ringA.rotation.x = 1.25; orb.add(ringA);
      const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.005, 8, 120), ringM); ringB.rotation.set(1.0, 0.6, 0); orb.add(ringB);
      const og = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 })); og.scale.set(3, 3, 1); orb.add(og); addFloat(orb, 0.5, 0.14);

      // chips
      ([["WP", -2.9, -1.35, 0.3], ["PHP", -0.9, 1.75, 0.9], ["JS", 1.2, 1.7, 0.2], ["Wf", 3.05, -0.45, -0.3], ["{ }", -1.4, -1.6, 1.2], ["ACF", 0.5, -1.75, 1.3]] as [string, number, number, number][]).forEach((c, i) => {
        const t = tex(160, 160, (g) => { rr(g, 6, 6, 148, 148, 40, "rgba(17,25,38,.82)", i % 2 ? "rgba(249,200,70,.7)" : "rgba(140,196,242,.7)"); g.fillStyle = "#fff"; g.font = `700 52px ${FD}`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(c[0], 80, 84); });
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false })); s.scale.set(0.46, 0.46, 1); s.position.set(c[1], c[2], c[3]); rig.add(s); addFloat(s, 0.6 + i * 0.13, 0.13);
      });

      // glossy shapes
      const gloss = new THREE.MeshStandardMaterial({ color: 0x4a9ee6, metalness: 0.9, roughness: 0.18 });
      const tor = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.085, 24, 64), gloss); tor.position.set(2.75, 1.85, -0.4); rig.add(tor); addFloat(tor, 0.9, 0.12);
      const oct = new THREE.Mesh(new THREE.OctahedronGeometry(0.2), new THREE.MeshStandardMaterial({ color: 0xf6b40e, metalness: 0.9, roughness: 0.2 })); oct.position.set(-3.05, 1.0, 0.2); rig.add(oct); addFloat(oct, 1.1, 0.1);

      // particles
      const N = 1300, pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 26; pos[i * 3 + 1] = 7 - Math.random() * 46; pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3; }
      const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xbfdcf5, size: 0.035, transparent: true, opacity: 0.6, depthWrite: false })); scene.add(pts);

      // core shown after scrolling past the hero
      const core = new THREE.Group(); core.visible = false; scene.add(core); let cs = 0;
      core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0x2f7fd0, metalness: 0.95, roughness: 0.22, flatShading: true })));
      const cw = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.75, 1)), new THREE.LineBasicMaterial({ color: 0x8cc4f2, transparent: true, opacity: 0.32 })); core.add(cw);
      const cr1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.008, 8, 160), ringM); cr1.rotation.x = 1.3; core.add(cr1);
      const cr2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.006, 8, 160), ringM); cr2.rotation.set(0.9, 0.7, 0); core.add(cr2);
      const cg = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.55 })); cg.scale.set(7, 7, 1); core.add(cg);

      let bx = 0, by = 0, W = 0, H = 0;
      const layout = () => {
        const w = cv.clientWidth, h = cv.clientHeight;
        if (!w || !h || (w === W && h === H)) return;
        W = w; H = h;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 1.75)); renderer.setSize(w, h, false);
        cam.aspect = w / h; cam.updateProjectionMatrix();
        const vw = 6.55 * cam.aspect;
        if (cam.aspect < 1) { const s = Math.min(0.62, vw / 7.2); rig.scale.setScalar(s); bx = 0; by = 1.35; }
        else if (w < 1200) { const s = Math.min(0.74, vw / 12.5); rig.scale.setScalar(s); bx = vw * 0.24; by = 0.55; }
        else { const s = Math.min(0.9, vw / 13.5); rig.scale.setScalar(s); bx = vw * 0.25; by = 0.6; }
      };
      const skills = document.querySelector<HTMLElement>(".skills__canvas");
      let rx = 0, ry = 0;
      const t0 = performance.now();
      const loop = (now: number) => {
        if (dead) return;
        raf = requestAnimationFrame(loop);
        if (document.hidden) return;
        layout();
        const t = reduced ? 0 : (now - t0) / 1000, sy = window.scrollY, vh = window.innerHeight, p = Math.min(1.7, sy / vh), still = reduced ? 0 : 1, vw = 6.55 * cam.aspect;
        const ik = reduced ? 1 : intro.t ? Math.min(1, (now - intro.t) / 2400) : 0, ie = 1 - Math.pow(1 - ik, 4);
        rx += (pointer.y * 0.12 * still - rx) * 0.05; ry += (pointer.x * 0.2 * still - ry) * 0.05;
        rig.visible = p < 1.65;
        rig.position.set(bx * (1 - Math.min(1, p) * 0.85), by + p * p * 2.6 - (1 - ie) * 1.5, p * 2.4 - (1 - ie) * 9);
        rig.rotation.set(0.05 + rx - p * 0.3, -0.3 + ry + p * 1.2 + (1 - ie) * 1.8 + Math.sin(t * 0.3) * 0.03, 0);
        floats.forEach((f) => { f.o.position.y = f.y + Math.sin(t * f.sp + f.ph) * f.amp; f.o.position.x = f.x * (1 + p * 1.1) * (0.2 + 0.8 * ie); });
        wire.rotation.y = t * 0.25; wire.rotation.x = t * 0.12; ringA.rotation.z = t * 0.3; ringB.rotation.z = -t * 0.22; tor.rotation.set(t * 0.5, t * 0.35, 0); oct.rotation.set(t * 0.4, t * 0.6, 0);
        const sr = skills && skills.getBoundingClientRect(), hide = !!sr && sr.top < vh * 0.75 && sr.bottom > vh * 0.25;
        cs += (Math.max(0, Math.min(1, (p - 0.75) / 0.6)) * (hide ? 0 : 1) - cs) * 0.06; core.visible = cs > 0.01; core.scale.setScalar(Math.max(0.001, cs) * (cam.aspect < 1 ? 0.55 : 1));
        core.position.set(Math.sin(sy * 0.0011 + 1) * vw * 0.3, Math.cos(sy * 0.0008) * 1.0, -2.5);
        core.rotation.set(sy * 0.0012 + t * 0.08, sy * 0.002 + t * 0.12, 0); cw.rotation.y = -t * 0.2 - sy * 0.001; cr1.rotation.z = t * 0.2; cr2.rotation.z = -t * 0.15;
        pts.position.y = sy * 0.0022; pts.rotation.y = t * 0.012 + ry * 0.15;
        cam.position.x = ry * 0.6; cam.position.y = -rx * 0.5; cam.lookAt(0, 0, 0);
        cv.style.opacity = String(1 - Math.min(1, p) * 0.5);
        renderer.render(scene, cam);
      };
      raf = requestAnimationFrame(loop);
      dispose = () => {
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose?.();
          const mat = m.material as import("three").Material | import("three").Material[] | undefined;
          (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => { (x as import("three").MeshBasicMaterial).map?.dispose(); x.dispose(); });
        });
        renderer.dispose();
      };
    };

    // Start after first paint so the hero text is never held back.
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const kick = () => { if (!dead) start(); };
    const h = idle ? idle(kick, { timeout: 1200 }) : window.setTimeout(kick, 200);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      if (!idle) clearTimeout(h as number);
      dispose?.();
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

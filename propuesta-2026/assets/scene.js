/* ──────────────────────────────────────────────────────────────
   Escena WebGL · "Del problema a la claridad"
   Un único objeto de vidrio líquido (transmisión física + ruido
   en vértices) que narra el recorrido: caótico en el hero, lente
   perfecta en el manifiesto, núcleo del sistema en Enfoque…
   La app le pasa un estado objetivo; aquí solo se interpola.
   ────────────────────────────────────────────────────────────── */
import * as THREE from "./vendor/three.module.min.js";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
uniform float uTime; uniform float uChaos; uniform float uFreq;
float chDisp(vec3 p){
  float n = snoise(p*uFreq + vec3(uTime*0.22, uTime*0.17, -uTime*0.2));
  float m = snoise(p*uFreq*2.4 - vec3(uTime*0.31));
  return n*uChaos + m*uChaos*0.07;
}
vec3 chMove(vec3 p){ vec3 n = normalize(p); return n * (1.0 + chDisp(n)); }
`;

const THEMES = {
  dark: {
    bg: "#09090b", ribbonA: "#0b5d63", ribbonB: "#2f3187", ribbonC: "#0a3d47", dust: "#3f3f46",
    envTop: "#10202b", envBottom: "#050507", box: 2.2, att: "#b8feff", portraitIdx: "dark",
  },
  light: {
    bg: "#fafaf9", ribbonA: "#a5f3fc", ribbonB: "#c7d2fe", ribbonC: "#ccfbf1", dust: "#d4d4d8",
    envTop: "#ffffff", envBottom: "#c9ced6", box: 1.4, att: "#cdfbff", portraitIdx: "light",
  },
};

export function createScene(canvas, { theme = "dark", portraits = {}, lowPower = false, reducedMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  const pmrem = new THREE.PMREMGenerator(renderer);

  /* ── Entorno de estudio procedural (softboxes) para los reflejos del vidrio ── */
  let envTex = null;
  function buildEnv(t) {
    const env = new THREE.Scene();
    const grad = new THREE.Mesh(
      new THREE.SphereGeometry(20, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: { top: { value: new THREE.Color(t.envTop) }, bottom: { value: new THREE.Color(t.envBottom) } },
        vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",
        fragmentShader: "uniform vec3 top; uniform vec3 bottom; varying vec3 vP; void main(){ gl_FragColor = vec4(mix(bottom, top, smoothstep(-0.6, 0.9, vP.y)), 1.); }",
      }),
    );
    env.add(grad);
    const box = (w, h, color, k, pos, look) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide, toneMapped: false }));
      m.position.set(...pos); m.lookAt(...look); env.add(m);
    };
    box(10, 3, "#ffffff", t.box, [0, 9, 3], [0, 0, 0]);
    box(3, 8, "#ffffff", t.box * 0.8, [-9, 1, 4], [0, 0, 0]);
    box(3, 6, "#00feff", t.box * 0.9, [9, -1, 2], [0, 0, 0]);
    box(6, 2, "#6366f1", t.box * 0.9, [0, -8, 4], [0, 0, 0]);
    const tex = pmrem.fromScene(env, 0.035).texture;
    env.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    return tex;
  }

  /* ── Cintas de luz (lo que el vidrio refracta) ── */
  const ribbons = new THREE.Group();
  ribbons.position.z = -3.2;
  scene.add(ribbons);
  const ribbonMats = [];
  const rand = mulberry(7);
  for (let r = 0; r < 3; r++) {
    const pts = [];
    for (let i = 0; i < 7; i++) pts.push(new THREE.Vector3((i - 3) * 2.2, (rand() - 0.5) * 3.2, (rand() - 0.5) * 2.4));
    const curve = new THREE.CatmullRomCurve3(pts);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    ribbonMats.push(mat);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, lowPower ? 90 : 180, 0.014 + r * 0.008, 8, false), mat);
    tube.rotation.z = r * 0.9;
    tube.userData.speed = 0.04 + r * 0.025;
    ribbons.add(tube);
  }

  /* ── Polvo / partículas para profundidad ── */
  const dustGeo = new THREE.BufferGeometry();
  const N = lowPower ? 220 : 480;
  const arr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { arr[i * 3] = (rand() - 0.5) * 18; arr[i * 3 + 1] = (rand() - 0.5) * 11; arr[i * 3 + 2] = -1 - rand() * 6; }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  const dustMat = new THREE.PointsMaterial({ size: 0.03, sizeAttenuation: true });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  /* ── Retrato (plano opaco fundido al lienzo, para que el vidrio lo refracte) ── */
  const loader = new THREE.TextureLoader();
  const ptex = {};
  for (const k of Object.keys(portraits)) {
    ptex[k] = loader.load(portraits[k], (t) => { t.colorSpace = THREE.SRGBColorSpace; requestRender(); });
  }
  const portraitMat = new THREE.ShaderMaterial({
    uniforms: { uTex: { value: null }, uBg: { value: new THREE.Color() }, uOpacity: { value: 0 }, uAspect: { value: 1 }, uImgAspect: { value: 0.8 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",
    fragmentShader: /* glsl */ `
      uniform sampler2D uTex; uniform vec3 uBg; uniform float uOpacity; uniform float uAspect; uniform float uImgAspect; varying vec2 vUv;
      void main(){
        vec2 uv = vUv;
        // object-fit: cover
        float r = uAspect / uImgAspect;
        if (r > 1.0) { uv.y = (uv.y - 0.5) / r + 0.5; } else { uv.x = (uv.x - 0.5) * r + 0.5; }
        vec4 tx = texture2D(uTex, uv); vec3 c = tx.rgb;
        float edge = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
        float bottom = smoothstep(0.0, 0.32, vUv.y);
        float top = smoothstep(1.0, 0.9, vUv.y);
        float m = edge * bottom * top * uOpacity * tx.a;
        gl_FragColor = vec4(mix(uBg, c, m), 1.0);
        #include <colorspace_fragment>
      }`,
    toneMapped: false,
  });
  const portrait = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), portraitMat);
  portrait.position.z = -0.6;
  portrait.visible = false;
  scene.add(portrait);

  /* ── Vidrio líquido ── */
  const uniforms = { uTime: { value: 0 }, uChaos: { value: 0.4 }, uFreq: { value: 1.25 } };
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.04, transmission: 1, thickness: 1.1, ior: 1.4,
    clearcoat: 1, clearcoatRoughness: 0.08, iridescence: 0.32, iridescenceIOR: 1.25, iridescenceThicknessRange: [100, 380],
    envMapIntensity: 1.6, attenuationDistance: 6, specularIntensity: 1,
  });
  glassMat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\n" + NOISE)
      .replace(
        "#include <beginnormal_vertex>",
        `vec3 chN = normalize(position);
         vec3 chT = normalize(cross(chN, abs(chN.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));
         vec3 chB = normalize(cross(chN, chT));
         vec3 chP0 = chMove(chN);
         vec3 chP1 = chMove(chN + chT*0.012);
         vec3 chP2 = chMove(chN + chB*0.012);
         vec3 objectNormal = normalize(cross(chP1 - chP0, chP2 - chP0));
         if (dot(objectNormal, chN) < 0.0) objectNormal = -objectNormal;
         #ifdef USE_TANGENT
           vec3 objectTangent = vec3( tangent.xyz );
         #endif`,
      )
      .replace("#include <begin_vertex>", "vec3 transformed = chP0;");
  };
  const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1, lowPower ? 40 : 72), glassMat);
  scene.add(blob);

  /* ── Estado ── */
  const cur = { x: 0.22, y: 0.02, s: 1.0, c: 0.42, f: 1.25, o: 1, px: 0, py: 0 };
  const tgt = { ...cur };
  const pointer = { x: 0, y: 0, vx: 0, vy: 0 };
  let portraitRect = null, portraitOpacity = 0, portraitTarget = 0;
  let currentTheme = theme;
  let running = false, raf = 0, last = performance.now(), time = 0;
  let w = 1, h = 1;

  function applyTheme(name) {
    currentTheme = name;
    const t = THEMES[name] || THEMES.dark;
    scene.background = new THREE.Color(t.bg);
    portraitMat.uniforms.uBg.value.set(t.bg);
    ribbonMats[0].color.set(t.ribbonA); ribbonMats[1].color.set(t.ribbonB); ribbonMats[2].color.set(t.ribbonC);
    dustMat.color.set(t.dust);
    glassMat.attenuationColor = new THREE.Color(t.att);
    if (envTex) envTex.dispose();
    envTex = buildEnv(t);
    scene.environment = envTex;
    const tex = ptex[t.portraitIdx];
    if (tex) { portraitMat.uniforms.uTex.value = tex; const img = tex.image; if (img && img.width) portraitMat.uniforms.uImgAspect.value = img.width / img.height; }
  }

  function resize() {
    w = canvas.clientWidth || window.innerWidth; h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    requestRender();
  }

  // unidades de mundo visibles en z=0
  const visH = () => 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const visW = () => visH() * camera.aspect;

  function placePortrait() {
    if (!portraitRect || portraitOpacity < 0.002) { portrait.visible = false; return; }
    const d = camera.position.z - portrait.position.z;
    const vh = 2 * d * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), vw = vh * camera.aspect;
    const r = portraitRect;
    portrait.visible = true;
    portrait.scale.set((r.width / w) * vw, (r.height / h) * vh, 1);
    portrait.position.x = ((r.left + r.width / 2) / w - 0.5) * vw;
    portrait.position.y = -((r.top + r.height / 2) / h - 0.5) * vh;
    portraitMat.uniforms.uAspect.value = r.width / r.height;
    portraitMat.uniforms.uOpacity.value = portraitOpacity;
    const tex = portraitMat.uniforms.uTex.value;
    if (tex && tex.image && tex.image.width) portraitMat.uniforms.uImgAspect.value = tex.image.width / tex.image.height;
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!reducedMotion) time += dt;
    const k = reducedMotion ? 1 : 1 - Math.pow(0.0015, dt); // amortiguación independiente del fps
    for (const key of ["x", "y", "s", "c", "f", "o"]) cur[key] += (tgt[key] - cur[key]) * k;
    pointer.vx *= 0.92; pointer.vy *= 0.92;
    cur.px += (pointer.x - cur.px) * k * 0.6; cur.py += (pointer.y - cur.py) * k * 0.6;
    portraitOpacity += (portraitTarget - portraitOpacity) * k;

    const stress = Math.min(0.25, Math.hypot(pointer.vx, pointer.vy) * 0.6);
    uniforms.uTime.value = time;
    uniforms.uChaos.value = cur.c + stress;
    uniforms.uFreq.value = cur.f;

    const vw = visW(), vh = visH();
    blob.position.set(cur.x * vw + cur.px * 0.25, cur.y * vh - cur.py * 0.18, 0.6);
    const sc = cur.s * Math.min(1, vw / 6.2) * cur.o;
    blob.scale.setScalar(Math.max(0.0001, sc));
    blob.visible = sc > 0.01;
    blob.rotation.y = time * 0.12 + cur.px * 0.4;
    blob.rotation.x = time * 0.07 - cur.py * 0.3;

    ribbons.children.forEach((m, i) => { m.rotation.x = Math.sin(time * m.userData.speed + i) * 0.35; m.rotation.y = time * m.userData.speed * 0.6; });
    ribbons.position.x = -cur.px * 0.35; ribbons.position.y = cur.py * 0.25;
    dust.rotation.y = time * 0.01; dust.position.x = -cur.px * 0.6;

    placePortrait();
    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  }

  applyTheme(theme);
  resize();
  window.addEventListener("resize", resize);

  return {
    setTheme: applyTheme,
    setTarget(s) { Object.assign(tgt, s); if (reducedMotion) requestRender(); },
    setPortrait(rect, opacity) { portraitRect = rect; portraitTarget = opacity; if (reducedMotion) requestRender(); },
    setPointer(nx, ny) { pointer.vx += (nx - pointer.x); pointer.vy += (ny - pointer.y); pointer.x = nx; pointer.y = ny; },
    start() { if (running || reducedMotion) { requestRender(); return; } running = true; last = performance.now(); raf = requestAnimationFrame(frame); },
    stop() { running = false; cancelAnimationFrame(raf); },
    renderOnce: requestRender,
    get running() { return running; },
  };

  function requestRender() { if (!running) requestAnimationFrame((t) => { last = t; frame(t); }); }
}

function mulberry(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

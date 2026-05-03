import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Torus } from "@react-three/drei";
import { Brain, Zap, Link2, BarChart2, Shield, Smartphone } from "lucide-react";

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
function CustomCursor() {
  const mx = useMotionValue(-100),
    my = useMotionValue(-100);
  const tx = useSpring(mx, { stiffness: 80, damping: 18 });
  const ty = useSpring(my, { stiffness: 80, damping: 18 });
  const dx = useSpring(mx, { stiffness: 500, damping: 35 });
  const dy = useSpring(my, { stiffness: 500, damping: 35 });
  useEffect(() => {
    const h = (e) => {
      mx.set(e.clientX - 16);
      my.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          left: tx,
          top: ty,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.5px solid rgba(139,92,246,0.7)",
          pointerEvents: "none",
          zIndex: 9999,
          backdropFilter: "invert(15%)",
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: dx,
          top: dy,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "radial-gradient(circle, #a78bfa, #6d28d9)",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 16px 4px rgba(139,92,246,0.8)",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────
   ATMOSPHERIC BACKGROUND (Scroll-linked)
───────────────────────────────────────────── */
function AtmosphericBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const scale1 = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1.35, 1.1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.75, 1.2]);
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 0.8, 0.5],
  );
  const opacity2 = useTransform(scrollYProgress, [0, 0.4, 1], [0.5, 0.9, 0.6]);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, #0d0618 0%, #050508 55%, #02020a 100%)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 950,
          height: 950,
          top: -250,
          left: -180,
          y: y1,
          x: x1,
          scale: scale1,
          opacity: opacity1,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.22) 0%, rgba(79,70,229,0.08) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 750,
          height: 750,
          bottom: "0%",
          right: -120,
          y: y2,
          x: x2,
          scale: scale2,
          opacity: opacity2,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(14,165,233,0.06) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 550,
          height: 550,
          top: "40%",
          left: "32%",
          y: y3,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          top: "18%",
          right: "18%",
          y: y1,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(2,2,10,0.85) 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO GRAPHIC (Framer Motion — no Three.js bug)
───────────────────────────────────────────── */
function HeroGraphic() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        width: "100%",
        height: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* SVG Rings with gradient fade for 3D depth illusion */}
      <svg
        width="420"
        height="420"
        viewBox="0 0 420 420"
        style={{ position: "absolute" }}
      >
        <defs>
          {/* Outer ring gradient — bright in front, fades at back */}
          <linearGradient id="ring1grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.06)" />
            <stop offset="30%" stopColor="rgba(139,92,246,0.04)" />
            <stop
              offset="50%"
              stopColor="rgba(139,92,246,0.5)"
              stopOpacity="1"
            />
            <stop offset="70%" stopColor="rgba(139,92,246,0.3)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.05)" />
          </linearGradient>
          {/* Middle ring — cyan tint */}
          <linearGradient id="ring2grad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.04)" />
            <stop offset="40%" stopColor="rgba(6,182,212,0.5)" />
            <stop offset="60%" stopColor="rgba(6,182,212,0.25)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.03)" />
          </linearGradient>
          {/* Inner ring — rose */}
          <linearGradient id="ring3grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(244,63,94,0.03)" />
            <stop offset="45%" stopColor="rgba(244,63,94,0.55)" />
            <stop offset="65%" stopColor="rgba(244,63,94,0.2)" />
            <stop offset="100%" stopColor="rgba(244,63,94,0.03)" />
          </linearGradient>
          {/* Orb radial glow */}
          <radialGradient id="orbGlow" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(167,139,250,0.95)" />
            <stop offset="40%" stopColor="rgba(109,40,217,0.85)" />
            <stop offset="100%" stopColor="rgba(67,20,150,0.98)" />
          </radialGradient>
          {/* Orb specular highlight */}
          <radialGradient id="orbShine" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          {/* Cyan orb */}
          <radialGradient id="cyanOrb" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="rgba(103,232,249,0.95)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.9)" />
          </radialGradient>
          {/* Rose orb */}
          <radialGradient id="roseOrb" cx="35%" cy="28%" r="65%">
            <stop offset="0%" stopColor="rgba(251,113,133,0.95)" />
            <stop offset="100%" stopColor="rgba(225,29,72,0.9)" />
          </radialGradient>
          {/* Drop shadow filter */}
          <filter id="orbShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="18"
              floodColor="rgba(109,40,217,0.6)"
            />
          </filter>
          <filter id="cyanShadow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="10"
              floodColor="rgba(6,182,212,0.7)"
            />
          </filter>
          <filter id="roseShadow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="rgba(244,63,94,0.7)"
            />
          </filter>
        </defs>

        {/* Outer ring — rotates slowly */}
        <motion.ellipse
          cx="210"
          cy="210"
          rx="190"
          ry="60"
          fill="none"
          stroke="url(#ring1grad)"
          strokeWidth="1.5"
          style={{ transformOrigin: "210px 210px" }}
          animate={{ rotateX: [0, 5, 0], rotateZ: [0, 360] }}
          transition={{
            rotateZ: { duration: 40, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Middle ring — counter-rotates */}
        <motion.ellipse
          cx="210"
          cy="210"
          rx="140"
          ry="44"
          fill="none"
          stroke="url(#ring2grad)"
          strokeWidth="2"
          style={{ transformOrigin: "210px 210px" }}
          animate={{ rotateZ: [0, -360] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner ring */}
        <motion.ellipse
          cx="210"
          cy="210"
          rx="88"
          ry="28"
          fill="none"
          stroke="url(#ring3grad)"
          strokeWidth="2.5"
          style={{ transformOrigin: "210px 210px" }}
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />

        {/* Central orb — breathing scale */}
        <motion.circle
          cx="210"
          cy="210"
          r="58"
          fill="url(#orbGlow)"
          filter="url(#orbShadow)"
          animate={{ scale: [1, 1.05, 1] }}
          style={{ transformOrigin: "210px 210px" }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orb specular shine */}
        <motion.circle
          cx="210"
          cy="210"
          r="58"
          fill="url(#orbShine)"
          animate={{ scale: [1, 1.05, 1] }}
          style={{ transformOrigin: "210px 210px" }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting dot on outer ring */}
        <motion.circle
          r="6"
          fill="rgba(167,139,250,1)"
          filter="url(#orbShadow)"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "210px 210px" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          cx="400"
          cy="210"
        />

        {/* Cyan small orb — floating */}
        <motion.circle
          cx="320"
          cy="130"
          r="20"
          fill="url(#cyanOrb)"
          filter="url(#cyanShadow)"
          animate={{ cy: [130, 118, 130], cx: [320, 328, 320] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cyan shine */}
        <motion.circle
          cx="313"
          cy="122"
          r="7"
          fill="rgba(255,255,255,0.5)"
          animate={{ cy: [122, 110, 122], cx: [313, 321, 313] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rose small orb — floating */}
        <motion.circle
          cx="108"
          cy="290"
          r="15"
          fill="url(#roseOrb)"
          filter="url(#roseShadow)"
          animate={{ cy: [290, 302, 290], cx: [108, 100, 108] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Amber dot */}
        <motion.circle
          cx="150"
          cy="145"
          r="9"
          fill="rgba(251,191,36,0.95)"
          style={{ filter: "drop-shadow(0 0 8px rgba(245,158,11,0.8))" }}
          animate={{ cy: [145, 135, 145] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </svg>

      {/* Glassmorphism stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "6%",
          right: "2%",
          background: "rgba(10,6,20,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(139,92,246,0.25)",
          borderRadius: 14,
          padding: "12px 16px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: "#52525b",
            marginBottom: 4,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          AI Tasks Sorted
        </p>
        <p
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#a78bfa",
            letterSpacing: "-1px",
            margin: 0,
          }}
        >
          +247%
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          top: "6%",
          left: "2%",
          background: "rgba(10,6,20,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(6,182,212,0.2)",
          borderRadius: 14,
          padding: "12px 16px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: "#52525b",
            marginBottom: 4,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Team Velocity
        </p>
        <p
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#67e8f9",
            letterSpacing: "-1px",
            margin: 0,
          }}
        >
          10x faster
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   GLOW CARD (cursor-following radial glow)
───────────────────────────────────────────── */
function GlowCard({ children, style, accent = "#8b5cf6" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [hovered, setHovered] = useState(false);
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
  }, []);
  return (
    <div
      ref={ref}
      style={{ ...style, position: "relative", overflow: "hidden" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
          background: `radial-gradient(400px circle at ${pos.x} ${pos.y}, ${accent}18, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROLLING NUMBER
───────────────────────────────────────────── */
function RollingNumber({ value }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "inline-block" }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   ENTRANCE ANIMATION (blur + slide + spring)
───────────────────────────────────────────── */
const entranceVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      filter: { duration: 0.4 },
    },
  },
};

const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

function Section({ children, style, id }) {
  const ref = useRef(null);
  const io = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      id={id}
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={io ? "visible" : "hidden"}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STICKY CTA
───────────────────────────────────────────── */
function StickyCTA() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const h = () => setVis(window.scrollY > 700);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {vis && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "rgba(5,4,15,0.8)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(139,92,246,0.22)",
            borderRadius: 99,
            padding: "10px 10px 10px 22px",
            boxShadow:
              "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.08), 0 0 40px rgba(109,40,217,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
              }}
            />
            <p style={{ fontSize: 13, color: "#a1a1aa", whiteSpace: "nowrap" }}>
              12,000+ teams ship faster
            </p>
          </div>
          <a
            href="#"
            style={{
              background: "linear-gradient(135deg,#6d28d9,#4f46e5)",
              color: "white",
              padding: "10px 20px",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(109,40,217,0.5)",
              whiteSpace: "nowrap",
              transition: "transform .2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Get started free →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const logos = [
    "Stripe",
    "Notion",
    "Linear",
    "Vercel",
    "Figma",
    "GitHub",
    "Slack",
    "Intercom",
    "Loom",
    "Raycast",
    "Stripe",
    "Notion",
    "Linear",
    "Vercel",
    "Figma",
    "GitHub",
    "Slack",
    "Intercom",
    "Loom",
    "Raycast",
  ];

  const features = [
    {
      icon: <Brain size={28} strokeWidth={1.5} />,
      accent: "#a78bfa",
      bg: "rgba(109,40,217,0.06)",
      border: "rgba(139,92,246,0.15)",
      title: "AI Prioritisation",
      desc: "Our AI analyses deadlines, dependencies, and team capacity to surface the most important tasks every morning.",
    },
    {
      icon: <Zap size={28} strokeWidth={1.5} />,
      accent: "#34d399",
      bg: "rgba(52,211,153,0.06)",
      border: "rgba(52,211,153,0.15)",
      title: "Real-time Sync",
      desc: "Every edit reflected instantly across your entire team. No refresh, no conflicts, ever.",
    },
    {
      icon: <Link2 size={28} strokeWidth={1.5} />,
      accent: "#60a5fa",
      bg: "rgba(96,165,250,0.06)",
      border: "rgba(96,165,250,0.15)",
      title: "100+ Integrations",
      desc: "Slack, GitHub, Notion, Figma and more — TaskFlow lives where your team already works.",
    },
    {
      icon: <BarChart2 size={28} strokeWidth={1.5} />,
      accent: "#fbbf24",
      bg: "rgba(251,191,36,0.06)",
      border: "rgba(251,191,36,0.15)",
      title: "Advanced Analytics",
      desc: "Track velocity, find bottlenecks, and make data-driven decisions with real-time dashboards.",
    },
    {
      icon: <Shield size={28} strokeWidth={1.5} />,
      accent: "#f472b6",
      bg: "rgba(244,114,182,0.06)",
      border: "rgba(244,114,182,0.15)",
      title: "Enterprise Security",
      desc: "SOC 2 Type II certified. SSO, SAML, audit logs, 99.9% uptime. Your data stays yours.",
    },
    {
      icon: <Smartphone size={28} strokeWidth={1.5} />,
      accent: "#22d3ee",
      bg: "rgba(34,211,238,0.06)",
      border: "rgba(34,211,238,0.15)",
      title: "Native Mobile Apps",
      desc: "Full-featured iOS and Android. Works offline. Full feature parity with the web app.",
    },
  ];

  const plans = [
    {
      name: "Starter",
      mo: "$0",
      yr: "$0",
      desc: "Perfect for solo builders.",
      features: [
        "3 projects",
        "10 tasks each",
        "Basic AI assist",
        "2 GB storage",
        "Email support",
      ],
      cta: "Get started free",
      pop: false,
    },
    {
      name: "Pro",
      mo: "$12",
      yr: "$9",
      desc: "For growing teams.",
      features: [
        "Unlimited projects",
        "Unlimited tasks",
        "GPT-4o AI engine",
        "Slack & GitHub sync",
        "100 GB storage",
        "Priority support",
      ],
      cta: "Start free trial",
      pop: true,
    },
    {
      name: "Enterprise",
      mo: "Custom",
      yr: "Custom",
      desc: "Large teams & compliance.",
      features: [
        "Everything in Pro",
        "SSO & SAML",
        "Custom integrations",
        "Dedicated CSM",
        "99.9% SLA",
        "Audit logs",
      ],
      cta: "Talk to sales",
      pop: false,
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        color: "white",
        minHeight: "100vh",
        overflowX: "hidden",
        cursor: "none",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(139,92,246,0.4); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #02020a; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 99px; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes gs { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        .marquee { display: flex; animation: marquee 35s linear infinite; width: max-content; }
        .marquee:hover { animation-play-state: paused; }
        .nlink { color: #52525b; text-decoration: none; font-size: 14px; font-weight: 500; transition: color .25s; position: relative; padding: 4px 0; }
        .nlink::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: linear-gradient(90deg,#8b5cf6,#06b6d4); transition: width .3s; }
        .nlink:hover { color: #fafafa; }
        .nlink:hover::after { width: 100%; }
        .btn-p { background: linear-gradient(135deg,#6d28d9,#4f46e5); color: white; border: none; border-radius: 10px; font-weight: 700; cursor: none; transition: all .3s cubic-bezier(.175,.885,.32,1.275); position: relative; overflow: hidden; font-family: inherit; display: inline-block; text-decoration: none; }
        .btn-p::after { content: ''; position: absolute; top: -50%; left: -60%; width: 35%; height: 200%; background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent); transform: skewX(-20deg); transition: left .5s; }
        .btn-p:hover { transform: scale(1.06) translateY(-2px); box-shadow: 0 20px 50px rgba(109,40,217,.55); }
        .btn-p:hover::after { left: 120%; }
        .btn-p:active { transform: scale(.96); }
        .btn-g { background: transparent; border: 1px solid rgba(63,63,70,.8); color: #71717a; border-radius: 10px; font-weight: 500; cursor: none; transition: all .3s cubic-bezier(.175,.885,.32,1.275); font-family: inherit; display: block; text-decoration: none; text-align: center; }
        .btn-g:hover { transform: scale(1.04) translateY(-2px); border-color: rgba(139,92,246,.45); background: rgba(139,92,246,.06); color: white; box-shadow: 0 8px 24px rgba(139,92,246,.12); }
        .btn-g:active { transform: scale(.97); }
        .fcard { border-radius: 20px; transition: all .4s cubic-bezier(.175,.885,.32,1.275); cursor: default; }
        .fcard:hover { transform: translateY(-8px) scale(1.02); }
        .pcard { border-radius: 24px; padding: 38px; position: relative; transition: all .4s cubic-bezier(.175,.885,.32,1.275); cursor: default; }
        .pcard:hover { transform: translateY(-8px) scale(1.01); }
        .faq-row { border-bottom: 1px solid rgba(255,255,255,.05); }
        .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 20px 14px; cursor: none; font-size: 15px; font-weight: 500; transition: color .25s; color: #d4d4d8; }
        .faq-q:hover { color: #c4b5fd; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-graphic { display: none; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          section, .section-pad { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>

      <AtmosphericBackground />
      <CustomCursor />
      <StickyCTA />

      {/* Content container with atmospheric blur */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Navbar ── */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 64px",
            height: 64,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            transition: "all .4s",
            background: scrolled ? "rgba(5,4,15,0.92)" : "rgba(5,4,15,0.4)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                background: "linear-gradient(135deg,#6d28d9,#4f46e5)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 14,
                color: "white",
                boxShadow: "0 0 20px rgba(109,40,217,.5)",
              }}
            >
              T
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#fafafa",
                letterSpacing: "-0.3px",
              }}
            >
              TaskFlow
            </span>
          </a>
          <div style={{ display: "flex", gap: 28 }}>
            {["Features", "Pricing", "Changelog", "Docs"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nlink">
                {l}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="#" className="nlink">
              Log in
            </a>
            <a
              href="#"
              className="btn-p"
              style={{ padding: "8px 18px", fontSize: 13 }}
            >
              Get started free
            </a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section
          className="hero-grid"
          style={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            padding: "120px 64px 80px",
            gap: 40,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(109,40,217,0.1)",
                border: "1px solid rgba(109,40,217,0.25)",
                borderRadius: 99,
                padding: "5px 14px",
                fontSize: 12,
                color: "#c4b5fd",
                marginBottom: 28,
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                  display: "inline-block",
                }}
              />
              Now with GPT-4o · Ship 10x faster
              <span style={{ color: "#8b5cf6" }}>→</span>
            </motion.div>

            <h1
              style={{
                fontSize: 68,
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: "-3px",
                marginBottom: 24,
              }}
            >
              The task manager
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg,#a78bfa 0%,#38bdf8 40%,#a78bfa 100%)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gs 5s ease infinite",
                }}
              >
                your team deserves
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "#52525b",
                lineHeight: 1.8,
                marginBottom: 40,
                maxWidth: 440,
              }}
            >
              TaskFlow's AI engine surfaces the right work at the right time —
              so your team spends less time organising and more time shipping.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 16,
                  }}
                >
                  <input
                    type="email"
                    placeholder="your@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      email.includes("@") &&
                      setSubmitted(true)
                    }
                    style={{
                      padding: "13px 18px",
                      borderRadius: 10,
                      border: "1px solid rgba(63,63,70,0.8)",
                      background: "rgba(15,10,30,0.5)",
                      color: "white",
                      fontSize: 14,
                      width: 265,
                      outline: "none",
                      backdropFilter: "blur(16px)",
                      transition: "border-color .3s, box-shadow .3s",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8b5cf6";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(139,92,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(63,63,70,0.8)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    onClick={() => email.includes("@") && setSubmitted(true)}
                    className="btn-p"
                    style={{
                      padding: "13px 26px",
                      fontSize: 14,
                      boxShadow: "0 0 32px rgba(109,40,217,0.4)",
                    }}
                  >
                    Start for free →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: 10,
                    padding: "13px 22px",
                    color: "#10b981",
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 16,
                  }}
                >
                  ✓ You're on the list — check your inbox!
                </motion.div>
              )}
            </AnimatePresence>

            <p style={{ color: "#3f3f46", fontSize: 12, marginBottom: 40 }}>
              Free 14-day trial · No credit card · Cancel anytime
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex" }}>
                {["#6d28d9", "#0891b2", "#059669", "#d97706", "#dc2626"].map(
                  (c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: c,
                        border: "2px solid #02020a",
                        marginLeft: i > 0 ? -8 : 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {["S", "J", "M", "A", "R"][i]}
                    </div>
                  ),
                )}
              </div>
              <p style={{ color: "#52525b", fontSize: 13 }}>
                <span style={{ color: "#e4e4e7", fontWeight: 600 }}>
                  12,000+
                </span>{" "}
                teams ship faster
              </p>
            </div>
          </motion.div>

          {/* Refactored Hero Graphic */}
          <div className="hero-graphic">
            <HeroGraphic />
          </div>
        </section>

        {/* Logo marquee */}
        <div
          style={{
            padding: "28px 0",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#27272a",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Trusted by teams at
          </p>
          <div
            style={{
              overflow: "hidden",
              maskImage:
                "linear-gradient(to right,transparent,black 12%,black 88%,transparent)",
            }}
          >
            <div className="marquee">
              {[
                {
                  name: "Stripe",
                  svg: (
                    <svg
                      viewBox="0 0 60 25"
                      fill="#635BFF"
                      width="48"
                      height="20"
                    >
                      <path d="M59.64 14.28h-8.06v-1.47c0-1.3.52-1.95 1.56-1.95 1.03 0 1.55.63 1.55 1.9v.47h5.1v-.72c0-3.44-1.9-5.14-5.7-5.14-3.82 0-5.72 1.7-5.72 5.1v3.24c0 3.4 1.9 5.1 5.72 5.1 3.8 0 5.7-1.7 5.7-5.1v-.43zm-5.1 2.3c0 1.27-.52 1.9-1.55 1.9-1.04 0-1.56-.63-1.56-1.9v-.57h3.1v.57zM36.63 7.43c-1.56 0-2.8.6-3.7 1.8V7.7h-5.1v13.1h5.1v-7.4c0-1.56.64-2.34 1.9-2.34 1.27 0 1.9.78 1.9 2.34v7.4h5.1v-8.4c0-3.34-1.74-5-5.2-5zm-14.1 0c-3.82 0-5.73 1.7-5.73 5.1v3.24c0 3.4 1.9 5.1 5.73 5.1 3.8 0 5.7-1.7 5.7-5.1V12.5c0-3.4-1.9-5.07-5.7-5.07zm.6 8.77c0 1.27-.52 1.9-1.55 1.9-1.04 0-1.56-.63-1.56-1.9v-4.1c0-1.27.52-1.9 1.56-1.9 1.03 0 1.55.63 1.55 1.9v4.1zM5.1 3.35L0 4.7l-.01 13.57c0 2.5 1.88 4.1 4.37 4.1 1.38 0 2.4-.25 2.95-.55v-4.1c-.54.22-3.2 1-3.2-1.5V11.7h3.2V7.7H4.1V3.35H5.1z" />
                    </svg>
                  ),
                },
                {
                  name: "Notion",
                  svg: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      width="20"
                      height="20"
                    >
                      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
                    </svg>
                  ),
                },
                {
                  name: "Linear",
                  svg: (
                    <svg
                      viewBox="0 0 100 100"
                      fill="white"
                      width="18"
                      height="18"
                    >
                      <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857l36.4582 36.4582c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228zM.00189135 46.8891c-.01764375.2833.08887 .5599.28957.7606L52.3503 99.7085c.2007.2007.4773.3072.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.778025 4.5932-.925535 6.9624zM4.21093 29.7054c-.16649.3738-.08169.8106.21106 1.1034l64.7761 64.7761c.2928.2928.7296.3776 1.1034.2111 1.7554-.7805 3.4549-1.6542 5.0958-2.6138.5841-.3441.6779-1.1673.1928-1.6524L7.86463 24.6106c-.48515-.4851-1.30829-.3913-1.65248.1928-.95963 1.6409-1.83331 3.3404-2.61382 5.0958zM12.6587 18.074c-.3979.3238-.4799.8974-.1786 1.3165l68.0872 68.0871c.4191.4191.9927.3371 1.3165-.1786 1.2061-1.4831 2.3522-3.0273 3.4279-4.6297.3344-.5038.2318-1.1787-.2419-1.6524L18.3605 14.6461c-.4737-.4737-1.1486-.5763-1.6524-.2419-1.6024 1.0757-3.1466 2.2218-4.6294 3.4298zM25.3942 9.67597c-.4722.2878-.6.9037-.2884 1.3971l63.9985 63.9985c.4934.3116 1.1093.1838 1.3971-.2884 1.0904-1.7923 2.0871-3.6495 2.9806-5.5594.2428-.5176.0591-1.1338-.4286-1.4615L32.3617 6.32469c-.3277-.4877-.9439-.6714-1.4615-.4286-1.9099.89346-3.7671 1.8902-5.5061 2.98068zM41.3678 3.96988c-.5429.1704-.8507.7415-.6718 1.2793l54.0547 54.0547c.5378.1789 1.1089-.1289 1.2793-.6718.5554-1.7712.9817-3.5928 1.2726-5.4492.0836-.5352-.2467-1.0481-.7701-1.2063L47.9649 3.63013c-.4534-.29577-1.0455-.13547-1.3258.33993-.3729.6374-.7528 1.2703-1.1466 1.8989-.1353.216-.0747.5009.1411.6274.2158.1265.4993.0529.614-.1695.5413-.9932 1.1-.9961 1.1-.9961z" />
                    </svg>
                  ),
                },
                {
                  name: "Vercel",
                  svg: (
                    <svg
                      viewBox="0 0 76 65"
                      fill="white"
                      width="20"
                      height="18"
                    >
                      <path d="M37.5274 0L75.0548 65H0L37.5274 0z" />
                    </svg>
                  ),
                },
                {
                  name: "Figma",
                  svg: (
                    <svg viewBox="0 0 38 57" width="14" height="20">
                      <path
                        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
                        fill="#1ABCFE"
                      />
                      <path
                        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"
                        fill="#0ACF83"
                      />
                      <path
                        d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"
                        fill="#FF7262"
                      />
                      <path
                        d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"
                        fill="#F24E1E"
                      />
                      <path
                        d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"
                        fill="#A259FF"
                      />
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  svg: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      width="20"
                      height="20"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  name: "Slack",
                  svg: (
                    <svg viewBox="0 0 54 54" width="20" height="20">
                      <path
                        d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
                        fill="#36C5F0"
                      />
                      <path
                        d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
                        fill="#2EB67D"
                      />
                      <path
                        d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
                        fill="#ECB22E"
                      />
                      <path
                        d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
                        fill="#E01E5A"
                      />
                    </svg>
                  ),
                },
                {
                  name: "Intercom",
                  svg: (
                    <svg
                      viewBox="0 0 32 32"
                      fill="#1F8EED"
                      width="20"
                      height="20"
                    >
                      <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm7 16.5c0 .3-.1.5-.3.7-.6.5-2.3 1.8-6.7 1.8s-6.1-1.3-6.7-1.8c-.2-.2-.3-.4-.3-.7v-9c0-.6.4-1 1-1s1 .4 1 1v8.3c.8.4 2.3.9 5 .9s4.2-.5 5-.9V9.5c0-.6.4-1 1-1s1 .4 1 1v9z" />
                    </svg>
                  ),
                },
                {
                  name: "Loom",
                  svg: (
                    <svg viewBox="0 0 32 32" width="20" height="20">
                      <circle cx="16" cy="16" r="14" fill="#625DF5" />
                      <path
                        d="M16 8a8 8 0 1 0 0 16A8 8 0 0 0 16 8zm0 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                        fill="white"
                      />
                      <circle cx="16" cy="16" r="2.5" fill="white" />
                    </svg>
                  ),
                },
                {
                  name: "Raycast",
                  svg: (
                    <svg viewBox="0 0 32 32" width="20" height="20">
                      <defs>
                        <linearGradient
                          id="rg"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FF6363" />
                          <stop offset="100%" stopColor="#FF9A3C" />
                        </linearGradient>
                      </defs>
                      <path d="M4 16L16 4l12 12-12 12L4 16z" fill="url(#rg)" />
                      <path
                        d="M16 10l6 6-6 6-6-6 6-6z"
                        fill="white"
                        opacity="0.9"
                      />
                    </svg>
                  ),
                },
              ]
                .concat([
                  {
                    name: "Stripe",
                    svg: (
                      <svg
                        viewBox="0 0 60 25"
                        fill="#635BFF"
                        width="48"
                        height="20"
                      >
                        <path d="M59.64 14.28h-8.06v-1.47c0-1.3.52-1.95 1.56-1.95 1.03 0 1.55.63 1.55 1.9v.47h5.1v-.72c0-3.44-1.9-5.14-5.7-5.14-3.82 0-5.72 1.7-5.72 5.1v3.24c0 3.4 1.9 5.1 5.72 5.1 3.8 0 5.7-1.7 5.7-5.1v-.43zm-5.1 2.3c0 1.27-.52 1.9-1.55 1.9-1.04 0-1.56-.63-1.56-1.9v-.57h3.1v.57zM36.63 7.43c-1.56 0-2.8.6-3.7 1.8V7.7h-5.1v13.1h5.1v-7.4c0-1.56.64-2.34 1.9-2.34 1.27 0 1.9.78 1.9 2.34v7.4h5.1v-8.4c0-3.34-1.74-5-5.2-5zm-14.1 0c-3.82 0-5.73 1.7-5.73 5.1v3.24c0 3.4 1.9 5.1 5.73 5.1 3.8 0 5.7-1.7 5.7-5.1V12.5c0-3.4-1.9-5.07-5.7-5.07zm.6 8.77c0 1.27-.52 1.9-1.55 1.9-1.04 0-1.56-.63-1.56-1.9v-4.1c0-1.27.52-1.9 1.56-1.9 1.03 0 1.55.63 1.55 1.9v4.1zM5.1 3.35L0 4.7l-.01 13.57c0 2.5 1.88 4.1 4.37 4.1 1.38 0 2.4-.25 2.95-.55v-4.1c-.54.22-3.2 1-3.2-1.5V11.7h3.2V7.7H4.1V3.35H5.1z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Notion",
                    svg: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        width="20"
                        height="20"
                      >
                        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Linear",
                    svg: (
                      <svg
                        viewBox="0 0 100 100"
                        fill="white"
                        width="18"
                        height="18"
                      >
                        <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857l36.4582 36.4582c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228zM.00189135 46.8891c-.01764375.2833.08887 .5599.28957.7606L52.3503 99.7085c.2007.2007.4773.3072.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.778025 4.5932-.925535 6.9624zM4.21093 29.7054c-.16649.3738-.08169.8106.21106 1.1034l64.7761 64.7761c.2928.2928.7296.3776 1.1034.2111 1.7554-.7805 3.4549-1.6542 5.0958-2.6138.5841-.3441.6779-1.1673.1928-1.6524L7.86463 24.6106c-.48515-.4851-1.30829-.3913-1.65248.1928-.95963 1.6409-1.83331 3.3404-2.61382 5.0958zM12.6587 18.074c-.3979.3238-.4799.8974-.1786 1.3165l68.0872 68.0871c.4191.4191.9927.3371 1.3165-.1786 1.2061-1.4831 2.3522-3.0273 3.4279-4.6297.3344-.5038.2318-1.1787-.2419-1.6524L18.3605 14.6461c-.4737-.4737-1.1486-.5763-1.6524-.2419-1.6024 1.0757-3.1466 2.2218-4.6294 3.4298zM25.3942 9.67597c-.4722.2878-.6.9037-.2884 1.3971l63.9985 63.9985c.4934.3116 1.1093.1838 1.3971-.2884 1.0904-1.7923 2.0871-3.6495 2.9806-5.5594.2428-.5176.0591-1.1338-.4286-1.4615L32.3617 6.32469c-.3277-.4877-.9439-.6714-1.4615-.4286-1.9099.89346-3.7671 1.8902-5.5061 2.98068zM41.3678 3.96988c-.5429.1704-.8507.7415-.6718 1.2793l54.0547 54.0547c.5378.1789 1.1089-.1289 1.2793-.6718.5554-1.7712.9817-3.5928 1.2726-5.4492.0836-.5352-.2467-1.0481-.7701-1.2063L47.9649 3.63013c-.4534-.29577-1.0455-.13547-1.3258.33993-.3729.6374-.7528 1.2703-1.1466 1.8989-.1353.216-.0747.5009.1411.6274.2158.1265.4993.0529.614-.1695.5413-.9932 1.1-.9961 1.1-.9961z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Vercel",
                    svg: (
                      <svg
                        viewBox="0 0 76 65"
                        fill="white"
                        width="20"
                        height="18"
                      >
                        <path d="M37.5274 0L75.0548 65H0L37.5274 0z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Figma",
                    svg: (
                      <svg viewBox="0 0 38 57" width="14" height="20">
                        <path
                          d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
                          fill="#1ABCFE"
                        />
                        <path
                          d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"
                          fill="#0ACF83"
                        />
                        <path
                          d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"
                          fill="#FF7262"
                        />
                        <path
                          d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"
                          fill="#F24E1E"
                        />
                        <path
                          d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"
                          fill="#A259FF"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "GitHub",
                    svg: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        width="20"
                        height="20"
                      >
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Slack",
                    svg: (
                      <svg viewBox="0 0 54 54" width="20" height="20">
                        <path
                          d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
                          fill="#36C5F0"
                        />
                        <path
                          d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
                          fill="#2EB67D"
                        />
                        <path
                          d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
                          fill="#ECB22E"
                        />
                        <path
                          d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
                          fill="#E01E5A"
                        />
                      </svg>
                    ),
                  },
                  {
                    name: "Intercom",
                    svg: (
                      <svg
                        viewBox="0 0 32 32"
                        fill="#1F8EED"
                        width="20"
                        height="20"
                      >
                        <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm7 16.5c0 .3-.1.5-.3.7-.6.5-2.3 1.8-6.7 1.8s-6.1-1.3-6.7-1.8c-.2-.2-.3-.4-.3-.7v-9c0-.6.4-1 1-1s1 .4 1 1v8.3c.8.4 2.3.9 5 .9s4.2-.5 5-.9V9.5c0-.6.4-1 1-1s1 .4 1 1v9z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Loom",
                    svg: (
                      <svg viewBox="0 0 32 32" width="20" height="20">
                        <circle cx="16" cy="16" r="14" fill="#625DF5" />
                        <path
                          d="M16 8a8 8 0 1 0 0 16A8 8 0 0 0 16 8zm0 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                          fill="white"
                        />
                        <circle cx="16" cy="16" r="2.5" fill="white" />
                      </svg>
                    ),
                  },
                  {
                    name: "Raycast",
                    svg: (
                      <svg viewBox="0 0 32 32" width="20" height="20">
                        <defs>
                          <linearGradient
                            id="rg2"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FF6363" />
                            <stop offset="100%" stopColor="#FF9A3C" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M4 16L16 4l12 12-12 12L4 16z"
                          fill="url(#rg2)"
                        />
                        <path
                          d="M16 10l6 6-6 6-6-6 6-6z"
                          fill="white"
                          opacity="0.9"
                        />
                      </svg>
                    ),
                  },
                ])
                .map((logo, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "0 36px",
                      whiteSpace: "nowrap",
                      transition: "opacity .3s",
                      opacity: 0.4,
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "0.4")
                    }
                  >
                    {logo.svg}
                    <span
                      style={{
                        color: "#71717a",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {logo.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* ── Features ── */}
        <Section id="features" style={{ padding: "100px 64px" }}>
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p
              style={{
                color: "#8b5cf6",
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Features
            </p>
            <h2
              style={{
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: "-2px",
                marginBottom: 16,
                lineHeight: 1.08,
              }}
            >
              Built for how
              <br />
              great teams work
            </h2>
            <p
              style={{
                color: "#52525b",
                fontSize: 18,
                maxWidth: 440,
                margin: "0 auto",
              }}
            >
              Every feature designed to eliminate friction and amplify momentum.
            </p>
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 14,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={entranceVariant}>
                <GlowCard
                  accent={f.accent}
                  style={{
                    background: f.bg,
                    border: `1px solid ${f.border}`,
                    borderRadius: 20,
                    padding: 30,
                    backdropFilter: "blur(16px)",
                    height: "100%",
                    transition: "all .4s cubic-bezier(.175,.885,.32,1.275)",
                    cursor: "default",
                  }}
                  className="fcard"
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `${f.accent}18`,
                      border: `1px solid ${f.accent}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                      color: f.accent,
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      marginBottom: 10,
                      letterSpacing: "-0.3px",
                      color: "#f4f4f5",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{ color: "#52525b", fontSize: 14, lineHeight: 1.75 }}
                  >
                    {f.desc}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Product mockup ── */}
        <Section
          style={{
            padding: "80px 64px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <p
              style={{
                color: "#8b5cf6",
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Product
            </p>
            <h2
              style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-2px" }}
            >
              Everything in one workspace
            </h2>
          </motion.div>
          <motion.div
            variants={entranceVariant}
            style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                inset: -1,
                background:
                  "linear-gradient(135deg,rgba(109,40,217,.5),rgba(6,182,212,.35),rgba(244,63,94,.4))",
                borderRadius: 22,
                zIndex: -1,
                filter: "blur(1px)",
              }}
            />
            <div
              style={{
                background: "#06060f",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 80px 160px rgba(0,0,0,.8)",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  background: "#0d0d18",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {["#ef4444", "#f59e0b", "#10b981"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: c,
                    }}
                  />
                ))}
                <div
                  style={{
                    flex: 1,
                    background: "#18182a",
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontSize: 12,
                    color: "#3f3f46",
                    marginLeft: 8,
                  }}
                >
                  app.taskflow.io/dashboard
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "185px 1fr",
                  minHeight: 400,
                }}
              >
                <div
                  style={{
                    background: "#050510",
                    borderRight: "1px solid rgba(255,255,255,0.03)",
                    padding: "18px 0",
                  }}
                >
                  {[
                    "Dashboard",
                    "My Tasks",
                    "Team Board",
                    "Projects",
                    "Analytics",
                    "Settings",
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "9px 18px",
                        fontSize: 13,
                        color: i === 1 ? "#c4b5fd" : "#3f3f46",
                        background:
                          i === 1 ? "rgba(109,40,217,0.1)" : "transparent",
                        borderRight: i === 1 ? "2px solid #8b5cf6" : "none",
                        transition: "all .2s",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        if (i !== 1) e.currentTarget.style.color = "#71717a";
                      }}
                      onMouseLeave={(e) => {
                        if (i !== 1) e.currentTarget.style.color = "#3f3f46";
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{ padding: 22, background: "#03030e" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: 12,
                      marginBottom: 20,
                    }}
                  >
                    {[
                      ["12", "Tasks today", "#c4b5fd"],
                      ["4", "In progress", "#67e8f9"],
                      ["8", "Completed", "#6ee7b7"],
                    ].map(([n, l, c], i) => (
                      <div
                        key={i}
                        style={{
                          background: `linear-gradient(135deg,${c}08,transparent)`,
                          border: `1px solid ${c}18`,
                          borderRadius: 12,
                          padding: 14,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 28,
                            fontWeight: 900,
                            color: c,
                            margin: "0 0 3px 0",
                            letterSpacing: "-1px",
                          }}
                        >
                          {n}
                        </p>
                        <p
                          style={{ fontSize: 11, color: "#3f3f46", margin: 0 }}
                        >
                          {l}
                        </p>
                      </div>
                    ))}
                  </div>
                  {[
                    "Design new landing page",
                    "Fix API authentication bug",
                    "Write Q4 report",
                    "Review pull requests",
                    "Update documentation",
                  ].map((task, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "9px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.025)",
                        transition: "background .2s",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.012)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        style={{
                          width: 15,
                          height: 15,
                          borderRadius: 4,
                          border: `1px solid ${i < 2 ? "#8b5cf6" : "rgba(255,255,255,0.06)"}`,
                          background: i < 2 ? "#8b5cf6" : "transparent",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                        }}
                      >
                        {i < 2 ? "✓" : ""}
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: i < 2 ? "#3f3f46" : "#71717a",
                          textDecoration: i < 2 ? "line-through" : "none",
                          flex: 1,
                        }}
                      >
                        {task}
                      </span>
                      <div
                        style={{
                          background: [
                            "rgba(139,92,246,.12)",
                            "rgba(6,182,212,.12)",
                            "rgba(16,185,129,.12)",
                            "rgba(245,158,11,.12)",
                            "rgba(239,68,68,.12)",
                          ][i],
                          color: [
                            "#c4b5fd",
                            "#67e8f9",
                            "#6ee7b7",
                            "#fcd34d",
                            "#fca5a5",
                          ][i],
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 99,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {["Design", "Dev", "Writing", "Review", "Docs"][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ── Testimonials ── */}
        <Section
          style={{
            padding: "100px 64px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p
              style={{
                color: "#8b5cf6",
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Testimonials
            </p>
            <h2
              style={{ fontSize: 52, fontWeight: 800, letterSpacing: "-2px" }}
            >
              Loved by 12,000+ teams
            </h2>
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 18,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {[
              {
                q: "TaskFlow completely changed how our engineering team works. We ship 40% faster and have half the meetings.",
                name: "Sarah Chen",
                role: "CTO",
                co: "Vercel",
                color: "#a78bfa",
              },
              {
                q: "I've tried everything. TaskFlow is the first that actually stuck. The AI alone is worth 10x the price.",
                name: "James Whitfield",
                role: "Founder",
                co: "Linear",
                color: "#67e8f9",
              },
              {
                q: "Our remote team went from chaotic Slack threads to organised async work. Absolute game-changer.",
                name: "Maria Santos",
                role: "Head of Product",
                co: "Notion",
                color: "#f472b6",
              },
            ].map((t, i) => (
              <motion.div key={i} variants={entranceVariant}>
                <GlowCard
                  accent={t.color}
                  style={{
                    background: "rgba(10,8,20,0.5)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 20,
                    padding: 30,
                    backdropFilter: "blur(20px)",
                    height: "100%",
                    transition: "all .4s cubic-bezier(.175,.885,.32,1.275)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = t.color + "35";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.05)";
                  }}
                >
                  <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: "#f59e0b", fontSize: 14 }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      color: "#a1a1aa",
                      fontSize: 15,
                      lineHeight: 1.8,
                      marginBottom: 24,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.q}"
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg,${t.color},${t.color}80)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 12,
                        flexShrink: 0,
                        color: "#09090b",
                      }}
                    >
                      {t.name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: 13,
                          margin: "0 0 2px 0",
                          color: "#e4e4e7",
                        }}
                      >
                        {t.name}
                      </p>
                      <p style={{ color: "#3f3f46", fontSize: 12, margin: 0 }}>
                        {t.role} at{" "}
                        <span style={{ color: t.color }}>{t.co}</span>
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Pricing ── */}
        <Section
          id="pricing"
          style={{
            padding: "100px 64px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <motion.div
            variants={entranceVariant}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <p
              style={{
                color: "#8b5cf6",
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              Pricing
            </p>
            <h2
              style={{
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: "-2px",
                marginBottom: 24,
              }}
            >
              Simple, transparent pricing
            </h2>
            <div
              style={{
                display: "inline-flex",
                gap: 4,
                background: "rgba(10,8,20,0.7)",
                border: "1px solid rgba(63,63,70,0.6)",
                borderRadius: 99,
                padding: 4,
                backdropFilter: "blur(16px)",
              }}
            >
              {["Monthly", "Annual"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setAnnual(i === 1)}
                  style={{
                    padding: "8px 22px",
                    borderRadius: 99,
                    border: "none",
                    cursor: "none",
                    background:
                      (i === 1) === annual
                        ? "linear-gradient(135deg,#6d28d9,#4f46e5)"
                        : "transparent",
                    color: (i === 1) === annual ? "white" : "#52525b",
                    fontWeight: 600,
                    fontSize: 13,
                    transition: "all .3s",
                    fontFamily: "inherit",
                  }}
                >
                  {label}
                  {i === 1 && (
                    <span
                      style={{ color: "#10b981", fontSize: 11, marginLeft: 4 }}
                    >
                      -20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 18,
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                variants={entranceVariant}
                className="pcard"
                style={{
                  background: plan.pop
                    ? "rgba(109,40,217,0.1)"
                    : "rgba(10,8,20,0.5)",
                  border: `1px solid ${plan.pop ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.05)"}`,
                  backdropFilter: "blur(20px)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.01)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0) scale(1)")
                }
              >
                {plan.pop && (
                  <div
                    style={{
                      position: "absolute",
                      top: -13,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg,#6d28d9,#4f46e5)",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "3px 14px",
                      borderRadius: 99,
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 16px rgba(109,40,217,0.5)",
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "#f4f4f5",
                  }}
                >
                  {plan.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 46,
                      fontWeight: 900,
                      letterSpacing: "-2px",
                      background: plan.pop
                        ? "linear-gradient(135deg,#a78bfa,#38bdf8)"
                        : "none",
                      WebkitBackgroundClip: plan.pop ? "text" : "unset",
                      WebkitTextFillColor: plan.pop ? "transparent" : "white",
                    }}
                  >
                    <RollingNumber value={annual ? plan.yr : plan.mo} />
                  </span>
                  {plan.mo !== "Custom" && (
                    <span style={{ color: "#3f3f46", fontSize: 13 }}>
                      /user/mo
                    </span>
                  )}
                </div>
                <p
                  style={{
                    color: "#52525b",
                    fontSize: 13,
                    marginBottom: 24,
                    lineHeight: 1.6,
                  }}
                >
                  {plan.desc}
                </p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 28 }}>
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        padding: "8px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        fontSize: 13,
                        color: "#a1a1aa",
                      }}
                    >
                      <span
                        style={{
                          color: plan.pop ? "#a78bfa" : "#6d28d9",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.pop ? (
                  <a
                    href="#"
                    className="btn-p"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: 13,
                      borderRadius: 12,
                      fontSize: 14,
                      boxShadow: "0 0 28px rgba(109,40,217,0.4)",
                    }}
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <a
                    href="#"
                    className="btn-g"
                    style={{ padding: 13, borderRadius: 12, fontSize: 14 }}
                  >
                    {plan.cta}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── FAQ ── */}
        <div
          style={{
            padding: "100px 64px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p
                style={{
                  color: "#8b5cf6",
                  fontSize: 11,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                FAQ
              </p>
              <h2
                style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-2px" }}
              >
                Common questions
              </h2>
            </div>
            {[
              {
                q: "Is there a free plan?",
                a: "Yes — the Starter plan is free forever. 3 projects, 10 tasks each. No credit card needed.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No contracts, cancel whenever. Access continues until end of billing period.",
              },
              {
                q: "How does AI prioritisation work?",
                a: "Our model reads deadlines, blockers, effort and team load to surface the highest-impact tasks every morning. It learns from your patterns.",
              },
              {
                q: "Do you offer startup discounts?",
                a: "Yes — 50% off for early-stage startups and non-profits. Contact sales with proof of eligibility.",
              },
              {
                q: "Is my data secure?",
                a: "SOC 2 Type II certified. Encrypted at rest and in transit. Regular third-party audits.",
              },
            ].map((faq, i) => (
              <div key={i} className="faq-row">
                <div
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      color: "#8b5cf6",
                      fontSize: 22,
                      flexShrink: 0,
                      marginLeft: 16,
                      display: "inline-block",
                    }}
                  >
                    +
                  </motion.span>
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          padding: "0 14px 20px",
                          color: "#52525b",
                          fontSize: 14,
                          lineHeight: 1.8,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            padding: "120px 64px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 700,
              height: 500,
              background:
                "radial-gradient(circle,rgba(109,40,217,0.14) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "28%",
              transform: "translate(-50%,-50%)",
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "72%",
              transform: "translate(-50%,-50%)",
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle,rgba(244,63,94,0.07) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <h2
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: "-3px",
                marginBottom: 16,
                lineHeight: 1.05,
              }}
            >
              Ready to ship
              <br />
              10x faster?
            </h2>
            <p style={{ color: "#52525b", fontSize: 19, marginBottom: 48 }}>
              Join 12,000+ teams. Free forever, no credit card required.
            </p>
            <a
              href="#"
              className="btn-p"
              style={{
                padding: "18px 60px",
                fontSize: 17,
                borderRadius: 14,
                boxShadow: "0 0 80px rgba(109,40,217,0.5)",
                letterSpacing: "-0.2px",
              }}
            >
              Get started for free →
            </a>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            padding: "52px 64px",
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 48,
              maxWidth: 1100,
              margin: "0 auto 40px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    background: "linear-gradient(135deg,#6d28d9,#4f46e5)",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 12,
                    boxShadow: "0 0 12px rgba(109,40,217,0.35)",
                  }}
                >
                  T
                </div>
                <span
                  style={{ fontWeight: 700, fontSize: 15, color: "#fafafa" }}
                >
                  TaskFlow
                </span>
              </div>
              <p
                style={{
                  color: "#27272a",
                  fontSize: 13,
                  lineHeight: 1.7,
                  maxWidth: 200,
                }}
              >
                The AI-powered task manager that helps teams ship faster.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Changelog", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Cookies"],
              },
            ].map((col, i) => (
              <div key={i}>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: "#52525b",
                    marginBottom: 16,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="nlink"
                    style={{ display: "block", marginBottom: 10, fontSize: 13 }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            <p style={{ color: "#27272a", fontSize: 12 }}>
              © 2026 TaskFlow Inc. All rights reserved.
            </p>
            <p style={{ color: "#27272a", fontSize: 12 }}>
              Made with ❤️ for teams worldwide
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

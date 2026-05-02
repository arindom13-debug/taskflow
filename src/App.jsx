import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className, style, id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    "Stripe",
    "Notion",
    "Linear",
    "Vercel",
    "Figma",
    "GitHub",
    "Slack",
    "Intercom",
  ];

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#030712",
        color: "white",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(124,58,237,0.3); }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 1 } 100% { transform: scale(1.5); opacity: 0 } }
        @keyframes float { 0%, 100% { transform: translateY(0px) } 50% { transform: translateY(-8px) } }
        .marquee-track { display: flex; animation: marquee 30s linear infinite; width: max-content; }
        .marquee-track:hover { animation-play-state: paused; }
        .nav-link { color: #9ca3af; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: white; }
        .feature-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 28px; transition: all 0.3s; cursor: default; }
        .feature-card:hover { border-color: #7c3aed; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(124,58,237,0.1); }
        .pricing-card { border-radius: 20px; padding: 36px; position: relative; transition: transform 0.3s; }
        .pricing-card:hover { transform: translateY(-6px); }
        .faq-item { border-bottom: 1px solid #1e293b; }
        .faq-question { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; cursor: pointer; font-size: 16px; font-weight: 500; }
        .faq-answer { padding-bottom: 20px; color: #9ca3af; font-size: 15px; line-height: 1.7; }
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 64px",
          height: "64px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.3s",
          backgroundColor: scrolled ? "rgba(3,7,18,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid #1e293b"
            : "1px solid transparent",
        }}
      >
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "15px",
              color: "white",
            }}
          >
            T
          </div>
          <span style={{ fontWeight: "700", fontSize: "17px", color: "white" }}>
            TaskFlow
          </span>
        </a>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["Features", "Pricing", "Changelog", "Docs"].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
              {link}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a href="#" className="nav-link">
            Log in
          </a>
          <a
            href="#"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "white",
              padding: "8px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            Get started free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: "860px", position: "relative", zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "99px",
              padding: "6px 16px",
              fontSize: "13px",
              color: "#c084fc",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                display: "inline-block",
                boxShadow: "0 0 8px #10b981",
              }}
            ></span>
            <span>New: AI-powered task prioritisation is here</span>
            <span style={{ color: "#7c3aed" }}>→</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontSize: "76px",
              fontWeight: "900",
              lineHeight: "1.0",
              marginBottom: "24px",
              letterSpacing: "-3px",
            }}
          >
            The task manager
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              your team deserves
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              lineHeight: "1.7",
              marginBottom: "48px",
              maxWidth: "580px",
              margin: "0 auto 48px",
            }}
          >
            TaskFlow uses AI to prioritise your work, eliminate busywork, and
            help your team ship 10x faster. Trusted by 12,000+ teams worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      email.includes("@") &&
                      setSubmitted(true)
                    }
                    style={{
                      padding: "14px 20px",
                      borderRadius: "10px",
                      border: "1px solid #1e293b",
                      backgroundColor: "#0f172a",
                      color: "white",
                      fontSize: "15px",
                      width: "300px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#7c3aed")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
                  />
                  <button
                    onClick={() => email.includes("@") && setSubmitted(true)}
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      color: "white",
                      padding: "14px 28px",
                      borderRadius: "10px",
                      border: "none",
                      fontWeight: "700",
                      fontSize: "15px",
                      cursor: "pointer",
                      boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                  >
                    Start for free →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: "10px",
                    padding: "14px 28px",
                    color: "#10b981",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  ✓ You're on the list! Check your inbox.
                </motion.div>
              )}
            </AnimatePresence>
            <p style={{ color: "#475569", fontSize: "13px" }}>
              Free 14-day trial · No credit card · Cancel anytime
            </p>
          </motion.div>

          {/* Social proof avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "40px",
            }}
          >
            <div style={{ display: "flex" }}>
              {["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"].map(
                (color, i) => (
                  <div
                    key={i}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: "2px solid #030712",
                      marginLeft: i > 0 ? "-8px" : "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    {["S", "J", "M", "A", "R"][i]}
                  </div>
                ),
              )}
            </div>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              <span style={{ color: "white", fontWeight: "600" }}>12,000+</span>{" "}
              teams already use TaskFlow
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Logo marquee */}
      <div
        style={{
          padding: "32px 0",
          borderTop: "1px solid #1e293b",
          borderBottom: "1px solid #1e293b",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#475569",
            fontSize: "13px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Trusted by teams at
        </p>
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {logos.map((logo, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "0 40px",
                  color: "#475569",
                  fontSize: "16px",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "4px",
                    backgroundColor: "#1e293b",
                  }}
                />
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product screenshot */}
      <AnimatedSection style={{ padding: "80px 64px" }}>
        <motion.div
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            style={{
              color: "#7c3aed",
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Product
          </p>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              letterSpacing: "-1.5px",
              marginBottom: "16px",
            }}
          >
            Everything in one place
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            A beautiful, powerful workspace that your team will actually enjoy
            using.
          </p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Fake browser bar */}
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#1e293b",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #0f172a",
            }}
          >
            {["#ef4444", "#f59e0b", "#10b981"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: c,
                }}
              />
            ))}
            <div
              style={{
                flex: 1,
                backgroundColor: "#0f172a",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "12px",
                color: "#475569",
                marginLeft: "8px",
              }}
            >
              app.taskflow.io/dashboard
            </div>
          </div>
          {/* Fake dashboard */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              minHeight: "400px",
            }}
          >
            <div
              style={{
                backgroundColor: "#080f1f",
                borderRight: "1px solid #1e293b",
                padding: "20px 0",
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
                    padding: "10px 20px",
                    fontSize: "13px",
                    color: i === 1 ? "#c084fc" : "#475569",
                    backgroundColor:
                      i === 1 ? "rgba(124,58,237,0.1)" : "transparent",
                    borderRight: i === 1 ? "2px solid #7c3aed" : "none",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div style={{ padding: "24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                {[
                  ["12", "Tasks today"],
                  ["4", "In progress"],
                  ["8", "Completed"],
                ].map(([num, label], i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#1e293b",
                      borderRadius: "10px",
                      padding: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "800",
                        color: ["#c084fc", "#06b6d4", "#10b981"][i],
                        margin: "0 0 4px 0",
                      }}
                    >
                      {num}
                    </p>
                    <p
                      style={{ fontSize: "12px", color: "#475569", margin: 0 }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              {[
                "Design new landing page",
                "Fix API authentication bug",
                "Write Q4 report",
                "Review pull requests",
                "Update team documentation",
              ].map((task, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 0",
                    borderBottom: "1px solid #1e293b",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: `1px solid ${i < 2 ? "#7c3aed" : "#1e293b"}`,
                      backgroundColor: i < 2 ? "#7c3aed" : "transparent",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                    }}
                  >
                    {i < 2 ? "✓" : ""}
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: i < 2 ? "#475569" : "#94a3b8",
                      textDecoration: i < 2 ? "line-through" : "none",
                    }}
                  >
                    {task}
                  </span>
                  <div
                    style={{
                      marginLeft: "auto",
                      backgroundColor:
                        ["#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"][
                          i
                        ] + "22",
                      color: [
                        "#c084fc",
                        "#67e8f9",
                        "#6ee7b7",
                        "#fcd34d",
                        "#fca5a5",
                      ][i],
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "99px",
                    }}
                  >
                    {["Design", "Dev", "Writing", "Review", "Docs"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection
        id="features"
        style={{ padding: "80px 64px", borderTop: "1px solid #1e293b" }}
      >
        <motion.div
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              color: "#7c3aed",
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              letterSpacing: "-1.5px",
              marginBottom: "16px",
            }}
          >
            Built for how teams work
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Every feature designed to help your team move faster and communicate
            better.
          </p>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: "🤖",
              title: "AI Task Prioritisation",
              desc: "Our AI analyses deadlines, dependencies, and team capacity to automatically surface the most important tasks every morning.",
            },
            {
              icon: "⚡",
              title: "Real-time Collaboration",
              desc: 'See changes as they happen. No more "which version is this?" — every update is synced instantly across your entire team.',
            },
            {
              icon: "🔗",
              title: "100+ Integrations",
              desc: "Connect with Slack, GitHub, Notion, Figma, Google Calendar, and 100+ more tools your team already loves.",
            },
            {
              icon: "📊",
              title: "Advanced Analytics",
              desc: "Track team velocity, identify bottlenecks, and make data-driven decisions with beautiful, real-time dashboards.",
            },
            {
              icon: "🔒",
              title: "Enterprise Security",
              desc: "SOC 2 Type II certified. SSO, SAML, audit logs, and 99.9% uptime SLA. Your data is always safe with us.",
            },
            {
              icon: "📱",
              title: "Native Mobile Apps",
              desc: "Full-featured iOS and Android apps. Manage your tasks, get notifications, and collaborate from anywhere.",
            },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="feature-card">
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "20px",
                  display: "inline-block",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "12px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "15px",
                  lineHeight: "1.7",
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection
        style={{ padding: "80px 64px", borderTop: "1px solid #1e293b" }}
      >
        <motion.div
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              color: "#7c3aed",
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Testimonials
          </p>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              letterSpacing: "-1.5px",
            }}
          >
            Loved by 12,000+ teams
          </h2>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              quote:
                "TaskFlow completely changed how our engineering team works. We ship 40% faster and have half the meetings we used to.",
              name: "Sarah Chen",
              role: "CTO",
              company: "Vercel",
              avatar: "SC",
            },
            {
              quote:
                "I've tried every task manager out there. TaskFlow is the first one that actually stuck. The AI prioritisation alone is worth 10x the price.",
              name: "James Whitfield",
              role: "Founder",
              company: "Linear",
              avatar: "JW",
            },
            {
              quote:
                "Our remote team went from chaotic Slack threads to organised, async work. TaskFlow made us feel like we're in the same room.",
              name: "Maria Santos",
              role: "Head of Product",
              company: "Notion",
              avatar: "MS",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "20px",
                padding: "32px",
              }}
            >
              <div
                style={{ display: "flex", gap: "4px", marginBottom: "20px" }}
              >
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: "#f59e0b", fontSize: "16px" }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  color: "#e2e8f0",
                  fontSize: "16px",
                  lineHeight: "1.7",
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}
              >
                "{t.quote}"
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: "700",
                      fontSize: "15px",
                      margin: "0 0 2px 0",
                    }}
                  >
                    {t.name}
                  </p>
                  <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection
        id="pricing"
        style={{ padding: "80px 64px", borderTop: "1px solid #1e293b" }}
      >
        <motion.div
          variants={fadeUp}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            style={{
              color: "#7c3aed",
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              letterSpacing: "-1.5px",
              marginBottom: "24px",
            }}
          >
            Simple, transparent pricing
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "99px",
              padding: "4px",
            }}
          >
            <button
              onClick={() => setAnnual(false)}
              style={{
                padding: "8px 24px",
                borderRadius: "99px",
                border: "none",
                cursor: "pointer",
                backgroundColor: !annual ? "#7c3aed" : "transparent",
                color: !annual ? "white" : "#6b7280",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                padding: "8px 24px",
                borderRadius: "99px",
                border: "none",
                cursor: "pointer",
                backgroundColor: annual ? "#7c3aed" : "transparent",
                color: annual ? "white" : "#6b7280",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
            >
              Annual{" "}
              <span
                style={{
                  color: "#10b981",
                  fontSize: "12px",
                  marginLeft: "4px",
                }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          {[
            {
              name: "Starter",
              price: "$0",
              annualPrice: "$0",
              desc: "Perfect for individuals and small projects.",
              features: [
                "Up to 3 projects",
                "10 tasks per project",
                "Basic AI suggestions",
                "2GB storage",
                "Email support",
              ],
              cta: "Get started free",
              highlight: false,
            },
            {
              name: "Pro",
              price: "$12",
              annualPrice: "$9",
              desc: "For growing teams that need more power.",
              features: [
                "Unlimited projects",
                "Unlimited tasks",
                "Full AI prioritisation",
                "Slack & GitHub sync",
                "100GB storage",
                "Priority support",
              ],
              cta: "Start free trial",
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              annualPrice: "Custom",
              desc: "For large teams with advanced security needs.",
              features: [
                "Everything in Pro",
                "SSO & SAML",
                "Custom integrations",
                "Dedicated CSM",
                "SLA guarantee",
                "Audit logs",
              ],
              cta: "Talk to sales",
              highlight: false,
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="pricing-card"
              style={{
                backgroundColor: plan.highlight ? "#1e1040" : "#0f172a",
                border: `1px solid ${plan.highlight ? "#7c3aed" : "#1e293b"}`,
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "4px 16px",
                    borderRadius: "99px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 12px rgba(124,58,237,0.4)",
                  }}
                >
                  MOST POPULAR
                </div>
              )}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                {plan.name}
              </h3>
              <div
                style={{
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "44px",
                    fontWeight: "900",
                    letterSpacing: "-2px",
                  }}
                >
                  {annual ? plan.annualPrice : plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span style={{ color: "#475569", fontSize: "14px" }}>
                    /user/month
                  </span>
                )}
              </div>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  marginBottom: "24px",
                  lineHeight: "1.6",
                }}
              >
                {plan.desc}
              </p>
              <ul
                style={{ listStyle: "none", padding: 0, marginBottom: "28px" }}
              >
                {plan.features.map((feat, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: "1px solid #1e293b",
                      fontSize: "14px",
                      color: "#cbd5e1",
                    }}
                  >
                    <span
                      style={{
                        color: "#7c3aed",
                        fontWeight: "700",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>{" "}
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: plan.highlight
                    ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                    : "transparent",
                  border: `1px solid ${plan.highlight ? "transparent" : "#1e293b"}`,
                  color: "white",
                  padding: "13px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "15px",
                  boxShadow: plan.highlight
                    ? "0 0 20px rgba(124,58,237,0.3)"
                    : "none",
                  transition: "opacity 0.2s",
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <div style={{ padding: "80px 64px", borderTop: "1px solid #1e293b" }}>
        <motion.div
          variants={fadeUp}
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p
              style={{
                color: "#7c3aed",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                fontSize: "44px",
                fontWeight: "800",
                letterSpacing: "-1.5px",
              }}
            >
              Common questions
            </h2>
          </div>
          {[
            {
              q: "Is there a free plan?",
              a: "Yes! Our Starter plan is completely free forever. You get up to 3 projects and 10 tasks per project — no credit card required.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely. There are no long-term contracts. You can cancel your subscription at any time and you'll keep access until the end of your billing period.",
            },
            {
              q: "How does the AI prioritisation work?",
              a: "Our AI analyses your tasks' deadlines, dependencies, estimated effort, and team capacity to surface the most important work each day. It learns from your patterns over time.",
            },
            {
              q: "Do you offer discounts for startups?",
              a: "Yes! We offer 50% off for early-stage startups and non-profits. Contact our sales team with proof of eligibility to claim your discount.",
            },
            {
              q: "Is my data secure?",
              a: "We take security very seriously. All data is encrypted at rest and in transit. We're SOC 2 Type II certified and undergo regular third-party security audits.",
            },
          ].map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="faq-item">
              <div
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span
                  style={{
                    color: "#7c3aed",
                    fontSize: "20px",
                    transition: "transform 0.2s",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                  }}
                >
                  +
                </span>
              </div>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="faq-answer">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div
        style={{
          padding: "100px 64px",
          borderTop: "1px solid #1e293b",
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
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          variants={fadeUp}
          style={{ position: "relative", zIndex: 1 }}
        >
          <h2
            style={{
              fontSize: "60px",
              fontWeight: "900",
              letterSpacing: "-2px",
              marginBottom: "16px",
              lineHeight: "1.1",
            }}
          >
            Ready to ship faster?
          </h2>
          <p
            style={{ color: "#94a3b8", fontSize: "20px", marginBottom: "48px" }}
          >
            Join 12,000+ teams. Start free, no credit card required.
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              color: "white",
              padding: "18px 56px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "800",
              fontSize: "18px",
              boxShadow: "0 0 40px rgba(124,58,237,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Get started for free →
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1e293b", padding: "48px 64px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            maxWidth: "1100px",
            margin: "0 auto 48px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  borderRadius: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "13px",
                }}
              >
                T
              </div>
              <span style={{ fontWeight: "700", fontSize: "16px" }}>
                TaskFlow
              </span>
            </div>
            <p
              style={{
                color: "#475569",
                fontSize: "14px",
                lineHeight: "1.7",
                maxWidth: "240px",
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
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "Cookies"],
            },
          ].map((col, i) => (
            <div key={i}>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "13px",
                  color: "white",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {col.title}
              </p>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    display: "block",
                    color: "#475569",
                    textDecoration: "none",
                    fontSize: "14px",
                    marginBottom: "10px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "white")}
                  onMouseLeave={(e) => (e.target.style.color = "#475569")}
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <p style={{ color: "#475569", fontSize: "13px" }}>
            © 2026 TaskFlow Inc. All rights reserved.
          </p>
          <p style={{ color: "#475569", fontSize: "13px" }}>
            Made with ❤️ for teams worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}

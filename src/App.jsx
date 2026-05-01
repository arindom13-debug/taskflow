import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#030712",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 64px",
          borderBottom: "1px solid #1f2937",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(3, 7, 18, 0.85)",
        }}
      >
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "white",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#7c3aed",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            T
          </div>
          <span style={{ fontWeight: "700", fontSize: "18px" }}>TaskFlow</span>
        </a>
        <div style={{ display: "flex", gap: "32px" }}>
          <a
            href="#features"
            style={{
              color: "#9ca3af",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Features
          </a>
          <a
            href="#pricing"
            style={{
              color: "#9ca3af",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Pricing
          </a>
          <a
            href="#"
            style={{
              color: "#9ca3af",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Blog
          </a>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a
            href="#"
            style={{
              color: "#9ca3af",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Log in
          </a>
          <a
            href="#"
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              padding: "8px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Get started free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "100px 24px 80px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(124, 58, 237, 0.15)",
            border: "1px solid rgba(124, 58, 237, 0.4)",
            borderRadius: "99px",
            padding: "6px 16px",
            fontSize: "13px",
            color: "#c084fc",
            marginBottom: "24px",
          }}
        >
          ✨ Introducing AI-powered task management
        </div>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            lineHeight: "1.1",
            marginBottom: "24px",
            margin: "0 0 24px 0",
          }}
        >
          Get more done with
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI that works for you
          </span>
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#9ca3af",
            lineHeight: "1.7",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          TaskFlow uses AI to prioritise your tasks, eliminate busywork, and
          help your team ship faster than ever before.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {!submitted ? (
            <>
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  border: "1px solid #374151",
                  backgroundColor: "#0f172a",
                  color: "white",
                  fontSize: "15px",
                  width: "280px",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#7c3aed",
                  color: "white",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                Start for free →
              </button>
            </>
          ) : (
            <div
              style={{
                backgroundColor: "rgba(124, 58, 237, 0.15)",
                border: "1px solid rgba(124, 58, 237, 0.4)",
                borderRadius: "8px",
                padding: "12px 28px",
                color: "#c084fc",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              ✓ You're on the waitlist! We'll be in touch soon.
            </div>
          )}
        </div>
        <p style={{ color: "#6b7280", fontSize: "13px" }}>
          No credit card required · Free 14-day trial · Cancel anytime
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{ padding: "80px 64px", borderTop: "1px solid #1f2937" }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
              fontSize: "40px",
              fontWeight: "700",
              margin: "0 0 16px 0",
            }}
          >
            Everything your team needs
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "18px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Powerful features that help teams move faster and smarter.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: "🤖",
              title: "AI Task Prioritisation",
              desc: "Our AI analyses your workload and automatically sorts tasks by impact, deadline, and team capacity.",
            },
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Built for speed. TaskFlow loads in under 100ms so your team never waits for the tools they need.",
            },
            {
              icon: "🔗",
              title: "100+ Integrations",
              desc: "Connect with Slack, GitHub, Notion, Figma and 100+ other tools your team already uses every day.",
            },
            {
              icon: "📊",
              title: "Real-time Analytics",
              desc: "Track team velocity, spot bottlenecks, and make data-driven decisions with live dashboards.",
            },
            {
              icon: "🔒",
              title: "Enterprise Security",
              desc: "SOC 2 Type II certified. Your data is encrypted at rest and in transit with 99.9% uptime SLA.",
            },
            {
              icon: "🌍",
              title: "Works Anywhere",
              desc: "Fully responsive web app plus native iOS and Android apps so your team stays in sync everywhere.",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #1f2937",
                borderRadius: "16px",
                padding: "32px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#7c3aed")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#1f2937")
              }
            >
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  margin: "0 0 10px 0",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        style={{ padding: "80px 64px", borderTop: "1px solid #1f2937" }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
              fontSize: "40px",
              fontWeight: "700",
              margin: "0 0 16px 0",
            }}
          >
            Simple, transparent pricing
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "18px" }}>
            Start free. Scale as you grow. No hidden fees.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {[
            {
              name: "Starter",
              price: "$0",
              period: "forever",
              desc: "Perfect for individuals and small projects.",
              features: [
                "Up to 3 projects",
                "10 tasks per project",
                "Basic AI suggestions",
                "Email support",
              ],
              cta: "Get started free",
              highlight: false,
            },
            {
              name: "Pro",
              price: "$12",
              period: "per user/month",
              desc: "For growing teams that need more power.",
              features: [
                "Unlimited projects",
                "Unlimited tasks",
                "Full AI prioritisation",
                "Slack & GitHub integrations",
                "Priority support",
              ],
              cta: "Start free trial",
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "contact us",
              desc: "For large teams with advanced needs.",
              features: [
                "Everything in Pro",
                "SSO & SAML",
                "Custom integrations",
                "Dedicated account manager",
                "SLA guarantee",
              ],
              cta: "Contact sales",
              highlight: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              style={{
                backgroundColor: plan.highlight ? "#1e1b4b" : "#0f172a",
                border: `1px solid ${plan.highlight ? "#7c3aed" : "#1f2937"}`,
                borderRadius: "16px",
                padding: "32px",
                position: "relative",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#7c3aed",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "4px 14px",
                    borderRadius: "99px",
                    whiteSpace: "nowrap",
                  }}
                >
                  MOST POPULAR
                </div>
              )}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  margin: "0 0 8px 0",
                }}
              >
                {plan.name}
              </h3>
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "40px", fontWeight: "800" }}>
                  {plan.price}
                </span>
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    marginLeft: "6px",
                  }}
                >
                  {plan.period}
                </span>
              </div>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "14px",
                  marginBottom: "24px",
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
                      color: "#d1d5db",
                      fontSize: "14px",
                      padding: "6px 0",
                      borderBottom: "1px solid #1f2937",
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#7c3aed" }}>✓</span> {feat}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                style={{
                  display: "block",
                  textAlign: "center",
                  backgroundColor: plan.highlight ? "#7c3aed" : "transparent",
                  border: `1px solid ${plan.highlight ? "#7c3aed" : "#374151"}`,
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #1f2937",
          padding: "32px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              backgroundColor: "#7c3aed",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            T
          </div>
          <span style={{ fontWeight: "700" }}>TaskFlow</span>
        </div>
        <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
          © 2026 TaskFlow Inc. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Security", "Status"].map((link, i) => (
            <a
              key={i}
              href="#"
              style={{
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "13px",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;

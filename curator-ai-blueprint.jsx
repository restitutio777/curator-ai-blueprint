import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS — from DESIGN.md
   ═══════════════════════════════════════════════════════════════ */
const C = {
  primary: "#5f5e5e",
  primaryDim: "#535252",
  onPrimary: "#faf7f6",
  onBackground: "#2d3435",
  onSurface: "#2d3435",
  onSurfaceVariant: "#5a6061",
  surface: "#f9f9f9",
  surfaceContainerLow: "#f2f4f4",
  surfaceContainerLowest: "#ffffff",
  surfaceContainer: "#ebeeef",
  outlineVariant: "#adb3b4",
  tertiary: "#785a1a",
  tertiaryDim: "#6b4e0e",
  tertiaryFixed: "#fbd185",
  tertiaryFixedDim: "#ecc479",
  onTertiary: "#fff8f1",
  onTertiaryContainer: "#624604",
};

const FONT = "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Manrope:wght@200..800&display=swap";

const headline = "'Newsreader', serif";
const body = "'Manrope', sans-serif";

/* ═══════════════════════════════════════════════════════════════
   REVEAL HOOK
   ═══════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHARED STYLES
   ═══════════════════════════════════════════════════════════════ */
const wrap = { maxWidth: 1440, margin: "0 auto", padding: "0 48px" };
const overline = {
  fontFamily: body, fontSize: 11, fontWeight: 600,
  letterSpacing: "0.22em", textTransform: "uppercase", color: C.tertiary,
  marginBottom: 20, display: "block",
};
const h2Style = {
  fontFamily: headline, fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
  lineHeight: 1.1, color: C.onBackground, margin: 0, letterSpacing: "-0.01em",
};
const italic = { fontFamily: headline, fontStyle: "italic", fontWeight: 300 };
const cloudShadow = "0 20px 80px rgba(45,52,53,0.06)";
const borderSub = `1px solid ${C.outlineVariant}26`; // 15% opacity

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const linkS = (active) => ({
    fontFamily: body, fontSize: 11, fontWeight: 600,
    letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none",
    color: active ? C.onBackground : C.outlineVariant,
    borderBottom: active ? `2px solid ${C.tertiaryFixedDim}` : "2px solid transparent",
    paddingBottom: 4, transition: "color 0.3s",
  });
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(249,249,249,0.82)", backdropFilter: "blur(20px)",
      boxShadow: scrolled ? `0 1px 0 ${C.outlineVariant}26` : "none",
      transition: "box-shadow 0.4s",
    }}>
      <div style={{ ...wrap, display: "flex", justifyContent: "space-between", alignItems: "center", height: 72 }}>
        <a href="#" style={{ display: "flex", flexDirection: "column", textDecoration: "none", lineHeight: 1 }}>
          <span style={{ fontFamily: headline, fontSize: "1.15rem", color: C.onBackground, letterSpacing: "-0.01em" }}>Stefan Holz</span>
          <span style={{ fontFamily: body, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.22em", color: C.outlineVariant, marginTop: 3 }}>Curator AI</span>
        </a>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          <a href="#offer" style={linkS(true)}>Offer</a>
          <a href="#cases" style={linkS(false)}>Cases</a>
          <a href="#about" style={linkS(false)}>About</a>
        </div>
        <a href="#contact" style={{
          display: "inline-flex", alignItems: "center", height: 40, padding: "0 24px",
          background: C.primary, color: C.onPrimary,
          fontFamily: body, fontSize: 11, fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          textDecoration: "none", transition: "background 0.3s",
        }}>Start Project</a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <header style={{ paddingTop: 144, paddingBottom: 128 }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32, alignItems: "end" }}>
        <Reveal>
          <span style={overline}>Productization Strategy</span>
          <h1 style={{
            fontFamily: headline, fontSize: "clamp(3rem,7vw,7rem)", lineHeight: 1.05,
            color: C.onBackground, margin: 0, maxWidth: 900,
          }}>
            Drei Pakete.<br/><span style={italic}>Ein System.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15} style={{ paddingBottom: 8 }}>
          <p style={{
            fontFamily: body, fontSize: 18, lineHeight: 1.65, color: C.onSurfaceVariant,
            borderLeft: `2px solid ${C.outlineVariant}40`, paddingLeft: 32,
          }}>
            Wir transformieren vage Beratung in skalierbare Assets. Unsere Pakete sind darauf ausgelegt, Ihre operative Exzellenz mit KI-gestützter Autorität zu verbinden.
          </p>
        </Reveal>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PACKAGES
   ═══════════════════════════════════════════════════════════════ */
function PackageCard({ title, icon, tier, desc, items, price, priceLabel, cta, dark, delay }) {
  const [hov, setHov] = useState(false);
  const bg = dark ? C.primary : C.surfaceContainerLowest;
  const fg = dark ? C.onPrimary : C.onBackground;
  const fgMuted = dark ? "rgba(250,247,246,0.65)" : C.onSurfaceVariant;
  const numColor = dark ? C.tertiaryFixedDim : C.tertiary;
  const btnStyle = dark
    ? { background: C.tertiary, color: C.onTertiary }
    : { background: "transparent", color: C.primary, border: `1px solid ${C.primary}` };

  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: bg, padding: "40px 44px", display: "flex", flexDirection: "column",
          justifyContent: "space-between", height: "100%", position: "relative", overflow: "hidden",
          boxShadow: !dark && hov ? cloudShadow : "none", transition: "box-shadow 0.5s",
        }}
      >
        {dark && <div style={{
          position: "absolute", top: -120, right: -120, width: 280, height: 280,
          borderRadius: "50%", background: "rgba(120,90,26,0.08)", filter: "blur(80px)",
          pointerEvents: "none",
        }}/>}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
            <span style={{ fontSize: 28, color: numColor }}>{icon}</span>
            <span style={{ fontFamily: body, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: fgMuted, opacity: 0.6 }}>{tier}</span>
          </div>
          <h3 style={{ fontFamily: headline, fontSize: "2.2rem", lineHeight: 1.15, color: fg, marginBottom: 16 }}>{title}</h3>
          <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.65, color: fgMuted, marginBottom: 32 }}>{desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span style={{ fontFamily: body, fontSize: 14, fontWeight: 700, color: numColor, minWidth: 20 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: body, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.02em", color: fg }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ borderTop: dark ? "1px solid rgba(250,247,246,0.1)" : borderSub, paddingTop: 32, marginBottom: 32 }}>
            <span style={{ fontFamily: headline, fontSize: "1.8rem", color: fg }}>{price}</span>
            <span style={{ fontFamily: body, fontSize: 10, color: fgMuted, display: "block", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4 }}>{priceLabel}</span>
          </div>
          <button style={{
            width: "100%", padding: "16px 0", fontFamily: body, fontSize: 11,
            fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em",
            cursor: "pointer", transition: "all 0.3s", ...btnStyle,
          }}>{cta}</button>
        </div>
      </div>
    </Reveal>
  );
}

function Packages() {
  return (
    <section id="offer" style={{ background: C.surfaceContainerLow, padding: "128px 0" }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        <PackageCard delay={0} tier="Tier 01" icon="◇" title="Foundation"
          desc="Für etablierte Beratungen, die ihre internen Workflows durch KI-Infrastruktur skalierbar machen wollen."
          items={["System Audit & Mapping","Automation Implementation","Internal Workflow Training"]}
          price="4k – 6k" priceLabel="Einmalige Investition" cta="Select Foundation" />
        <PackageCard delay={0.08} tier="Tier 02" icon="◎" title="Identity" dark
          desc="Strategische Repositionierung als Marktführer. Wir bauen nicht nur Tools, wir erschaffen Ihre visuelle und kognitive Autorität."
          items={["Strategic Brand Identity","Premium Visual Design System","Editorial Photography Direction","Authority Content Assets"]}
          price="8k – 12k" priceLabel="Ganzheitliche Transformation" cta="Elevate Identity" />
        <PackageCard delay={0.16} tier="Tier 03" icon="∞" title="Premium System"
          desc="Die ultimative Partnerschaft für skalierbare Akquise und Case-Performance. Ein End-to-End System für maximalen Impact."
          items={["Full Strategic Ecosystem","Case Development Engine","Ongoing Conversion Optimization","Quarterly Authority Review"]}
          price="12k – 15k" priceLabel="Premium Partnership" cta="Request Access" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IMAGE BREAK
   ═══════════════════════════════════════════════════════════════ */
function ImageBreak() {
  return (
    <section style={{ padding: "128px 0" }}>
      <div style={wrap}>
        <Reveal>
          <div style={{ position: "relative", height: 560, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&auto=format&fit=crop"
              alt="Minimalist office" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.92) contrast(1.02)" }}/>
            <div style={{ position: "absolute", inset: 0, background: "rgba(95,94,94,0.15)" }}/>
            <div style={{
              position: "absolute", bottom: 48, right: 48, maxWidth: 420,
              background: C.surfaceContainerLowest, padding: 48,
            }}>
              <p style={{ fontFamily: headline, fontSize: "1.7rem", fontStyle: "italic", lineHeight: 1.3, color: C.onBackground, margin: 0 }}>
                "Exzellenz ist kein Zufall, sondern das Ergebnis kuratierter Prozesse."
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY
   ═══════════════════════════════════════════════════════════════ */
function CaseStudy() {
  const metrics = [
    { val: "–68%", label: "Bearbeitungszeit" },
    { val: "–90%", label: "Fehlerquote" },
    { val: "3 FTE", label: "freigesetzt" },
  ];
  return (
    <section id="cases" style={{ background: C.surfaceContainerLow, padding: "128px 0" }}>
      <div style={wrap}>
        <Reveal>
          <span style={overline}>Ergebnis</span>
          <h2 style={{ ...h2Style, maxWidth: 640 }}>Vom manuellen Prozess<br/><span style={italic}>zum skalierbaren System.</span></h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 64, alignItems: "center" }}>
          <Reveal delay={0.05}>
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=85&auto=format&fit=crop"
                alt="Case" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.92) contrast(1.02)" }}/>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <span style={{ fontFamily: body, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.outlineVariant, display: "block", marginBottom: 32 }}>
              Maschinenbauer · 120 MA · DACH
            </span>
            {[
              { label: "Ausgangslage", text: "Manuelle Angebotserstellung, 4–6 Stunden pro Anfrage. Hoher Fehleranteil, keine systematische Nachverfolgung.", bold: false },
              { label: "Maßnahme", text: "Automatisierte Angebotspipeline mit strukturierter Datenübernahme, KI-gestützter Kalkulation und CRM-Anbindung.", bold: false },
              { label: "Ergebnis", text: "Bearbeitungszeit –68%. Fehlerquote –90%. 3 FTE freigesetzt für strategische Aufgaben.", bold: true },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 28 }}>
                <span style={{ fontFamily: body, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: C.tertiary }}>{r.label}</span>
                <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.6, color: r.bold ? C.onBackground : C.onSurfaceVariant, fontWeight: r.bold ? 600 : 400, marginTop: 8 }}>{r.text}</p>
              </div>
            ))}
            <div style={{ display: "flex", gap: 48, marginTop: 8, paddingTop: 32, borderTop: borderSub }}>
              {metrics.map((m, i) => (
                <div key={i}>
                  <span style={{ fontFamily: headline, fontSize: "1.8rem", color: C.tertiary }}>{m.val}</span>
                  <span style={{ fontFamily: body, fontSize: 10, color: C.onSurfaceVariant, display: "block", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4 }}>{m.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROCESS
   ═══════════════════════════════════════════════════════════════ */
function Process() {
  const steps = [
    { n: "01", t: "Analyse", d: "Prozesse verstehen, Potenziale identifizieren, klare Prioritäten setzen." },
    { n: "02", t: "Konzept", d: "Fahrplan entwickeln, Technologie auswählen, ROI berechnen." },
    { n: "03", t: "Umsetzung", d: "Schrittweise implementieren, testen, optimieren. Ergebnis sichern." },
  ];
  return (
    <section style={{ background: C.surface, padding: "128px 0" }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
        <Reveal>
          <span style={overline}>Vorgehen</span>
          <h2 style={{ ...h2Style, fontSize: "clamp(2.2rem,4vw,3.2rem)" }}>Drei Schritte.<br/><span style={italic}>Ein Ergebnis.</span></h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={0.05 + i * 0.07}>
              <span style={{ fontFamily: headline, fontSize: "2.5rem", color: C.tertiary, lineHeight: 1 }}>{s.n}</span>
              <h3 style={{ fontFamily: headline, fontSize: 20, color: C.onBackground, margin: "16px 0 12px" }}>{s.t}</h3>
              <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.6, color: C.onSurfaceVariant }}>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════ */
function FAQ() {
  const items = [
    { cat: "01. Implementierung", q: "Wie lange dauert die Integration?", a: "In der Regel benötigen wir für das Foundation-Paket 4–6 Wochen, während das Identity-Paket aufgrund der visuellen und strategischen Tiefe etwa 8–12 Wochen in Anspruch nimmt." },
    { cat: "02. ROI", q: "Wann amortisiert sich das System?", a: "Unsere Kunden berichten von einer Reduzierung der manuellen administrativen Last um 40% innerhalb der ersten drei Monate nach Implementierung des Foundation-Systems." },
    { cat: "03. Ownership", q: "Wer besitzt die KI-Assets?", a: "Sie. Alle implementierten Workflows, Custom-GPTs und Datenbank-Strukturen gehen nach Projektabschluss vollständig in Ihr geistiges Eigentum über." },
    { cat: "04. Flexibilität", q: "Kann ich später upgraden?", a: "Absolut. Das Foundation-System ist der nukleare Kern. Viele Kunden starten dort und skalieren nach der ersten Effizienzsteigerung in die Identity-Phase." },
  ];
  return (
    <section style={{ background: C.surfaceContainerLow, padding: "128px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
        <Reveal>
          <h2 style={{ ...h2Style, fontSize: "clamp(2.2rem,4vw,3.2rem)", position: "sticky", top: 128 }}>Fragen zur<br/>Transformation.</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={0.05}>
              <span style={{ fontFamily: body, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: C.tertiary, display: "block", marginBottom: 16 }}>{item.cat}</span>
              <p style={{ fontFamily: headline, fontSize: 24, color: C.onBackground, marginBottom: 12 }}>{item.q}</p>
              <p style={{ fontFamily: body, fontSize: 15, lineHeight: 1.65, color: C.onSurfaceVariant }}>{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ background: C.surface, padding: "128px 0" }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "5fr 7fr", gap: 64, alignItems: "center" }}>
        <Reveal>
          <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=85&auto=format&fit=crop"
              alt="Portrait" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "saturate(0.92) contrast(1.02)" }}/>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <span style={overline}>Über mich</span>
          <h2 style={{ ...h2Style, fontSize: "clamp(2rem,3.5vw,2.8rem)", marginBottom: 32 }}>
            Klarheit vor Komplexität.<br/><span style={italic}>Wirkung vor Werkzeug.</span>
          </h2>
          <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.7, color: C.onSurfaceVariant, marginBottom: 20 }}>
            Mein Ansatz beginnt nie bei der Technologie, sondern beim Problem. KI ist ein Werkzeug — kein Selbstzweck. Was zählt, ist das Ergebnis: weniger Reibung, klarere Abläufe, messbare Wirkung.
          </p>
          <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.7, color: C.onSurfaceVariant, marginBottom: 40 }}>
            Seit über zehn Jahren arbeite ich mit Mittelständlern und B2B-Unternehmen. Ich bringe Struktur in das, was gewachsen ist — und sorge dafür, dass Automatisierung nicht nur funktioniert, sondern sich trägt.
          </p>
          <div style={{ display: "flex", gap: 56, paddingTop: 32, borderTop: borderSub }}>
            {[{ v: "10+", l: "Jahre" }, { v: "B2B", l: "Fokus" }, { v: "DACH", l: "Region" }].map((m, i) => (
              <div key={i}>
                <span style={{ fontFamily: headline, fontSize: "1.5rem", color: C.onBackground }}>{m.v}</span>
                <span style={{ fontFamily: body, fontSize: 10, color: C.onSurfaceVariant, display: "block", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4 }}>{m.l}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section id="contact" style={{ background: C.surfaceContainer, padding: "128px 0" }}>
      <div style={{ ...wrap, textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: headline, fontSize: "clamp(3rem,7vw,6.5rem)", lineHeight: 1.05, color: C.onBackground, marginBottom: 48 }}>
            Bereit für Autorität?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              display: "inline-flex", alignItems: "center", padding: "20px 48px",
              background: C.primary, color: C.onPrimary,
              fontFamily: body, fontSize: 11, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.2em", textDecoration: "none",
            }}>Erstgespräch vereinbaren</a>
            <a href="#cases" style={{
              fontFamily: body, fontSize: 11, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.18em",
              color: C.onBackground, textDecoration: "none",
              borderBottom: `2px solid ${C.tertiaryFixedDim}`, paddingBottom: 4,
            }}>Portfolio ansehen</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  const fLink = { fontFamily: body, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: C.onSurfaceVariant, textDecoration: "none" };
  return (
    <footer style={{ background: C.surfaceContainerLow }}>
      <div style={{ ...wrap, display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingTop: 64, paddingBottom: 64, flexWrap: "wrap", gap: 48 }}>
        <div>
          <a href="#" style={{ display: "flex", flexDirection: "column", textDecoration: "none", lineHeight: 1, marginBottom: 20 }}>
            <span style={{ fontFamily: headline, fontSize: 18, color: C.onBackground }}>Stefan Holz</span>
            <span style={{ fontFamily: body, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.22em", color: C.outlineVariant, marginTop: 6 }}>Curator AI</span>
          </a>
          <p style={{ fontFamily: body, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.outlineVariant, maxWidth: 280, lineHeight: 1.6 }}>
            The Editorial Authority in Automation. Transforming Knowledge into Assets.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: body, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.outlineVariant, fontWeight: 700 }}>Network</span>
            <a href="#" style={fLink}>LinkedIn</a>
            <a href="#" style={fLink}>Contact</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: body, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: C.outlineVariant, fontWeight: 700 }}>Legal</span>
            <a href="#" style={fLink}>Privacy</a>
            <a href="#" style={fLink}>Terms</a>
          </div>
        </div>
      </div>
      <div style={{ ...wrap, paddingBottom: 48 }}>
        <p style={{ fontFamily: body, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.outlineVariant }}>
          © 2026 Stefan Holz · Curator AI. The Editorial Authority in Automation.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function CuratorAI() {
  return (
    <>
      <link href={FONT} rel="stylesheet"/>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { background: ${C.surface}; overflow-x: hidden; font-family: ${body}; color: ${C.onSurface}; }
        ::selection { background: ${C.tertiaryFixed}; color: ${C.onTertiaryContainer}; }
      `}</style>
      <Nav/>
      <Hero/>
      <Packages/>
      <ImageBreak/>
      <CaseStudy/>
      <Process/>
      <FAQ/>
      <About/>
      <FinalCTA/>
      <Footer/>
    </>
  );
}

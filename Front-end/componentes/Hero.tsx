import Link from "next/link";

export default function Hero() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #faf7f2 0%, #fef3c7 50%, #fce7f3 100%)",
    }}>
      {/* manchas decorativas */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 500, background: "#f59e0b33", borderRadius: "50%", filter: "blur(120px)" }} />
      <div style={{ position: "absolute", bottom: "-30%", left: "-10%", width: 600, height: 600, background: "#ec489933", borderRadius: "50%", filter: "blur(140px)" }} />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "82vh", maxWidth: 1180, margin: "0 auto",
        padding: "0 2rem", alignItems: "center", gap: "4rem",
        position: "relative", zIndex: 2,
      }}>
        <div>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #f59e0b, #ec4899)",
            color: "#fff", fontSize: 11, letterSpacing: "0.16em",
            padding: "8px 16px", borderRadius: 999, marginBottom: "1.8rem",
            textTransform: "uppercase", fontWeight: 600,
            boxShadow: "0 4px 14px rgba(236,72,153,0.3)",
          }}>
            ✨ Coleção 2026
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
            lineHeight: 1.05, fontWeight: 600, marginBottom: "1.4rem", color: "#2c1f0e",
          }}>
            O olhar que define o seu{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>estilo</em>
          </h1>
          <p style={{ color: "#4a3520", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 400, maxWidth: 460 }}>
            Óculos de grau, sol, esportivos e premium para quem enxerga o mundo
            com personalidade. As melhores marcas em um só lugar.
          </p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <Link href="#produtos" style={{
              background: "linear-gradient(135deg, #2c1f0e, #4a3520)", color: "#faf7f2",
              padding: "16px 32px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none",
              boxShadow: "0 8px 20px rgba(44,31,14,0.25)", display: "inline-block",
            }}>
              Explorar coleção
            </Link>
            <Link href="/contato" style={{
              background: "rgba(255,255,255,0.7)", color: "#2c1f0e",
              border: "1px solid rgba(184,145,74,0.4)", padding: "16px 28px",
              borderRadius: 999, fontSize: 13, fontWeight: 500,
              letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none",
              backdropFilter: "blur(8px)", display: "inline-block",
            }}>
              Agendar consulta
            </Link>
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 540, position: "relative", overflow: "hidden", borderRadius: 12,
          boxShadow: "0 20px 60px rgba(44,31,14,0.15)",
        }}>
          <img
            src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1000&q=85"
            alt="Coleção Ultra V"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", bottom: "1.5rem", left: "1.5rem",
            background: "rgba(44,31,14,0.92)", color: "#faf7f2",
            padding: "12px 20px", borderRadius: 999, fontSize: 11,
            letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
            backdropFilter: "blur(8px)",
          }}>
            ✨ Coleção exclusiva
          </div>
        </div>
      </div>
    </section>
  );
}

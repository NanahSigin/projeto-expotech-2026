const stats = [
  { num: "800+", label: "Modelos em estoque", cor: "#f59e0b" },
  { num: "50+", label: "Marcas disponíveis", cor: "#06b6d4" },
  { num: "12 anos", label: "De experiência", cor: "#ec4899" },
  { num: "4.9★", label: "Avaliação média", cor: "#8b5cf6" },
];

export default function Stats() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #ede9fe 100%)",
      padding: "2.5rem 0", borderTop: "1px solid rgba(184,145,74,0.15)", borderBottom: "1px solid rgba(184,145,74,0.15)",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: 1180, margin: "0 auto", padding: "0 2rem", gap: "1rem" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "0 1.5rem" }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 700,
              background: `linear-gradient(135deg, ${s.cor}, #2c1f0e)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{s.num}</div>
            <div style={{ color: "#4a3520", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

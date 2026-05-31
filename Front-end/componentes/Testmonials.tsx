const reviews = [
  { initials: "CM", name: "Camila M.", role: "Professora · SP", text: "Atendimento excepcional. Me ajudaram a escolher a armação ideal para o meu rosto. As lentes ficaram prontas em 2 dias!" },
  { initials: "TF", name: "Thiago F.", role: "Engenheiro · RJ", text: "Comprei online pelo site, chegou rapidíssimo e as lentes estão perfeitas. Qualidade muito acima do que esperava pelo preço." },
  { initials: "AS", name: "Amanda S.", role: "Designer · MG", text: "Minha terceira compra na Ultra V. Nunca decepciona. Variedade enorme de armações e preço justo. Recomendo demais!" },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.8rem" }}>Depoimentos</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, marginBottom: "2.5rem" }}>
        O que nossos clientes dizem
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.5rem" }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ background: "#f0ebe2", border: "0.5px solid #e0d5c5", borderRadius: 3, padding: "1.75rem" }}>
            <div style={{ color: "#b8914a", fontSize: 13, marginBottom: "1rem", letterSpacing: 3 }}>★★★★★</div>
            <p style={{ color: "#8c7b68", fontSize: 13, lineHeight: 1.75, marginBottom: "1.25rem", fontStyle: "italic", fontWeight: 300 }}>"{r.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2c1f0e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, color: "#faf7f2" }}>
                {r.initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#2c1f0e" }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "#8c7b68" }}>{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const items = [
  { icon: "👁️", title: "Exame de vista gratuito", desc: "Atendimento com optometrista credenciado sem custo adicional." },
  { icon: "🔬", title: "Lentes de alta precisão", desc: "Trabalhamos com os melhores laboratórios ópticos do mercado." },
  { icon: "🚚", title: "Entrega em todo o Brasil", desc: "Enviamos para todo o país com rastreamento e seguro." },
  { icon: "💳", title: "Parcelamento facilitado", desc: "Até 12x sem juros no cartão ou desconto no Pix." },
];

export default function Features() {
  return (
    <section style={{ background: "#2c1f0e", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.8rem" }}>Por que a Ultra V?</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 600, color: "#faf7f2", marginBottom: "0.8rem" }}>
          A melhor ótica do Brasil
        </h2>
        <p style={{ color: "rgba(250,247,242,0.5)", fontSize: 14, lineHeight: 1.8, maxWidth: 460, marginBottom: "3rem", fontWeight: 300 }}>
          Cuidamos dos seus olhos com a mesma atenção que você merece.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {items.map((item, i) => (
            <div key={i} style={{ padding: "2rem", borderRight: "0.5px solid rgba(255,255,255,0.1)", borderTop: "0.5px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{item.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#faf7f2", fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "rgba(250,247,242,0.5)", fontSize: 12, lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function Footer() {
  const cols = [
    {
      title: "Coleções", links: [
        { label: "☀️ Óculos de Sol", href: "/colecao/sol" },
        { label: "👓 Óculos de Grau", href: "/colecao/grau" },
        { label: "✨ Armações", href: "/colecao/armacao" },
        { label: "🏃 Esportivo", href: "/colecao/esportivo" },
        { label: "👑 Premium", href: "/colecao/premium" },
      ]
    },
    {
      title: "Conta", links: [
        { label: "Entrar", href: "/login" },
        { label: "Criar conta", href: "/cadastro" },
        { label: "Meu carrinho", href: "/carrinho" },
        { label: "Área admin", href: "/admin" },
      ]
    },
    {
      title: "Suporte", links: [
        { label: "Contato", href: "/contato" },
        { label: "WhatsApp", href: "https://wa.me/5511999999999" },
        { label: "Trocas", href: "/contato" },
        { label: "FAQ", href: "/contato" },
      ]
    },
  ];

  return (
    <footer style={{
      background: "linear-gradient(135deg, #2c1f0e 0%, #1a1308 100%)",
      padding: "4rem 2rem 2rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "#b8914a22", borderRadius: "50%", filter: "blur(120px)" }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#faf7f2", marginBottom: "1rem" }}>
              Ultra<span style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>V</span>
            </div>
            <p style={{ color: "rgba(250,247,242,0.55)", fontSize: 13, lineHeight: 1.7, fontWeight: 300, marginBottom: "1.4rem" }}>
              Sua ótica de referência desde 2014.<br />Qualidade, estilo e precisão em cada par.
            </p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {["📷", "📘", "🐦"].map((emoji, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(184,145,74,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, textDecoration: "none",
                }}>{emoji}</a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "1.2rem", fontWeight: 600 }}>{col.title}</h4>
              <ul style={{ listStyle: "none" }}>
                {col.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: 10 }}>
                    <Link href={link.href} style={{ color: "rgba(250,247,242,0.65)", fontSize: 13, fontWeight: 300, textDecoration: "none" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(184,145,74,0.2)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ color: "rgba(250,247,242,0.4)", fontSize: 11 }}>© 2026 Ultra V Ótica. Todos os direitos reservados.</span>
          <span style={{ color: "rgba(250,247,242,0.4)", fontSize: 11 }}>Política de Privacidade · Termos de Uso</span>
        </div>
      </div>
    </footer>
  );
}

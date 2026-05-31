"use client";
import { useState } from "react";

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (enviado) return (
    <main style={{ background: "#faf7f2", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
      <div style={{ fontSize: "3rem" }}>✅</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600 }}>Mensagem enviada!</h2>
      <p style={{ color: "#8c7b68", fontSize: 14 }}>Entraremos em contato em até 24 horas.</p>
      <button onClick={() => setEnviado(false)} style={{
        background: "#2c1f0e", color: "#faf7f2", padding: "14px 32px",
        borderRadius: 2, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer",
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        Enviar outra mensagem
      </button>
    </main>
  );

  const input = {
    width: "100%", padding: "12px 14px", background: "#faf7f2",
    border: "0.5px solid #e0d5c5", borderRadius: 2, fontSize: 14,
    color: "#2c1f0e", fontFamily: "'Jost', sans-serif", outline: "none",
  };

  return (
    <main style={{ background: "#faf7f2", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#2c1f0e", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.8rem" }}>
          Fale conosco
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 600, color: "#faf7f2", marginBottom: "1rem" }}>
          Como podemos ajudar?
        </h1>
        <p style={{ color: "rgba(250,247,242,0.55)", fontSize: 15, maxWidth: 460, margin: "0 auto", fontWeight: 300, lineHeight: 1.8 }}>
          Nossa equipe está disponível de segunda a sábado das 9h às 18h.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "5rem 2rem", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "5rem" }}>
        {/* Info */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "2rem" }}>
            Informações
          </div>
          {[
            { icon: "📍", titulo: "Endereço", info: "Av. Paulista, 1000\nSão Paulo - SP" },
            { icon: "📞", titulo: "Telefone", info: "(11) 4002-8922" },
            { icon: "📧", titulo: "E-mail", info: "contato@ultrav.com.br" },
            { icon: "🕐", titulo: "Horário", info: "Seg–Sex: 9h às 18h\nSáb: 9h às 14h" },
          ].map((item) => (
            <div key={item.titulo} style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "1.4rem" }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, marginBottom: 4 }}>{item.titulo}</div>
                <div style={{ color: "#8c7b68", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.info}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "2rem", padding: "1.5rem", background: "#f0ebe2", borderRadius: 3, border: "0.5px solid #e0d5c5" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>WhatsApp</div>
            <p style={{ color: "#8c7b68", fontSize: 13, lineHeight: 1.7, marginBottom: "1rem" }}>
              Prefere resolver pelo WhatsApp? Clique abaixo e fale direto com nossa equipe.
            </p>
            <a href="https://wa.me/5511999999999" target="_blank" style={{
              display: "inline-block", background: "#25d366", color: "#fff",
              padding: "10px 20px", borderRadius: 2, fontSize: 12, fontWeight: 500,
              textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              Abrir WhatsApp
            </a>
          </div>
        </div>

        {/* Formulário */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "2rem" }}>
            Enviar mensagem
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6 }}>Nome</label>
              <input style={input} placeholder="Seu nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6 }}>Telefone</label>
              <input style={input} placeholder="(11) 99999-9999" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6 }}>E-mail</label>
            <input style={input} type="email" placeholder="seu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6 }}>Assunto</label>
            <select style={{ ...input }} value={form.assunto} onChange={e => setForm({ ...form, assunto: e.target.value })}>
              <option value="">Selecione</option>
              <option>Dúvida sobre produto</option>
              <option>Pedido e entrega</option>
              <option>Troca e devolução</option>
              <option>Agendar consulta</option>
              <option>Outro</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6 }}>Mensagem</label>
            <textarea
              style={{ ...input, height: 150, resize: "vertical" }}
              placeholder="Como podemos ajudar?"
              value={form.mensagem}
              onChange={e => setForm({ ...form, mensagem: e.target.value })}
            />
          </div>

          <button onClick={handleSubmit} style={{
            background: "#2c1f0e", color: "#faf7f2", border: "none", width: "100%",
            padding: "16px", borderRadius: 2, fontSize: 13, fontWeight: 500,
            cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Enviar mensagem
          </button>
        </div>
      </div>
    </main>
  );
}

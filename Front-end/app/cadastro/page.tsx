"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function CadastroPage() {
  const router = useRouter();
  const { cadastrarUsuario } = useAuth();
  const [form, setForm] = useState({ nome: "", cpf: "", telefone: "", email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    const r = await cadastrarUsuario(form);
    setLoading(false);
    if (r.ok) router.push("/");
    else setErro(r.erro ?? "Erro desconhecido");
  };

  return (
    <main style={{ background: "#faf7f2", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <form onSubmit={handleSubmit} style={card}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.6rem" }}>Nova conta</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, marginBottom: "1.5rem" }}>Criar conta</h1>

        <label style={lbl}>Nome completo</label>
        <input style={inp} required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={lbl}>CPF</label>
            <input style={inp} required value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} placeholder="000.000.000-00" />
          </div>
          <div>
            <label style={lbl}>Telefone</label>
            <input style={inp} required value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} placeholder="(11) 99999-9999" />
          </div>
        </div>

        <label style={lbl}>E-mail</label>
        <input style={inp} type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

        <label style={lbl}>Senha</label>
        <input style={inp} type="password" required minLength={4} value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} />

        {erro && <div style={erroStyle}>{erro}</div>}

        <button type="submit" disabled={loading} style={{ ...btn, opacity: loading ? 0.7 : 1 }}>
          {loading ? "Criando conta..." : "Criar conta"}
        </button>

        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: 13, color: "#8c7b68" }}>
          Já tem conta? <Link href="/login" style={{ color: "#2c1f0e", fontWeight: 500 }}>Entrar</Link>
        </div>
      </form>
    </main>
  );
}

const card: React.CSSProperties = { width: "100%", maxWidth: 460, background: "#fff", border: "0.5px solid #e0d5c5", borderRadius: 3, padding: "2.5rem", boxShadow: "0 8px 24px rgba(44,31,14,0.04)" };
const lbl: React.CSSProperties = { fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6, marginTop: "1rem" };
const inp: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "#faf7f2", border: "0.5px solid #e0d5c5", borderRadius: 2, fontSize: 14, color: "#2c1f0e", outline: "none" };
const btn: React.CSSProperties = { background: "#2c1f0e", color: "#faf7f2", border: "none", width: "100%", padding: "14px", borderRadius: 2, fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "1.5rem" };
const erroStyle: React.CSSProperties = { background: "#fdecec", border: "0.5px solid #f5b5b5", color: "#8a1f1f", padding: "10px 12px", borderRadius: 2, fontSize: 13, marginTop: "1rem" };

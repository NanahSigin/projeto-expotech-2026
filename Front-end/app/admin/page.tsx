"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { admin, loginAdmin } = useAuth();
  const [form, setForm] = useState({ login: "", senha: "" });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) router.replace("/admin/produtos");
  }, [admin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    const r = await loginAdmin(form.login, form.senha);
    setLoading(false);
    if (r.ok) router.push("/admin/produtos");
    else setErro(r.erro ?? "Erro desconhecido");
  };

  return (
    <main style={{ background: "#2c1f0e", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1rem" }}>
      <form onSubmit={handleSubmit} style={card}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.6rem" }}>Área restrita</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, marginBottom: "0.4rem" }}>Admin Ultra V</h1>
        <p style={{ color: "#8c7b68", fontSize: 13, marginBottom: "1.5rem" }}>Acesso apenas para administradores cadastrados.</p>

        <label style={lbl}>Usuário ou e-mail</label>
        <input style={inp} required value={form.login} onChange={e => setForm({ ...form, login: e.target.value })} placeholder="admin" />

        <label style={lbl}>Senha</label>
        <input style={inp} type="password" required value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} />

        {erro && <div style={erroStyle}>{erro}</div>}

        <button type="submit" disabled={loading} style={{ ...btn, opacity: loading ? 0.7 : 1 }}>
          {loading ? "Entrando..." : "Entrar como admin"}
        </button>

        <div style={{ marginTop: "1.5rem", padding: "0.8rem", background: "#f0ebe2", borderRadius: 2, fontSize: 12, color: "#4a3520" }}>
          <strong>Admin de demonstração</strong><br />
          Usuário: <code>admin</code> · Senha: <code>admin123</code>
        </div>
      </form>
    </main>
  );
}

const card: React.CSSProperties = { width: "100%", maxWidth: 420, background: "#faf7f2", border: "0.5px solid #b8914a", borderRadius: 3, padding: "2.5rem" };
const lbl: React.CSSProperties = { fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6, marginTop: "1rem" };
const inp: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "#fff", border: "0.5px solid #e0d5c5", borderRadius: 2, fontSize: 14, color: "#2c1f0e", outline: "none" };
const btn: React.CSSProperties = { background: "#b8914a", color: "#faf7f2", border: "none", width: "100%", padding: "14px", borderRadius: 2, fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "1.5rem" };
const erroStyle: React.CSSProperties = { background: "#fdecec", border: "0.5px solid #f5b5b5", color: "#8a1f1f", padding: "10px 12px", borderRadius: 2, fontSize: 13, marginTop: "1rem" };

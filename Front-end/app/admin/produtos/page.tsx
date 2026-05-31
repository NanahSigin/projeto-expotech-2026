"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  destaque: boolean;
  descricao: string;
  imagemUrl: string;
};

const API = "http://localhost:8080";
const empty: Produto = { id: 0, nome: "", preco: 0, categoria: "Sol", destaque: false, descricao: "", imagemUrl: "" };

export default function AdminProdutosPage() {
  const router = useRouter();
  const { admin } = useAuth();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editando, setEditando] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [msg, setMsg] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);

  useEffect(() => {
    if (!admin) {
      router.replace("/admin");
      return;
    }
    carregar();
  }, [admin]);

  const carregar = async () => {
    setCarregando(true);
    try {
      const res = await fetch(`${API}/produtos`);
      if (res.ok) setProdutos(await res.json());
    } catch {}
    setCarregando(false);
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editando || !admin) return;
    const isNew = editando.id === 0;
    const url = isNew ? `${API}/produtos` : `${API}/produtos/${editando.id}`;
    try {
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Id": String(admin.idAdministrador),
        },
        body: JSON.stringify(editando),
      });
      if (!res.ok) throw new Error();
      setMsg({ tipo: "ok", texto: isNew ? "Produto cadastrado!" : "Produto atualizado!" });
      setEditando(null);
      carregar();
    } catch {
      setMsg({ tipo: "erro", texto: "Erro ao salvar produto." });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  const remover = async (p: Produto) => {
    if (!admin) return;
    if (!confirm(`Remover "${p.nome}"?`)) return;
    try {
      const res = await fetch(`${API}/produtos/${p.id}`, {
        method: "DELETE",
        headers: { "X-Admin-Id": String(admin.idAdministrador) },
      });
      if (!res.ok) throw new Error();
      setMsg({ tipo: "ok", texto: "Produto removido." });
      carregar();
    } catch {
      setMsg({ tipo: "erro", texto: "Erro ao remover." });
    }
    setTimeout(() => setMsg(null), 3000);
  };

  if (!admin) return null;

  return (
    <main style={{ background: "#faf7f2", minHeight: "100vh", padding: "2.5rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.4rem" }}>Painel admin</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 600 }}>Gerenciar produtos</h1>
          </div>
          <button onClick={() => setEditando({ ...empty })} style={btnPrimary}>+ Novo produto</button>
        </div>

        {msg && (
          <div style={{
            padding: "10px 14px", marginBottom: "1.2rem", borderRadius: 2, fontSize: 13,
            background: msg.tipo === "ok" ? "#e8f3ec" : "#fdecec",
            border: `0.5px solid ${msg.tipo === "ok" ? "#b3d4be" : "#f5b5b5"}`,
            color: msg.tipo === "ok" ? "#2d5a3a" : "#8a1f1f",
          }}>{msg.texto}</div>
        )}

        {editando && (
          <form onSubmit={salvar} style={{ background: "#fff", border: "0.5px solid #b8914a", borderRadius: 3, padding: "1.8rem", marginBottom: "2rem" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", marginBottom: "1.2rem" }}>
              {editando.id === 0 ? "Novo produto" : `Editando #${editando.id}`}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={lbl}>Nome</label>
                <input style={inp} required value={editando.nome} onChange={e => setEditando({ ...editando, nome: e.target.value })} />
              </div>
              <div>
                <label style={lbl}>Preço (R$)</label>
                <input style={inp} type="number" step="0.01" required value={editando.preco} onChange={e => setEditando({ ...editando, preco: Number(e.target.value) })} />
              </div>
              <div>
                <label style={lbl}>Categoria</label>
                <select style={inp} value={editando.categoria} onChange={e => setEditando({ ...editando, categoria: e.target.value })}>
                  <option value="Sol">☀️ Sol</option>
                  <option value="Grau">👓 Grau</option>
                  <option value="Armacao">✨ Armação</option>
                  <option value="Esportivo">🏃 Esportivo</option>
                  <option value="Premium">👑 Premium</option>
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "1.6rem" }}>
                <input type="checkbox" id="destaque" checked={editando.destaque} onChange={e => setEditando({ ...editando, destaque: e.target.checked })} />
                <label htmlFor="destaque" style={{ fontSize: 13, color: "#4a3520" }}>Produto em destaque</label>
              </div>
            </div>
            <label style={lbl}>URL da imagem</label>
            <input style={inp} value={editando.imagemUrl} onChange={e => setEditando({ ...editando, imagemUrl: e.target.value })} placeholder="https://..." />
            <label style={lbl}>Descrição</label>
            <textarea style={{ ...inp, height: 90, resize: "vertical" }} required value={editando.descricao} onChange={e => setEditando({ ...editando, descricao: e.target.value })} />
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem" }}>
              <button type="submit" style={btnPrimary}>Salvar</button>
              <button type="button" onClick={() => setEditando(null)} style={btnGhost}>Cancelar</button>
            </div>
          </form>
        )}

        {carregando ? (
          <div style={{ textAlign: "center", color: "#8c7b68", padding: "3rem" }}>Carregando...</div>
        ) : (
          <div style={{ background: "#fff", border: "0.5px solid #e0d5c5", borderRadius: 3, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead style={{ background: "#f0ebe2" }}>
                <tr>
                  <th style={th}></th>
                  <th style={th}>Nome</th>
                  <th style={th}>Categoria</th>
                  <th style={th}>Preço</th>
                  <th style={th}>Destaque</th>
                  <th style={th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map(p => (
                  <tr key={p.id} style={{ borderTop: "0.5px solid #e0d5c5" }}>
                    <td style={td}>
                      {p.imagemUrl ? (
                        <img src={p.imagemUrl} alt={p.nome} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 2 }} />
                      ) : (
                        <div style={{ width: 50, height: 50, background: "#f0ebe2", borderRadius: 2 }} />
                      )}
                    </td>
                    <td style={td}>{p.nome}</td>
                    <td style={td}>{p.categoria}</td>
                    <td style={td}>R$ {p.preco.toLocaleString("pt-BR")}</td>
                    <td style={td}>{p.destaque ? "Sim" : "Não"}</td>
                    <td style={td}>
                      <button onClick={() => setEditando(p)} style={{ ...btnGhost, padding: "6px 12px", fontSize: 11, marginRight: 6 }}>Editar</button>
                      <button onClick={() => remover(p)} style={{ ...btnGhost, padding: "6px 12px", fontSize: 11, color: "#8a1f1f", borderColor: "#f5b5b5" }}>Remover</button>
                    </td>
                  </tr>
                ))}
                {produtos.length === 0 && (
                  <tr><td colSpan={6} style={{ ...td, textAlign: "center", color: "#8c7b68", padding: "2rem" }}>Nenhum produto cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

const lbl: React.CSSProperties = { fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", display: "block", marginBottom: 6, marginTop: "1rem" };
const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", background: "#faf7f2", border: "0.5px solid #e0d5c5", borderRadius: 2, fontSize: 14, color: "#2c1f0e", outline: "none" };
const btnPrimary: React.CSSProperties = { background: "#2c1f0e", color: "#faf7f2", border: "none", padding: "11px 22px", borderRadius: 2, fontSize: 12, fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" };
const btnGhost: React.CSSProperties = { background: "transparent", border: "0.5px solid #e0d5c5", padding: "10px 16px", borderRadius: 2, fontSize: 12, color: "#2c1f0e", cursor: "pointer", letterSpacing: "0.04em" };
const th: React.CSSProperties = { textAlign: "left", padding: "12px 14px", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8c7b68", fontWeight: 500 };
const td: React.CSSProperties = { padding: "12px 14px", color: "#2c1f0e" };

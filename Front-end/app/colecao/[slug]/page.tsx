"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { categorias, produtos as produtosLocal, corMap, type Produto } from "@/lib/produtos";
import { useCarrinho } from "@/lib/CarrinhoContext";
import OculosSVG from "@/components/OculosSVG";

const tipoMap: Record<string, "sol" | "grau" | "armacao"> = {
  Sol: "sol", Grau: "grau", Armacao: "armacao", Armação: "armacao", Esportivo: "grau", Premium: "armacao",
};

export default function ColecaoPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = categorias.find(c => c.slug === slug);
  const [produtos, setProdutos] = useState<Produto[]>(produtosLocal);
  const [adicionado, setAdicionado] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { adicionar } = useCarrinho();

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = data.map((d: any) => {
            const local = produtosLocal.find(p => p.nome === d.nome);
            return local ? { ...local, ...d, categoria: d.categoria, preco: d.preco, descricao: d.descricao, imagemUrl: d.imagemUrl } : ({
              id: d.id, nome: d.nome, marca: "Ultra V", preco: d.preco,
              parcelas: 6, badge: d.destaque ? "Destaque" : "Coleção",
              categoria: d.categoria, descricao: d.descricao, detalhes: [],
              cor: cat?.cor ?? "#2c1f0e", imagemUrl: d.imagemUrl,
            });
          });
          setProdutos(merged);
        }
      })
      .catch(() => {});
  }, [slug]);

  if (!cat) return (
    <div style={{ padding: "5rem 2rem", textAlign: "center", color: "#2c1f0e" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", marginBottom: "1rem" }}>Coleção não encontrada</h2>
      <Link href="/" style={{ color: "#b8914a" }}>Voltar para o início</Link>
    </div>
  );

  const filtrados = produtos.filter(p => {
    const cP = (p.categoria ?? "").toLowerCase();
    return cP === cat.nome.toLowerCase() || cP === cat.slug;
  });

  const handleAdicionar = (e: React.MouseEvent, p: Produto) => {
    e.preventDefault();
    adicionar({ ...p, marca: p.marca ?? "Ultra V", parcelas: p.parcelas ?? 6, badge: p.badge ?? "Coleção", detalhes: p.detalhes ?? [], cor: p.cor ?? cat.cor });
    setAdicionado(p.id);
    setTimeout(() => setAdicionado(null), 1500);
  };

  return (
    <main style={{ background: "#faf7f2", minHeight: "100vh" }}>
      <section style={{
        background: `linear-gradient(135deg, ${cat.cor} 0%, ${cat.cor}dd 60%, #2c1f0e 100%)`,
        padding: "5rem 2rem", color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.8rem", opacity: 0.85 }}>
            Coleção {cat.emoji}
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 600, marginBottom: "1rem", lineHeight: 1.05 }}>
            {cat.pluralNome}
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: 540, fontWeight: 300, lineHeight: 1.7 }}>
            {cat.descricao}
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            {categorias.filter(c => c.slug !== cat.slug).map(c => (
              <Link key={c.slug} href={`/colecao/${c.slug}`} style={{
                background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)",
                color: "#fff", padding: "8px 16px", borderRadius: 999, fontSize: 12,
                textDecoration: "none", letterSpacing: "0.04em", backdropFilter: "blur(6px)",
              }}>
                {c.emoji} {c.nome}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: -100, top: -100, width: 400, height: 400, background: `${cat.cor}55`, borderRadius: "50%", filter: "blur(80px)" }} />
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: cat.cor, marginBottom: "0.4rem", fontWeight: 600 }}>
              {filtrados.length} {filtrados.length === 1 ? "modelo" : "modelos"}
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#2c1f0e" }}>
              Selecionados para você
            </h2>
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#8c7b68", background: cat.corClara, borderRadius: 4 }}>
            Em breve novos modelos nesta coleção.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {filtrados.map(p => (
              <Link key={p.id} href={`/produto/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  onMouseEnter={() => setHover(p.id)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    background: "#fff",
                    border: `1px solid ${hover === p.id ? cat.cor : "#e0d5c5"}`,
                    borderRadius: 4, overflow: "hidden",
                    transform: hover === p.id ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: hover === p.id ? `0 12px 32px ${cat.cor}33` : "0 2px 6px rgba(0,0,0,0.03)",
                    transition: "all 0.3s",
                  }}
                >
                  <div style={{ height: 220, background: cat.corClara, position: "relative", overflow: "hidden" }}>
                    {p.imagemUrl ? (
                      <img src={p.imagemUrl} alt={p.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <OculosSVG cor={corMap[p.marca ?? ""] ?? cat.cor} tamanho={180} tipo={tipoMap[p.categoria] ?? "grau"} />
                      </div>
                    )}
                    <div style={{ position: "absolute", top: "1rem", left: "1rem", background: cat.cor, color: "#fff", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 12px", fontWeight: 600, borderRadius: 2 }}>
                      {p.badge ?? "Coleção"}
                    </div>
                  </div>
                  <div style={{ padding: "1.4rem" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: cat.cor, marginBottom: 6, fontWeight: 600 }}>
                      {p.marca}
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: 6, color: "#2c1f0e" }}>
                      {p.nome}
                    </div>
                    <div style={{ color: "#8c7b68", fontSize: 12, lineHeight: 1.6, marginBottom: "1.2rem", fontWeight: 300, minHeight: 38 }}>
                      {p.descricao}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "0.5px solid #e0d5c5" }}>
                      <div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#2c1f0e" }}>R$ {p.preco.toLocaleString("pt-BR")}</div>
                        <div style={{ fontSize: 11, color: "#8c7b68", fontWeight: 300 }}>{p.parcelas ?? 6}x sem juros</div>
                      </div>
                      <button onClick={(e) => handleAdicionar(e, p)} style={{
                        background: adicionado === p.id ? "#10b981" : cat.cor,
                        color: "#fff", border: "none", padding: "9px 18px", borderRadius: 2,
                        fontSize: 11, fontWeight: 600, cursor: "pointer",
                        letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.3s",
                      }}>
                        {adicionado === p.id ? "✓" : "Comprar"}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

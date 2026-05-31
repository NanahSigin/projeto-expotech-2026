"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import OculosSVG from "@/components/OculosSVG";
import { useCarrinho } from "@/lib/CarrinhoContext";
import { produtos as produtosLocal, categorias, corMap } from "@/lib/produtos";

type Produto = {
  id: number;
  nome: string;
  marca?: string;
  categoria: string;
  descricao: string;
  badge?: string;
  preco: number;
  parcelas?: number;
  destaque?: boolean;
  imagemUrl?: string;
};

const tipoMap: Record<string, "sol" | "grau" | "armacao"> = {
  Sol: "sol", Grau: "grau", Armacao: "armacao", Armação: "armacao", Esportivo: "grau", Premium: "armacao",
};

const corPorCategoria = (categoria: string) =>
  categorias.find(c => c.nome.toLowerCase() === categoria.toLowerCase() || c.slug === categoria.toLowerCase())?.cor ?? "#b8914a";

export default function Products() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosLocal);
  const [hover, setHover] = useState<number | null>(null);
  const [adicionado, setAdicionado] = useState<number | null>(null);
  const { adicionar } = useCarrinho();

  useEffect(() => {
    fetch("http://localhost:8080/produtos")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // mescla dados do backend com info local (marca, parcelas, etc)
          const merged = data.map((d: any) => {
            const local = produtosLocal.find(p => p.nome === d.nome);
            return local
              ? { ...local, ...d, categoria: d.categoria, preco: d.preco, descricao: d.descricao, imagemUrl: d.imagemUrl }
              : { id: d.id, nome: d.nome, marca: "Ultra V", preco: d.preco, parcelas: 6, badge: d.destaque ? "Destaque" : "Coleção", categoria: d.categoria, descricao: d.descricao, imagemUrl: d.imagemUrl };
          });
          setProdutos(merged);
        }
      })
      .catch(() => {});
  }, []);

  // pega 1 destaque de cada categoria + adiciona até 8
  const destaques = produtos.filter(p => p.destaque !== false).slice(0, 8);
  const lista = destaques.length >= 6 ? destaques : produtos.slice(0, 8);

  const handleAdicionar = (e: React.MouseEvent, p: Produto) => {
    e.preventDefault();
    const marca = p.marca ?? "Ultra V";
    adicionar({
      ...p, marca,
      parcelas: p.parcelas ?? 6,
      badge: p.badge ?? "Coleção",
      detalhes: [],
      cor: corMap[marca] ?? corPorCategoria(p.categoria),
    });
    setAdicionado(p.id);
    setTimeout(() => setAdicionado(null), 1500);
  };

  return (
    <section id="produtos" style={{ padding: "4rem 2rem 0", maxWidth: 1180, margin: "0 auto", scrollMarginTop: "80px" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.6rem", fontWeight: 600 }}>Destaques</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, marginBottom: "0.8rem", color: "#2c1f0e" }}>
          Mais procurados
        </h2>
        <p style={{ color: "#4a3520", fontSize: 14, lineHeight: 1.7, maxWidth: 480, fontWeight: 400 }}>
          Os modelos favoritos da temporada — selecionados a dedo pela nossa equipe.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {lista.map((p) => {
          const corCat = corPorCategoria(p.categoria);
          return (
            <Link key={p.id} href={`/produto/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                style={{
                  background: "#fff",
                  border: `1px solid ${hover === p.id ? corCat : "#e0d5c5"}`,
                  borderRadius: 6, overflow: "hidden",
                  transform: hover === p.id ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hover === p.id ? `0 14px 32px ${corCat}30` : "0 2px 8px rgba(44,31,14,0.04)",
                  transition: "all 0.3s",
                }}
              >
                <div style={{ height: 230, background: "#f0ebe2", position: "relative", overflow: "hidden" }}>
                  {p.imagemUrl ? (
                    <img src={p.imagemUrl} alt={p.nome} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hover === p.id ? "scale(1.05)" : "scale(1)", transition: "transform 0.4s" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <OculosSVG cor={corMap[p.marca ?? ""] ?? corCat} tamanho={180} tipo={tipoMap[p.categoria] ?? "grau"} />
                    </div>
                  )}
                  {(p.badge || p.destaque) && (
                    <div style={{
                      position: "absolute", top: "1rem", left: "1rem",
                      background: corCat, color: "#fff",
                      fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                      padding: "5px 12px", fontWeight: 700, borderRadius: 2,
                      boxShadow: `0 4px 12px ${corCat}55`,
                    }}>
                      {p.badge ?? "Destaque"}
                    </div>
                  )}
                </div>
                <div style={{ padding: "1.4rem" }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: corCat, marginBottom: 6, fontWeight: 700 }}>
                    {p.marca ?? p.categoria}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: 6, color: "#2c1f0e" }}>{p.nome}</div>
                  <div style={{ color: "#8c7b68", fontSize: 12, lineHeight: 1.6, marginBottom: "1.2rem", fontWeight: 300, minHeight: 38 }}>{p.descricao}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "0.5px solid #e0d5c5" }}>
                    <div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#2c1f0e" }}>R$ {p.preco.toLocaleString("pt-BR")}</div>
                      <div style={{ fontSize: 11, color: "#8c7b68", fontWeight: 300 }}>{p.parcelas ?? 6}x sem juros</div>
                    </div>
                    <button onClick={(e) => handleAdicionar(e, p)} style={{
                      background: adicionado === p.id ? "#10b981" : corCat,
                      color: "#fff", border: "none", padding: "9px 18px", borderRadius: 2,
                      fontSize: 11, fontWeight: 700, cursor: "pointer",
                      letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.3s",
                    }}>
                      {adicionado === p.id ? "✓" : "Comprar"}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

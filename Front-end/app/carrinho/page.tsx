"use client";
import Link from "next/link";
import { useState } from "react";
import { useCarrinho } from "@/lib/CarrinhoContext";
import OculosSVG from "@/components/OculosSVG";

const tipoMap: Record<string, "sol" | "grau" | "armacao"> = {
  Sol: "sol", Grau: "grau", Armação: "armacao", Armacao: "armacao",
};

export default function CarrinhoPage() {
  const { itens, remover, total } = useCarrinho();
  const [carregando, setCarregando] = useState(false);

  const finalizarCompra = async () => {
    if (itens.length === 0) return;
    setCarregando(true);
    try {
      const resp = await fetch("http://localhost:8080/pagamento/criar-preferencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          itens.map((i) => ({ nome: i.nome, quantidade: i.quantidade, preco: i.preco }))
        ),
      });
      if (!resp.ok) throw new Error("Erro ao criar preferência");
      const data = await resp.json();
      window.location.href = data.url;
    } catch (err) {
      alert("Não foi possível iniciar o pagamento. Verifique se o backend está rodando.");
      setCarregando(false);
    }
  };

  if (itens.length === 0) return (
    <main style={{ background: "#faf7f2", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
      <div style={{ fontSize: "4rem" }}>👓</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600 }}>Seu carrinho está vazio</h2>
      <p style={{ color: "#8c7b68", fontSize: 14 }}>Explore nossa coleção e encontre o par perfeito.</p>
      <Link href="/" style={{
        background: "#2c1f0e", color: "#faf7f2", padding: "14px 32px",
        borderRadius: 2, fontSize: 12, fontWeight: 500, textDecoration: "none",
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        Ver coleção
      </Link>
    </main>
  );

  return (
    <main style={{ background: "#faf7f2", minHeight: "100vh", padding: "3rem 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.8rem" }}>
          Seu carrinho
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 600, marginBottom: "3rem" }}>
          {itens.length} {itens.length === 1 ? "item" : "itens"} selecionados
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
          {/* Itens */}
          <div>
            {itens.map((item) => (
              <div key={item.id} style={{
                display: "flex", gap: "1.5rem", alignItems: "center",
                padding: "1.5rem 0", borderBottom: "0.5px solid #e0d5c5",
              }}>
                <div style={{ background: "#f0ebe2", borderRadius: 3, padding: item.imagemUrl ? 0 : "1rem", flexShrink: 0, width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {item.imagemUrl ? (
                    <img src={item.imagemUrl} alt={item.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <OculosSVG cor={item.cor} tamanho={100} tipo={tipoMap[item.categoria] ?? "grau"} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#b8914a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.marca}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: 4 }}>{item.nome}</div>
                  <div style={{ fontSize: 13, color: "#8c7b68", marginBottom: "0.8rem" }}>Qtd: {item.quantidade}</div>
                  <button onClick={() => remover(item.id)} style={{
                    background: "transparent", border: "none", color: "#8c7b68",
                    fontSize: 12, cursor: "pointer", textDecoration: "underline", padding: 0,
                  }}>
                    Remover
                  </button>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#2c1f0e" }}>
                  R$ {(item.preco * item.quantidade).toLocaleString("pt-BR")}
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div style={{ background: "#f0ebe2", border: "0.5px solid #e0d5c5", borderRadius: 3, padding: "2rem", position: "sticky", top: "6rem" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#b8914a", marginBottom: "1.5rem" }}>
              Resumo do pedido
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem", fontSize: 13, color: "#4a3520" }}>
              <span>Subtotal</span>
              <span>R$ {total.toLocaleString("pt-BR")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem", fontSize: 13, color: "#4a7c59" }}>
              <span>Desconto Pix (5%)</span>
              <span>- R$ {Math.floor(total * 0.05).toLocaleString("pt-BR")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem", fontSize: 13, color: "#4a3520" }}>
              <span>Frete</span>
              <span style={{ color: "#4a7c59" }}>Grátis</span>
            </div>

            <div style={{ borderTop: "0.5px solid #e0d5c5", marginTop: "1rem", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600 }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600 }}>
                R$ {total.toLocaleString("pt-BR")}
              </span>
            </div>

            <button onClick={finalizarCompra} disabled={carregando} style={{
              background: "#2c1f0e", color: "#faf7f2", border: "none", width: "100%",
              padding: "16px", borderRadius: 2, fontSize: 13, fontWeight: 500,
              cursor: carregando ? "wait" : "pointer", letterSpacing: "0.08em",
              textTransform: "uppercase", marginTop: "1.5rem",
              opacity: carregando ? 0.7 : 1,
            }}>
              {carregando ? "Redirecionando..." : "Finalizar compra"}
            </button>

            <Link href="/" style={{
              display: "block", textAlign: "center", marginTop: "1rem",
              fontSize: 12, color: "#8c7b68", textDecoration: "none",
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              ← Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

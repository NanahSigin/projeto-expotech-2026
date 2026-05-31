"use client";
import Link from "next/link";
import { useState } from "react";
import { categorias } from "@/lib/produtos";

export default function Colecoes() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section style={{ padding: "5rem 2rem 3rem", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8914a", marginBottom: "0.6rem", fontWeight: 600 }}>
          Nossas coleções
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, color: "#2c1f0e" }}>
          Encontre o seu <em style={{ background: "linear-gradient(135deg,#f59e0b,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>estilo</em>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem" }}>
        {categorias.map(c => (
          <Link
            key={c.slug}
            href={`/colecao/${c.slug}`}
            onMouseEnter={() => setHover(c.slug)}
            onMouseLeave={() => setHover(null)}
            style={{
              textDecoration: "none", color: "inherit", borderRadius: 10,
              padding: "2.2rem 1.5rem", textAlign: "center",
              background: `linear-gradient(135deg, ${c.cor}15 0%, ${c.cor}05 100%)`,
              border: `1px solid ${hover === c.slug ? c.cor : c.cor + "30"}`,
              transform: hover === c.slug ? "translateY(-6px)" : "translateY(0)",
              boxShadow: hover === c.slug ? `0 16px 36px ${c.cor}30` : "0 2px 6px rgba(0,0,0,0.03)",
              transition: "all 0.3s",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem",
            }}
          >
            <div style={{
              fontSize: "2.4rem",
              filter: hover === c.slug ? "none" : "saturate(0.85)",
              transition: "filter 0.3s",
            }}>{c.emoji}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "#2c1f0e" }}>
              {c.nome}
            </div>
            <div style={{ fontSize: 12, color: "#8c7b68", lineHeight: 1.5, fontWeight: 300, minHeight: 36 }}>
              {c.descricao}
            </div>
            <div style={{
              marginTop: "0.5rem", fontSize: 11, fontWeight: 600,
              color: c.cor, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Explorar →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import { useCarrinho } from "@/lib/CarrinhoContext";
import { useAuth } from "@/lib/AuthContext";
import { categorias } from "@/lib/produtos";
import { useState } from "react";

export default function Navbar() {
  const { quantidade } = useCarrinho();
  const { usuario, admin, logoutUsuario, logoutAdmin } = useAuth();
  const [menu, setMenu] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 99,
      background: "rgba(250,247,242,0.97)",
      borderBottom: "1px solid rgba(184,145,74,0.2)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 1px 3px rgba(44,31,14,0.04)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 2rem", maxWidth: 1180, margin: "0 auto", gap: "1rem",
      }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", letterSpacing: "0.06em", color: "#2c1f0e", textDecoration: "none", flexShrink: 0 }}>
          Ultra<span style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>V</span>
        </Link>

        <ul style={{ display: "flex", gap: "1.6rem", listStyle: "none", flexWrap: "wrap", justifyContent: "center" }}>
          {categorias.map((c) => (
            <li key={c.slug}>
              <Link href={`/colecao/${c.slug}`} style={{
                color: "#4a3520", textDecoration: "none", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.06em", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 5,
                padding: "8px 4px", borderBottom: "2px solid transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = c.cor}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = "transparent"}>
                <span style={{ fontSize: 14 }}>{c.emoji}</span> {c.nome}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contato" style={{
              color: "#4a3520", textDecoration: "none", fontSize: 12, fontWeight: 500,
              letterSpacing: "0.06em", textTransform: "uppercase", padding: "8px 4px",
            }}>
              ✉️ Contato
            </Link>
          </li>
        </ul>

        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", position: "relative", flexShrink: 0 }}>
          <Link href="/carrinho" style={{
            position: "relative", background: "transparent", border: "1px solid rgba(184,145,74,0.4)",
            padding: "9px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
            color: "#2c1f0e", textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
          }}>
            🛍️
            {quantidade > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "linear-gradient(135deg, #ec4899, #f59e0b)", color: "#fff", borderRadius: "50%",
                width: 22, height: 22, fontSize: 11, display: "flex",
                alignItems: "center", justifyContent: "center", fontWeight: 700,
                boxShadow: "0 2px 8px rgba(236,72,153,0.4)",
              }}>
                {quantidade}
              </span>
            )}
          </Link>

          {!usuario && !admin && (
            <>
              <Link href="/login" style={btnGhost}>Entrar</Link>
              <Link href="/cadastro" style={btnPrimary}>Criar conta</Link>
            </>
          )}

          {(usuario || admin) && (
            <div style={{ position: "relative" }}>
              <button onClick={() => setMenu(!menu)} style={{ ...btnGhost, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                {admin ? `🛡️ ${admin.nome.split(" ")[0]}` : `👤 ${usuario?.nome.split(" ")[0]}`} ▾
              </button>
              {menu && (
                <div onMouseLeave={() => setMenu(false)} style={{
                  position: "absolute", right: 0, top: "calc(100% + 6px)",
                  background: "#fff", border: "1px solid rgba(184,145,74,0.3)", borderRadius: 6,
                  minWidth: 220, boxShadow: "0 8px 24px rgba(44,31,14,0.12)", padding: "0.4rem 0",
                  zIndex: 100,
                }}>
                  {admin && (
                    <Link href="/admin/produtos" onClick={() => setMenu(false)} style={menuItem}>
                      🛡️ Gerenciar produtos
                    </Link>
                  )}
                  <Link href="/carrinho" onClick={() => setMenu(false)} style={menuItem}>
                    🛍️ Meu carrinho
                  </Link>
                  <button onClick={() => { admin ? logoutAdmin() : logoutUsuario(); setMenu(false); }} style={{ ...menuItem, width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}>
                    ↪ Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const btnGhost: React.CSSProperties = {
  background: "transparent", border: "1px solid rgba(184,145,74,0.4)",
  padding: "9px 16px", borderRadius: 999, fontSize: 12, color: "#2c1f0e",
  textDecoration: "none", letterSpacing: "0.04em", fontWeight: 500,
};

const btnPrimary: React.CSSProperties = {
  background: "linear-gradient(135deg, #2c1f0e, #4a3520)", color: "#faf7f2", border: "none",
  padding: "9px 18px", borderRadius: 999, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.04em", textDecoration: "none",
  boxShadow: "0 2px 8px rgba(44,31,14,0.2)",
};

const menuItem: React.CSSProperties = {
  display: "block", padding: "11px 18px", fontSize: 13, color: "#2c1f0e",
  textDecoration: "none", letterSpacing: "0.02em",
};

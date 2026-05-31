"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Usuario = { id: number; nome: string; email: string };
type Admin = { idAdministrador: number; nome: string; usuario: string; email: string };

type AuthContextType = {
  usuario: Usuario | null;
  admin: Admin | null;
  loginUsuario: (email: string, senha: string) => Promise<{ ok: boolean; erro?: string }>;
  cadastrarUsuario: (data: { nome: string; cpf: string; telefone: string; email: string; senha: string }) => Promise<{ ok: boolean; erro?: string }>;
  loginAdmin: (login: string, senha: string) => Promise<{ ok: boolean; erro?: string }>;
  logoutUsuario: () => void;
  logoutAdmin: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const API = "http://localhost:8080";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem("ultrav_usuario");
      const a = localStorage.getItem("ultrav_admin");
      if (u) setUsuario(JSON.parse(u));
      if (a) setAdmin(JSON.parse(a));
    } catch {}
  }, []);

  const cadastrarUsuario: AuthContextType["cadastrarUsuario"] = async (data) => {
    try {
      const res = await fetch(`${API}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return { ok: false, erro: "Não foi possível cadastrar." };
      const novo = await res.json();
      const u: Usuario = { id: novo.id, nome: novo.nome, email: novo.email };
      localStorage.setItem("ultrav_usuario", JSON.stringify(u));
      setUsuario(u);
      return { ok: true };
    } catch {
      return { ok: false, erro: "Servidor indisponível. Verifique se o backend está rodando." };
    }
  };

  const loginUsuario: AuthContextType["loginUsuario"] = async (email, senha) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      if (!res.ok) return { ok: false, erro: "E-mail ou senha incorretos." };
      const nome = await res.text();
      const u: Usuario = { id: 0, nome, email };
      localStorage.setItem("ultrav_usuario", JSON.stringify(u));
      setUsuario(u);
      return { ok: true };
    } catch {
      return { ok: false, erro: "Servidor indisponível. Verifique se o backend está rodando." };
    }
  };

  const loginAdmin: AuthContextType["loginAdmin"] = async (login, senha) => {
    try {
      const res = await fetch(`${API}/adm/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: login, email: login, senha }),
      });
      if (!res.ok) return { ok: false, erro: "Usuário, e-mail ou senha incorretos." };
      const data: Admin = await res.json();
      localStorage.setItem("ultrav_admin", JSON.stringify(data));
      setAdmin(data);
      return { ok: true };
    } catch {
      return { ok: false, erro: "Servidor indisponível. Verifique se o backend está rodando." };
    }
  };

  const logoutUsuario = () => { localStorage.removeItem("ultrav_usuario"); setUsuario(null); };
  const logoutAdmin = () => { localStorage.removeItem("ultrav_admin"); setAdmin(null); };

  return (
    <AuthContext.Provider value={{ usuario, admin, loginUsuario, cadastrarUsuario, loginAdmin, logoutUsuario, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

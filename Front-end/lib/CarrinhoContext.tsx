"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Produto } from "@/lib/produtos";

type ItemCarrinho = Produto & { quantidade: number };

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (produto: Produto) => void;
  remover: (id: number) => void;
  total: number;
  quantidade: number;
};

const CarrinhoContext = createContext<CarrinhoContextType>({} as CarrinhoContextType);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionar = (produto: Produto) => {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === produto.id);
      if (existe) return prev.map((i) => i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i);
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const remover = (id: number) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const quantidade = itens.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, remover, total, quantidade }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);

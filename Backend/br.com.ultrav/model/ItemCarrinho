package br.com.ultravexpotech.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ItemCarrinho")
public class ItemCarrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private Integer idItem;

    @ManyToOne
    //varios para um

    @JoinColumn(name = "id_carrinho", nullable = false)
    //uma plaquinha de identificação de coluna
    private Carrinho carrinho;

    @Column(name = "id_produto", nullable = false)
    private Integer idProduto;

    @Column(name = "id_lente")
    private Integer idLente;

    @Column(name = "quantidade")
    private Integer quantidade;

    public ItemCarrinho() {}

    // nunca mais esquece getter and setter
    public Integer getIdItem() { return idItem; }
    public void setIdItem(Integer idItem) { this.idItem = idItem; }
    public Carrinho getCarrinho() { return carrinho; }
    public void setCarrinho(Carrinho carrinho) { this.carrinho = carrinho; }
    public Integer getIdProduto() { return idProduto; }
    public void setIdProduto(Integer idProduto) { this.idProduto = idProduto; }
    public Integer getIdLente() { return idLente; }
    public void setIdLente(Integer idLente) { this.idLente = idLente; }
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
}

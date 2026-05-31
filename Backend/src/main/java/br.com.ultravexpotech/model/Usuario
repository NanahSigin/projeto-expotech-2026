package br.com.ultravexpotech.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cliente")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //esse é tipo uma chamada automatica se não precisa do id e tem que ser maiusculo se não é outra coisa
    @Column(name = "id_cliente")
    private Long id;

    private String nome;
    private String cpf;
    private String telefone;
    private String email;
    private String senha;


    public Usuario() {}

    public Usuario(Long id, String nome, String cpf, String telefone, String email, String senha) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}

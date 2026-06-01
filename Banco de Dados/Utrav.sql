DROP TABLE IF EXISTS ItemCarrinho;
DROP TABLE IF EXISTS Carrinho;
DROP TABLE IF EXISTS pagamento;
DROP TABLE IF EXISTS Administrador;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS produto;

CREATE DATABASE IF NOT EXISTS ultrav
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ultrav;

CREATE TABLE produto (
    id_produto BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    preco DOUBLE,
    categoria VARCHAR(255),
    destaque BOOLEAN,
    descricao VARCHAR(255),
    imagem_url VARCHAR(255),
    PRIMARY KEY (id_produto)
) ENGINE=InnoDB;

CREATE TABLE cliente (
    id_cliente BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    cpf VARCHAR(255),
    telefone VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    PRIMARY KEY (id_cliente)
) ENGINE=InnoDB;

CREATE TABLE Administrador (
    id_administrador INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    usuario VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    nivel_acesso VARCHAR(255),
    PRIMARY KEY (id_administrador)
) ENGINE=InnoDB;

CREATE TABLE Carrinho (
    id_carrinho INT NOT NULL AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    data_criacao DATETIME(6),
    status VARCHAR(20),
    PRIMARY KEY (id_carrinho)
) ENGINE=InnoDB;

CREATE TABLE ItemCarrinho (
    id_item INT NOT NULL AUTO_INCREMENT,
    id_carrinho INT NOT NULL,
    id_produto INT NOT NULL,
    id_lente INT,
    quantidade INT,
    PRIMARY KEY (id_item),
    CONSTRAINT fk_itemcarrinho_carrinho
        FOREIGN KEY (id_carrinho)
        REFERENCES Carrinho(id_carrinho)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE pagamento (
    id BIGINT NOT NULL AUTO_INCREMENT,
    data DATETIME(6),
    metodo_pagamento VARCHAR(255),
    status VARCHAR(255),
    valor_total DOUBLE,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

INSERT INTO produto
(nome, preco, categoria, destaque, descricao, imagem_url)
VALUES
('Wayfarer Classic',699.00,'Sol',TRUE,'Icone atemporal. Armacao acetato, protecao UV400.','/imagens/wayfarer.jpg'),
('Holbrook Titanium',1299.00,'Grau',TRUE,'Armacao ultraleve em titanio. Ideal para uso diario.','/imagens/holbrook.jpg'),
('Medusa Luxe',2199.00,'Armacao',TRUE,'Design italiano exclusivo. Detalhes dourados.','/imagens/medusa.jpg'),
('Clubmaster Steel',849.00,'Sol',FALSE,'Estilo retro inconfundivel em aco inox.','/imagens/clubmaster.jpg'),
('Precision Flex',979.00,'Grau',FALSE,'Tecnologia flexivel para quem tem vida ativa.','/imagens/precision.jpg'),
('GV Rose Gold',1899.00,'Armacao',TRUE,'Sofisticacao em ouro rose. Refinamento absoluto.','/imagens/rosegold.jpg');

INSERT INTO Administrador
(nome, usuario, email, senha, nivel_acesso)
VALUES
('Administrador Master','admin','admin@ultrav.com.br','admin123','TOTAL');

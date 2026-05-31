-- ============================================================
--  Ultra V — Script de criação do banco de dados (MySQL 8+)
--  Execute uma vez antes de rodar o backend Spring Boot.
--  Ex.: mysql -u root -p < database/ultrav.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS ultrav
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ultrav;

-- ------------------------------------------------------------
--  Tabela: produto
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS produto (
  id_produto  BIGINT       NOT NULL AUTO_INCREMENT,
  nome        VARCHAR(255),
  preco       DOUBLE,
  categoria   VARCHAR(255),
  destaque    BOOLEAN,
  descricao   VARCHAR(255),
  imagem_url  VARCHAR(255),
  PRIMARY KEY (id_produto)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
--  Tabela: cliente (Usuario)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cliente (
  id_cliente  BIGINT       NOT NULL AUTO_INCREMENT,
  nome        VARCHAR(255),
  cpf         VARCHAR(255),
  telefone    VARCHAR(255),
  email       VARCHAR(255),
  senha       VARCHAR(255),
  PRIMARY KEY (id_cliente)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
--  Tabela: Administrador
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Administrador (
  id_administrador  INT NOT NULL AUTO_INCREMENT,
  nome              VARCHAR(255),
  usuario           VARCHAR(255),
  email             VARCHAR(255),
  senha             VARCHAR(255),
  nivel_acesso      VARCHAR(255),
  PRIMARY KEY (id_administrador)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
--  Tabela: Carrinho
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Carrinho (
  id_carrinho   INT          NOT NULL AUTO_INCREMENT,
  id_cliente    INT          NOT NULL,
  data_criacao  DATETIME(6),
  status        VARCHAR(20),
  PRIMARY KEY (id_carrinho)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
--  Tabela: ItemCarrinho
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ItemCarrinho (
  id_item      INT NOT NULL AUTO_INCREMENT,
  id_carrinho  INT NOT NULL,
  id_produto   INT NOT NULL,
  id_lente     INT,
  quantidade   INT,
  PRIMARY KEY (id_item),
  CONSTRAINT fk_itemcarrinho_carrinho
    FOREIGN KEY (id_carrinho) REFERENCES Carrinho (id_carrinho)
) ENGINE = InnoDB;

-- ------------------------------------------------------------
--  Tabela: pagamento
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pagamento (
  id                 BIGINT NOT NULL AUTO_INCREMENT,
  data               DATETIME(6),
  metodo_pagamento   VARCHAR(255),
  status             VARCHAR(255),
  valor_total        DOUBLE,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

-- ============================================================
--  Dados iniciais — produtos
-- ============================================================
INSERT INTO produto (id_produto, nome, preco, categoria, destaque, descricao, imagem_url) VALUES
  (1, 'Wayfarer Classic',   699.00, 'Sol',     TRUE,  'Icone atemporal. Armacao acetato, protecao UV400.', '/imagens/wayfarer.jpg'),
  (2, 'Holbrook Titanium', 1299.00, 'Grau',    TRUE,  'Armacao ultraleve em titanio. Ideal para uso diario.', '/imagens/holbrook.jpg'),
  (3, 'Medusa Luxe',       2199.00, 'Armacao', TRUE,  'Design italiano exclusivo. Detalhes dourados.', '/imagens/medusa.jpg'),
  (4, 'Clubmaster Steel',   849.00, 'Sol',     FALSE, 'Estilo retro inconfundivel em aco inox.', '/imagens/clubmaster.jpg'),
  (5, 'Precision Flex',     979.00, 'Grau',    FALSE, 'Tecnologia flexivel para quem tem vida ativa.', '/imagens/precision.jpg'),
  (6, 'GV Rose Gold',      1899.00, 'Armacao', TRUE,  'Sofisticacao em ouro rose. Refinamento absoluto.', '/imagens/rosegold.jpg')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

-- ============================================================
--  Administrador padrão (opcional — apague se não quiser)
-- ============================================================
INSERT INTO Administrador (id_administrador, nome, usuario, email, senha, nivel_acesso) VALUES
  (1, 'Administrador Master', 'admin', 'admin@ultrav.com.br', 'admin123', 'TOTAL')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

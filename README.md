# Ultra V - E-commerce

Sistema de e-commerce desenvolvido com Spring Boot no backend e Next.js no frontend.

## Tecnologias

### Backend
- Java 17
- Spring Boot
- Maven
- MySQL

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

---

# Pré-requisitos

Instalar:

- Java 17
- Maven
- Node.js (versão 18 ou superior)
- MySQL
- VS Code
- IntelliJ IDEA (ou outra IDE Java)

---
Executando o Backend
1. Abrir o projeto Java

Abra a pasta do backend no IntelliJ.

2. Configurar o banco de dados

Criar o banco:

CREATE DATABASE ultrav_db;

Editar o arquivo:

src/main/resources/application.properties

Exemplo:

spring.datasource.url=jdbc:mysql://localhost:3306/ultrav_db
spring.datasource.username=root
spring.datasource.password=senha

spring.jpa.hibernate.ddl-auto=update
3. Instalar dependências Maven

No terminal da pasta backend:

mvn clean install
4. Executar o projeto
mvn spring-boot:run

Ou executar a classe:

UltraVApplication.java

O backend ficará disponível em:

http://localhost:8080
Executando o Frontend
1. Abrir no VS Code

Abra a pasta frontend:

code .
2. Instalar dependências
npm install
3. Configurar API

Verifique o arquivo:

.env.local

Exemplo:

NEXT_PUBLIC_API_URL=http://localhost:8080
4. Executar o projeto
npm run dev

O frontend ficará disponível em:

http://localhost:3000
Estrutura
ultrav/
│
├── backend/
│   ├── src/
│   └── pom.xml
│
└── frontend/
    ├── app/
    ├── components/
    ├── public/
    └── package.json

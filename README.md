# 🚗 Sistema de Gestão de Clientes e Veículos

Este projeto é uma aplicação moderna desenvolvida para o desafio técnico da LightBase, focada no controle de clientes e seus respectivos veículos. A solução foi desenhada para ser escalável, performante e totalmente responsiva.

---

# 🌐 Link do Projeto em Produção

O projeto está disponível para visualização online em: https://light-base.vercel.app/


---

# 🚀 Como rodar o projeto localmente

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/caiomeirelles22/lightbase.git
cd cliente-veiculos-app
```

## 2️⃣ Instalar as dependências

```bash
npm install
```

## 3️⃣ Executar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

# 🛠 Tecnologias Usadas e Motivações

As escolhas tecnológicas foram feitas para atender aos requisitos de performance, segurança de tipos e experiência do usuário (UX):

## 🔹 Next.js 15 (App Router)
Escolhido pela excelência em performance e suporte nativo a Server Components e otimização de rotas.

## 🔹 TypeScript
Utilizado para garantir segurança de tipos (Type Safety), facilitando a manutenção e prevenindo bugs em tempo de execução.

## 🔹 Material UI (MUI)
Biblioteca de componentes robusta que garantiu uma interface profissional seguindo os padrões de Material Design.

## 🔹 React Hook Form + Zod
Implementados para uma gestão de formulários eficiente com validação de esquemas rigorosa (CPF, Telefone e Placa).

## 🔹 Context API
Utilizada para a gestão de estado global, permitindo a comunicação fluida entre a UI e os serviços de dados.

---

# ✨ Diferenciais Implementados

## 💾 Persistência Local (LocalStorage)
Os dados são guardados no navegador. Isso garante que, mesmo ao atualizar a página (F5), as informações cadastradas permaneçam disponíveis, simulando o comportamento de um banco de dados real sem necessidade de infraestrutura externa imediata.

## 🔎 Busca Global Abrangente
O filtro de pesquisa permite localizar clientes por Nome, Placa, CPF ou Telefone de forma simultânea.  
A busca é inteligente e ignora caracteres especiais (pontos e traços) nos campos numéricos para facilitar a experiência do usuário.

## 📱 Interface Híbrida Mobile-First

A aplicação adapta-se totalmente ao dispositivo do usuário:

### 🖥 Desktop
Exibição em tabela detalhada para maior produtividade e visualização de dados.

### 📲 Mobile
Exibição em sistema de cards intuitivos para melhor usabilidade em telas touch.

## 🆔 Identificador Único Automático
Cada cliente recebe um ID aleatório e único de 8 caracteres gerado automaticamente no momento do cadastro no serviço.

---

# 🏛 Arquitetura e Princípios Aplicados (SOLID)

## 🔹 SRP (Single Responsibility Principle)
Separação clara entre componentes de interface, esquemas de validação, utilitários de formatação e camada de serviços.

## 🔹 DIP (Dependency Inversion Principle)
O sistema depende de interfaces (`ICustomerService`), o que permite trocar o Mock por uma API real ou banco de dados no futuro sem alterar a interface.

---

# ⚔ Dificuldades Superadas

Implementação de máscaras manuais de CPF e Telefone para garantir estabilidade e performance, evitando dependências externas que poderiam causar erros de hidratação ou conflitos com o React 18+.

---

# 👨‍💻 Desenvolvido por

**Caio Meirelles**

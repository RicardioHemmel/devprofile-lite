README
💻 DevProfile Lite
DevProfile Lite é um protótipo simples de autenticação e visualização de perfil feito com React.js e Firebase. O objetivo é permitir que usuários se cadastrem, façam login e visualizem informações básicas do seu perfil armazenadas no Cloud Firestore.

Link do projeto hospedado no Vercel: https://devprofile-lite.vercel.app/

🚀 Tecnologias Utilizadas
React.js – Biblioteca JavaScript para criação de interfaces.
React Router DOM – Gerenciamento de rotas na aplicação.
Firebase Authentication – Sistema de autenticação de usuários com email e senha.
Firebase Firestore – Banco de dados NoSQL para armazenamento dos perfis.
Tailwind CSS – Framework de CSS utilitário para estilização responsiva e moderna.
🛠️ Como configurar e rodar localmente
1. Clone o repositório
git clone https://github.com/Gabuka/devprofile-lite
cd devprofile-lite
2. Instale as dependências
npm install
3. Configure o Firebase
Acesse: https://console.firebase.google.com

Crie um novo projeto.

Habilite Authentication > Email/Senha.

Ative o Firestore Database.

No menu lateral, vá em Configurações do Projeto > Suas credenciais Web.

Adicione um novo app ao projeto: Visão geral do projeto > Adicionar app (Web).

De um nome ao app e registre.

Após isso, copie os dados do SDK para o próximo passo.

4. Atualize o arquivo 'src/firebase.js'
Preencha com suas credenciais Firebase:

apiKey: "SUA_CHAVE_API",
authDomain: "SEU_PROJETO.firebaseapp.com",
projectId: "dSEU_PROJETO",
storageBucket: "SEU_PROJETO.appspot.com",
messagingSenderId: "NUMERO",
appId: "SEU_APP_ID"
5. Execute o projeto e cadastre um usuário
npm start
Acesse em: http://localhost:3000

Siga as instruções da página para criar um novo cadastro.

6. Configure dados do usuário cadastrado no Firestore
Após registrar um usuário

No console do Firestore, crie manualmente:

Coleção: userProfiles

Documento: <UID do usuário autenticado>

Campos:

{
  "nomeCompleto": "Seu nome",
  "bioCurta": "Uma breve descrição",
  "linkPortfolio": "https://seuportfolio.com"
}
Nota: O UID pode ser obtido após o login no Firebase Authentication.

Depois disso, quando esse usuário fizer login, seus dados serão importados e exibidos na tela do Perfil.

📂 Estrutura do Projeto
src/
├── components/
│   ├── ProtectedRoute.js
├── pages/
│   ├── Login.js
│   ├── Cadastro.js
│   ├── Perfil.js
├── firebase.js
├── firebaseErrorMessages.js
├── App.js
📌 Funcionalidades
✅ Cadastro com email e senha

✅ Login e logout

✅ Visualização de perfil com dados do Firestore

✅ Rotas protegidas para usuários autenticados

✅ Interface responsiva com Tailwind CSS


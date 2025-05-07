# 📍 Touristei - Tourist App

Um aplicativo mobile desenvolvido em **React Native** que permite aos usuários explorar, visualizar e favoritar pontos turísticos, categorizados por interesses, com funcionalidades de login, mapa e navegação intuitiva.

## ✨ Funcionalidades

* 📂 **Categorias**
  Visualize pontos turísticos agrupados por categoria (ex.: Cultura, Aventura, Gastronomia).

* 🖼️ **Lista de Pontos Turísticos**
  Exibição de pontos turísticos com imagens, título e descrição.

* ❤️ **Favoritos**
  Adicione pontos turísticos à sua lista de favoritos e acesse-os rapidamente.

* 👤 **Perfil do Usuário**
  Visualize o nome do usuário e efetue logout.

* 🗺️ **Mapa Interativo**
  Exiba pontos turísticos próximos com a localização atual.

* ✍️ **Avaliação de Pontos**
  Avalie e comente sobre os pontos turísticos visitados.

## 🛠️ Tecnologias Utilizadas

* **React Native (Expo)**
* **Axios** (Requisições API)
* **AsyncStorage** (Armazenamento local)
* **React Navigation** (Navegação entre telas)
* **React Native Maps** (Exibição de mapas)
* **Expo Icons (FontAwesome, Ionicons)**

## ⚙️ Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/FiLpoix/Waypoint.git

# Acesse a pasta do projeto
cd waypoint/frontend/Waypoint

# Instale as dependências
npm install

# Inicie o projeto (via Expo)
npx expo start
```

> **Requisito:** Ter **Expo CLI** instalado (`npm install -g expo-cli`)

## 🔐 Configuração da API

Este app consome uma API REST que fornece:

* Pontos turísticos (`/tourist_points`)
* Categorias (`/categories`)
* Favoritos (`/favorites`) *(Requer token JWT)*

Edite a baseURL no arquivo:

```js
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_BACKEND_URL/api',
});

export default api;
```

## 🗂️ Estrutura de Pastas

```
📂 Waypoint
├── assets/                   # Imagens e outros recursos estáticos
├── components/
│   └── BottomNav.js          # Componente de navegação inferior
├── screens/
│   ├── Categories/
│   │   ├── index.js          # Tela de pontos por categoria
│   │   └── style.js
│   ├── CitiesScreen/
│   │   ├── index.js          # Tela de cidades (lista de cidades)
│   │   └── style.js
│   ├── FavoriteScreen/
│   │   ├── index.js          # Tela de favoritos
│   │   └── style.js
│   ├── HomeScreen/
│   │   ├── index.js          # Tela inicial (Home)
│   │   └── style.js
│   ├── MapScreen/
│   │   └── index.js          # Tela com mapa e pontos turísticos
│   ├── PointDetails/
│   │   ├── index.js          # Detalhes de um ponto turístico
│   │   └── style.js
│   ├── ProfileScreen/
│   │   ├── index.js          # Tela de perfil do usuário
│   │   └── style.js
│   ├── RatingScreen/
│   │   ├── index.js          # Tela de avaliação de pontos turísticos
│   │   └── style.js
│   ├── RegisterScreen/
│   │   ├── index.js          # Tela de registro de usuário
│   │   └── style.js
│   └── LoginScreen.js        # Tela de login
├── services/
│   └── api.js                # Configuração de conexão com API
├── App.js                    # Componente principal do app
├── app.json                  # Configuração do Expo
├── index.js                  # Ponto de entrada do React Native
├── package.json              # Dependências e scripts do projeto
└── .gitignore                # Arquivos ignorados pelo Git
```

## 👨‍💻 Contribuindo

Contribuições são bem-vindas!
Abra uma *issue* ou envie um *pull request* com melhorias ou correções.
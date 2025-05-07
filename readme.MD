📍 Touristei App
Um aplicativo mobile desenvolvido em React Native que permite aos usuários explorar, visualizar e favoritar pontos turísticos, categorizados por interesses, com funcionalidades de login e navegação intuitiva.

✨ Funcionalidades
📂 Categorias
Visualize pontos turísticos agrupados por categoria (ex.: Cultura, Aventura).

🖼️ Lista de Pontos Turísticos
Exibição de pontos turísticos com imagens, título e descrição resumida.

❤️ Favoritos
Adicione pontos turísticos à sua lista de favoritos e acesse-os rapidamente.

👤 Perfil do Usuário
Visualize o nome do usuário e efetue logout com facilidade.

🔍 Busca por Cidade (Em desenvolvimento)
Filtro para buscar pontos turísticos por cidade.

🛠️ Tecnologias
React Native

Expo

Axios (para requisições API)

AsyncStorage (armazenamento local de token e username)

React Navigation (navegação entre telas)

Expo Icons (FontAwesome, Ionicons)

📱 Telas
Home: Lista geral de pontos turísticos

Categorias: Pontos turísticos filtrados por categoria

Favoritos: Lista de pontos turísticos marcados como favoritos

Perfil: Exibe o usuário logado e permite logout

Detalhes do Ponto Turístico: Detalhes completos do ponto (imagem, descrição, etc.)

⚙️ Instalação e Execução
bash
Copiar
Editar
# Clone o repositório
git clone https://github.com/FiLpoix/Waypoint.git

# Acesse a pasta do projeto
cd Waypoint/frontend/Waypoint

# Instale as dependências
npm install

# Inicie o projeto (via Expo)
npx expo start
Observação: Certifique-se de ter o Expo CLI instalado (npm install -g expo-cli)

🔐 Configuração do Backend
Este app consome uma API REST que fornece:

Pontos turísticos (/tourist_points)

Categorias (/categories)

Favoritos (/favorites) (Requer token de autenticação JWT)

Você pode configurar a URL da API no arquivo:

bash
Copiar
Editar
/services/api.js
js
Copiar
Editar
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://SEU_BACKEND_URL/api',
});

export default api;
🗂️ Estrutura de Pastas
bash
Copiar
Editar
/Waypoint
├── assets/                # Imagens e outros recursos estáticos
├── components/
│   └── BottomNav.js       # Componente de navegação inferior
├── screens/
│   ├── Categories/
│       └── index.js       # Tela de pontos por categoria
│       └── style.js
│   ├── CitiesScreen/
│       └── index.js       # Tela de cidades (lista de cidades)
│       └── style.js
│   ├── FavoriteScreen/
│       └── index.js       # Tela de favoritos
│   ├── HomeScreen/
│       └── index.js       # Tela inicial (Home)
│       └── style.js
│   ├── MapScreen/
│       └── index.js       # Tela com mapa e pontos turísticos
│   ├── PointDetails/
│       └── index.js       # Detalhes de um ponto turístico
│       └── style.js
│   ├── ProfileScreen/
│       └── index.js       # Tela de perfil do usuário
│   ├── RatingScreen/
│       └── index.js       # Tela de avaliação de pontos turísticos
│       └── style.js
│   ├── RegisterScreen/
│       └── index.js       # Tela de registro de usuário
│       └── style.js
│   └── LoginScreen.js     # Tela de login
├── services/
│   └── api.js             # Configuração de conexão com API
├── App.js                 # Componente principal do app
├── app.json               # Configuração do Expo
├── index.js               # Ponto de entrada do React Native
├── package.json           # Dependências e scripts do projeto
└── .gitignore  
👨‍💻 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
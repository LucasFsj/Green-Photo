🌱 Green+Photo
Classificador inteligente de resíduos usando IA + Node.js + TensorFlow.js

O Green+Photo é um projeto educacional que utiliza Inteligência Artificial para classificar resíduos através de fotos, indicando a lixeira correta, exibindo curiosidades e incentivando o descarte consciente.

Ele combina Node.js, TensorFlow.js, HTML/CSS (Tailwind) e uma interface simples e amigável para criar uma experiência rápida e intuitiva.

📸 Como funciona?

O usuário envia uma foto de algum material (plástico, papel, metal, vidro ou orgânico).

A imagem é enviada ao backend em Node.js.

O TensorFlow.js processa a imagem com um modelo treinado no Teachable Machine.

O sistema retorna:

Categoria detectada

Lixeira correta para descarte

Curiosidade sobre o material

Imagem ilustrativa

🚀 Tecnologias utilizadas
Frontend

HTML5

TailwindCSS

JavaScript

Lucide Icons

Tela responsiva com modo noturno (lua, estrelas e nuvens animadas)

Backend

Node.js

Express

TensorFlow.js (tfjs-node)

Multer para upload de imagens

CORS

Modelo de IA treinado no Google Teachable Machine

📂 Estrutura do projeto
Green-Photo/
 ├── Backend/
 │   ├── server.js
 │   ├── model/
 │   │   ├── model.json
 │   │   ├── weights.bin
 │   └── uploads/
 │
 ├── Frontend/
 │   ├── index.html
 │   ├── style.css
 │   ├── script.js
 │   └── imagens/
 │
 ├── .gitignore
 └── README.md

🔧 Como rodar o projeto localmente
1️ - Clonar o repositório
git clone https://github.com/LucasFsj/Green-Photo.git

2️ - Instalar dependências
cd Backend
npm install

3️ - Iniciar o servidor
node server.js


O servidor iniciará em:

http://localhost:3000

4️ - Abrir o frontend

Abra o arquivo:

Frontend/index.html

🧠 Modelo de IA

O modelo foi treinado no Google Teachable Machine com 5 categorias:

VIDRO

PLÁSTICO

ORGÂNICO

PAPEL

METAL

As imagens são tratadas e redimensionadas no backend antes da classificação.

# Funcionalidades principais

✔ Preview da imagem
✔ Classificação via IA
✔ Modal com curiosidades
✔ Lixeira correta exibida
✔ Tela agradável, moderna e responsiva
✔ Animações de noite com lua, estrelas e nuvens
✔ Backend otimizado e seguro
✔ Suporte para testes com celular via rede Wi-Fi

# Objetivo do projeto

Esse projeto nasce como uma solução educacional, intuitiva e ecológica para ajudar comunidades e estudantes a:

Aprender sobre separação correta do lixo

Estimular consciência ambiental

E explorar o uso prático de IA aplicada ao cotidiano

# Contribuições

Contribuições são bem-vindas!
Sinta-se à vontade para abrir issues, enviar pull requests ou sugerir melhorias.

# Licença

Este projeto é de uso educacional e de código aberto.
Sinta-se livre para usar como referência em estudos.

⭐ Autor

Lucas Felipe S. Jorge
Desenvolvedor e estudante.

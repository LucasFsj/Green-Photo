const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');

const app = express();
app.use(express.static(path.join(__dirname, '../Frontend')));
app.use('/model', express.static(path.join(__dirname, 'model')));
app.use('/imagens', express.static(path.join(__dirname, '../frontend/public/imagens')));
const PORT = 3000;

let model;
const MODEL_PATH = path.join(__dirname, 'model', 'model.json');

(async () => {
  try {
    model = await tf.loadLayersModel('file://' + MODEL_PATH);
    console.log('✅ Modelo carregado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao carregar o modelo:', error);
  }
})();

app.use(cors());
app.use(express.static(path.join(__dirname, '../Frontend/public')));


const upload = multer({ dest: 'uploads/' });

const curiosidades = {
  "plástico": { texto: "O plástico pode levar até 400 anos...", imagem: "/imagens/plastico.jpg", lixeira: "/imagens/lixeira_plastico.png" },
  "papel": { texto: "O papel leva de 3 a 6 meses...", imagem: "/imagens/papel.jpg", lixeira: "/imagens/lixeira_papel.png" },
  "vidro": { texto: "O vidro pode levar até 1 milhão de anos...", imagem: "/imagens/vidro.jpg", lixeira: "/imagens/lixeira_vidro.png" },
  "metal": { texto: "O alumínio leva até 500 anos...", imagem: "/imagens/metal.jpg", lixeira: "/imagens/lixeira_metal.png" },
  "orgânico": { texto: "Resíduos orgânicos se decompõem em semanas...", imagem: "/imagens/organico.jpg", lixeira: "/imagens/lixeira_organico.png" }
};

app.post('/teste', upload.single('image'), (req, res) => {
  console.log('🟢 Recebi o upload:', req.file.originalname);
  res.json({ message: 'Upload recebido com sucesso!' });
});

app.post('/classify', upload.single('image'), async (req, res) => {
  console.log('📩 Requisição recebida em /classify');
  
  if (!req.file) {
    console.log('❌ Nenhum arquivo recebido!');
    return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
  }

  console.log('🖼️ Arquivo recebido:', req.file.originalname);
  try {
    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const imageTensor = tf.node.decodeImage(imageBuffer, 3);
    const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const normalized = resized.div(255.0).expandDims(0);

    const prediction = model.predict(normalized);
    const predictionArray = prediction.dataSync();
    const categorias = ['VIDRO', 'PLÁSTICO', 'ORGÂNICO', 'PAPEL', 'METAL'];
    const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
    const classePredita = categorias[maxIndex];

    fs.unlinkSync(imagePath);
    const dadosCuriosidade = curiosidades[classePredita.toLowerCase()] || {};

    res.json({
      class: classePredita,
      curiosidade: dadosCuriosidade.texto,
      imagemCuriosidade: dadosCuriosidade.imagem,
      lixeira: dadosCuriosidade.lixeira
    });
  } catch (error) {
    console.error('❌ Erro ao processar imagem:', error);
    res.status(500).json({ error: 'Erro ao processar a imagem.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌎 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📱 Acesse pelo celular via http://<IP_LOCAL>:${PORT}`);
});
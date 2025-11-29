const imageUpload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');
const classifyBtn = document.getElementById('classifyBtn');
const result = document.getElementById('result');
const resultLabel = document.getElementById('resultLabel');
const curiosidadeBtn = document.getElementById('curiosidadeBtn');
const curiosidadeTitulo = document.getElementById('curiosidadeTitulo');
const curiosidadeTexto = document.getElementById('curiosidadeTexto');
const curiosidadeImagem = document.getElementById('curiosidadeImagem');
const curiosidadeModal = document.getElementById('curiosidadeModal');
const lixeiraImg = document.getElementById('lixeiraImg');
const loading = document.getElementById('loading');
(async () => {
  try {
    const model = await tf.loadLayersModel('/model/model.json');
    console.log('✅ Modelo carregado com sucesso!');
    console.log('📊 Estrutura do modelo:');
    model.summary();
  } catch (error) {
    console.error('❌ Erro ao carregar o modelo:', error);
  }
})();

let selectedFile = null;
let dadosAtuais = {};

imageUpload.addEventListener('change', (e) => {
  selectedFile = e.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      preview.src = event.target.result;
      preview.classList.remove('hidden');
      result.classList.add('hidden');
      curiosidadeBtn.classList.add('hidden');
      lixeiraImg.innerHTML = '';
    };
    reader.readAsDataURL(selectedFile);
  }
});

classifyBtn.addEventListener('click', async () => {
  if (!selectedFile) {
    alert('Envie uma imagem para classificar.');
    return;
  }

  const formData = new FormData();
  formData.append('image', selectedFile);

  loading.classList.remove('hidden');

try {
    // use "localhost" se estiver testando no mesmo PC
const response = await fetch('http://localhost:3000/classify', {
  method: 'POST',
  body: formData,
});

    const data = await response.json();
    loading.classList.add('hidden');

    dadosAtuais = data;

    resultLabel.textContent = data.class;
    result.classList.remove('hidden');
    curiosidadeBtn.classList.remove('hidden');
    lixeiraImg.innerHTML = `<img src="${data.lixeira}" alt="Lixeira" class="w-24 mx-auto mt-2">`;
  } catch (error) {
    console.error('Erro ao classificar a imagem:', error);
    alert('Ocorreu um erro ao processar a imagem.');
    loading.classList.add('hidden');
  }
});

curiosidadeBtn.addEventListener('click', mostrarCuriosidade);

function mostrarCuriosidade() {
  curiosidadeTitulo.textContent = dadosAtuais.class;
  curiosidadeTexto.textContent = dadosAtuais.curiosidade;
  curiosidadeImagem.src = dadosAtuais.imagemCuriosidade;
  curiosidadeModal.classList.remove('hidden');
}

function fecharModal() {
  curiosidadeModal.classList.add('hidden');
}

curiosidadeModal.addEventListener('click', (e) => {
  if (e.target === curiosidadeModal) fecharModal();
});

const response = await fetch("http://localhost:3000/teste", {
  method: "POST",
  body: formData
});

       // teste
       
        const contentArray = [
          
          "I - Introdução. (Balão Verde)",
    "Seja bem-vindo(a) ao Treinamento Básico II do Exército Brasileiro.",
    "Eu sou o Segundo Tenente Therus e irei treiná-lo(a).",
    "Não durma durante o treinamento para não ser auto-kickado(a).",
    "Responda às perguntas usando \"Sim, Senhor\", e \"Não, Senhor\".",
    "Se aprovado(a), ao final do treinamento será promovido(a) à patente de Soldado Estrela.",
    "Se reprovado(a), terá a chance de refazer o treinamento em outro momento.",
    "O treinamento está dividido em três partes: MQG/ADO, Centro de Instrução e Apresente-se.",
    "Dúvidas?",
    "II - MQG (Monitoramento do Quartel General) e ADO (Área de Oficiais). (Balão Verde)",
    "MQG (Monitoramento do Quartel General):",
    "O MQG é o local onde os oficiais monitoram e supervisionam o QG.",
    "É o tapete vermelho que se encontra no centro do batalhão.",
    "Nunca suba no MQG ou estará sujeito a rebaixamento/demissão.",
    "Dúvidas?",
    "ADO (Área de Oficiais):",
    "Como o próprio nome já diz, é o local onde os oficiais ficam quando não há mais vagas em GP ou PAR.",
    "Nunca entre na ADO, ou estará sujeito a banimento do Exército Brasileiro.",
    "Dúvidas?",
    "III - Centro de Instrução (CI).",
    "O CI são os tapetes brancos e pretos à esquerda do Quartel General.",
    "Irá assumir o tapete branco quem for aplicar a instrução, e o tapete preto quem irá recebê-la.",
    "Também pode ocorrer de um oficial solicitar sua presença no CI.",
    "Poderá ser para aplicar treinamento, avaliar, promover ou convocar para grupos externos.",
    "Dúvidas?",
    "IV - Apresente-se. (Balão Verde)",
    "O Apresente-se é feito quando um oficial vai promover ou rebaixar um praça/oficial.",
    "O Sentido/Atenção será dado e o oficial falará: fulano, apresente-se.",
    "Feito isso, você deverá seguir as seguintes etapas:",
    "1. Ir à frente do oficial e acenar.",
    "2. Esperar o seu Superior acenar.",
    "3. Falar: Senhor(a), [Sua Patente] [Seu Nick] apresentando-se, à espera de suas ordens.",
    "Atenção ao próximo exemplo para você pegar como referência quando chegar sua vez no teste prático.",
    "Senhor, Soldado Estrela Therus apresentando-se, à espera de suas ordens.",
    "4. Escutar as ordens dele.",
    "5. Esperar o seu Superior acenar.",
    "6. Acenar logo após.",
    "7. Falar: Senhor(a), permissão para dispensa.",
    "8. Aguardar a dispensa e fazer as alterações em PAR.",
    "Dúvidas até o momento?",
    "Regras do Apresente-se:",
    "1. Sempre estar de frente ao Oficial.",
    "2. Só realize as alterações após ser dispensado pelo Oficial.",
    "3. Nunca acene usando \"o/\".",
    "Dúvidas sobre o \"Apresente-se\"?",
    "V - Finalização. (Balão Verde)",
    "Parabéns, está aprovado(a) no Treinamento Básico II, agora está apto(a) a ser promovido(a) no Quartel General."
];

        const container = document.getElementById('container');
        const alertBox = document.getElementById('alert');
        const copyPreviousButton = document.getElementById('copyPrevious');
        const copyNextButton = document.getElementById('copyNext');
        const startAutoCopyButton = document.getElementById('startAutoCopy');
        const stopAutoCopyButton = document.getElementById('stopAutoCopy');

        let autoCopyInterval;

        contentArray.forEach((paragraph, index) => {
          const p = document.createElement('p');
          p.className = 'paragraph';
          if (paragraph.includes('(Balão Verde)')) {
            p.classList.add('balao-verde');
          }
          p.dataset.index = index;
          p.innerText = paragraph;
          container.appendChild(p);
        });

        const paragraphs = document.querySelectorAll('.paragraph');

        function copyText(index) {
          if (index < 0 || index >= paragraphs.length) return;

          const textToCopy = paragraphs[index].innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            paragraphs.forEach(p => p.classList.remove('copied'));
            paragraphs[index].classList.add('copied');

            // Scroll to center the paragraph
            const containerHeight = container.clientHeight;
            const paragraphOffsetTop = paragraphs[index].offsetTop;
            const paragraphHeight = paragraphs[index].offsetHeight;
            const scrollTop = paragraphOffsetTop - (containerHeight / 2) + (paragraphHeight / 2);
            container.scrollTo({ top: scrollTop, behavior: 'smooth' });

            // Show alert if paragraph contains "(Balão Verde)"
            if (paragraphs[index].classList.contains('balao-verde')) {
              showAlert();
              clearInterval(autoCopyInterval); // Stop the timer if "(Balão Verde)" is found
            }
          }).catch(err => console.error('Failed to copy text: ', err));
        }

        function showAlert() {
          alertBox.style.display = 'block';
          setTimeout(() => {
            alertBox.style.display = 'none';
            enableButtons();
          }, 3000);
        }

        function enableButtons() {
          copyPreviousButton.disabled = false;
          copyNextButton.disabled = false;
        }

        let currentIndex = 0;

        copyPreviousButton.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            copyText(currentIndex);
          }
        });

        copyNextButton.addEventListener('click', () => {
          if (currentIndex < paragraphs.length - 1) {
            currentIndex++;
            copyText(currentIndex);
          }
        });

        startAutoCopyButton.addEventListener('click', () => {
          autoCopyInterval = setInterval(() => {
            if (currentIndex < paragraphs.length - 1) {
              currentIndex++;
              copyText(currentIndex);
            } else {
              clearInterval(autoCopyInterval);
            }
          }, 6000);
        });

        stopAutoCopyButton.addEventListener('click', () => {
          clearInterval(autoCopyInterval);
        });

        // Copia automaticamente o primeiro parágrafo ao carregar a página
        window.onload = () => {
          copyText(currentIndex);
        };
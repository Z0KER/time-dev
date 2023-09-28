const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Perguntas para obter informações sobre o projeto
const perguntas = [
  "Qual a complexidade do projeto (1-10)? ",
  "Quantas seções a landing page terá? ",
  "A landing page necessitará de integração de mapas (1 para sim, 0 para não)? ",
  "A landing page necessitará de chat ao vivo (1 para sim, 0 para não)? ",
  "A landing page necessitará de formulários dinâmicos (1 para sim, 0 para não)? ",
  "A landing page necessitará de animações personalizadas (1 para sim, 0 para não)? ",
  "A landing page necessitará de integração com API (1 para sim, 0 para não)? ",
  "A landing page necessitará de responsividade avançada (1 para sim, 0 para não)? ",
  "A landing page necessitará de ferramentas de agendamento (1 para sim, 0 para não)? ",
  "A landing page necessitará de vídeos/conteúdo multimídia (1 para sim, 0 para não)? ",
  "A landing page necessitará de recursos de acessibilidade (1 para sim, 0 para não)? "
];

let respostas = [];

// Função para calcular o tempo estimado baseado nas respostas
const calcularTempoEstimado = (respostas) => {
  const [complexidade, secoes, ...recursosEspeciais] = respostas.map(Number);
  const fatorComplexidade = complexidade * 3; // Ajuste no fator de complexidade
  const fatorSecoes = secoes * 4; // Ajuste no fator de seções
  
  // Calcula o tempo adicional necessário para cada recurso especial
  const fatorRecursosEspeciais = recursosEspeciais.reduce((acc, recurso) => acc + (recurso === 1 ? 5 : 0), 0);
  
  // Calcula o tempo total em horas
  const tempoTotalHoras = fatorComplexidade + fatorSecoes + fatorRecursosEspeciais;
  
  // Calcula a margem de erro baseada na complexidade (0% a 50%)
  const margemErro = (complexidade / 10) * 0.5;
  const tempoComMargemErro = tempoTotalHoras * (1 + margemErro);
  
  // Converte para dias úteis de 5.5 horas de codificação efetiva
  const diasUteis = Math.ceil(tempoComMargemErro / 5.5) + 5;
  
  return diasUteis;
};

const fazerPergunta = (indice) => {
  if (indice >= perguntas.length) {
    const diasUteis = calcularTempoEstimado(respostas);
    console.log(`O tempo estimado para a criação da landing page é de aproximadamente ${diasUteis} dias úteis.`);
    rl.close();
    return;
  }

  rl.question(perguntas[indice], (resposta) => {
    respostas.push(resposta);
    fazerPergunta(indice + 1);
  });
};

fazerPergunta(0);

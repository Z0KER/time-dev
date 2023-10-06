const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const perguntasCriacao = [
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
]

const perguntasAtualizacao = [
  "Quantas imagens você deseja atualizar? ",
  "Quantos textos você deseja atualizar? ",
  "Quantos recursos especiais você deseja atualizar? "
]

let respostas = []

const calcularTempoEstimadoAtualizacao = (respostas) => {
  const [imagens, textos, recursosEspeciais] = respostas.map(Number)
  
  let tempoTotalHoras = imagens * 0.1
  tempoTotalHoras += textos * 1
  tempoTotalHoras += recursosEspeciais * 5

  const diasUteis = Math.ceil(tempoTotalHoras / 5.5) + 1
  
  return diasUteis
}

const fazerPergunta = (indice, tipo) => {
  const perguntas = tipo === 'criar' ? perguntasCriacao : perguntasAtualizacao

  if (indice >= perguntas.length) {
    const diasUteis = tipo === 'criar' ? calcularTempoEstimado(respostas) : calcularTempoEstimadoAtualizacao(respostas)
    console.log(`O tempo estimado é de aproximadamente ${diasUteis} dias úteis.`)
    rl.close()
    return
  }

  rl.question(perguntas[indice], (resposta) => {
    respostas.push(resposta)
    fazerPergunta(indice + 1, tipo)
  })
}

rl.question("Você deseja criar uma nova landing page ou atualizar uma existente? (criar/att) ", (tipo) => {
  if (tipo === "criar" || tipo === "att") {
    fazerPergunta(0, tipo)
  } else {
    console.log("Opção inválida.")
    rl.close()
  }
})

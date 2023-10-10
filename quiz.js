const questions = [
  {
    question: "Qual é a capital do Brasil ?",
    choices: ["Brasília", "Rio De Janeiro", "São Paulo", "Salvador"],
    answer: "Brasília",
  },
  {
    question: "Qual é a capital da Argentina ?",
    choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
    answer: "Buenos Aires",
  },
  {
    question: "Qual é a capital da França ?",
    choices: ["Roma", "Madri", "Paris", "Londres"],
    answer: "Paris",
  },
  {
    question: "Qual é a capital da Espanha?",
    choices: ["Lisboa", "Madri", "Barcelona", "Valência"],
    answer: "Madri",
  },
  {
    question: "Qual é a capital da Itália?",
    choices: ["Veneza", "Milão", "Roma", "Nápole"],
    answer: "Roma",
  },
  {
    question: "Qual é a capital do Canadá?",
    choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    answer: "Ottawa",
  },
  {
    question: "Qual é a capital dos Estados Unidos?",
    choices: ["Nova York", "Los Angeles", "Chicago", "Washington D.C."],
    answer: "Washington D.C.",
  },
];

const questionElement = document.querySelector("#question");
const choiceElements = document.querySelectorAll(".choice");
const nextButton = document.querySelector("#next");
const scoreElement = document.querySelector("#score");
const wrongElement = document.querySelector("#wrong");

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false; // Variável criada para evitar que pule para próxima pergunta sem responder

function loadQuestion() {
  const currentQuestionData = questions[currentQuestion]; // Capturar os dados da pergunta. "currentQuestionData" são os dados da pergunta: question, choices e answer
  questionElement.innerText = currentQuestionData.question; // Exibir a questão atual no elemento de id 'question. Capturar o elemento da pergunta, ou seja, "questionElement" e colocar como o valor da pergunta

  const choices = shuffleArray(currentQuestionData.choices);

  for (let i = 0; i < choiceElements.length; i++) { // for para percorrer cada uma das questões e jogar as respostas nos botões
    choiceElements[i].innerText = choices[i]; // O loop rodará quatro vezes, cada um dos botões tem um índice, troca o "innerText" por uma das escolhas
  }
  answerChosen = false; // Reset para falso
}

function shuffleArray(array) { // Função que recebe array e embaralhará as respostas
  let currentIndex = array.length;
  let temporalyValue;
  let ramdomIndex;

  while (0 !== currentIndex) {
    ramdomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporalyValue = array[currentIndex];
    array[currentIndex] = array[ramdomIndex];
    array[ramdomIndex] = temporalyValue;
  }
  return array;
}

function checkAnswer(e) { // Função que vai verificar se a resposta está correta ou não, caso esteja ele ira adicionar +1 ao score
  if (answerChosen) return; // Se escolheu a pergunta, retorna

  answerChosen = true; // Se respondeu, não há volta
  if (e.target.innerText === questions[currentQuestion].answer) {
    score++; // Se respondeu correto, aumenta a pontuação
    scoreElement.innerText = `Score: ${score}` // Atualizar o texto do score
    alert("Correto!");
  } else {
    wrong++;
    wrongElement.innerText = `Wrong ${ wrong }`
    alert(`Errado! Resposta: ${questions[currentQuestion].answer}. `)
  }
}

choiceElements.forEach((btn) => { // Para cada um dos elementos de opções, quando clicamos no elemento, executará essa função
  btn.addEventListener("click", checkAnswer);
});

nextButton.addEventListener("click", () => { // Quando clicar no próximo questionário, atualiza os dados da página com os novos valores
  if (!answerChosen) {
    alert("Por favor selecione sua opção antes de continuar!");
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) { // Caso tenha mais questões para serem respondidas, mostra-se essa nova questão na tela
    loadQuestion();
  } else { // Caso contrario, finalizou as questões e apresenta uma mensagem informando isso
    alert(`Fim de jogo! Você acertou ${score} de ${questions.length} perguntas`);
    restartQuiz()
  }
});

function restartQuiz() { // Reinicia o quiz
  currentQuestion = 0
  score = 0
  wrong = 0
  scoreElement.innerText = "Score: 0"
  wrongElement.innerText = "Wrong: 0"
  loadQuestion()
}

loadQuestion();
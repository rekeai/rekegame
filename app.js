let currentRound = 0;
let score = 0;

const rounds = [
  {a:"real1.jpg", b:"fake1.jpg", fake:"B", prompt:'Image B was generated with Flux using the prompt "early 2000s emo profile pic selfie taken on an old digital camera from 2001"'},
  {a:"fake2.jpg", b:"real2.jpg", fake:"A", prompt:'Image A was generated with Flux using the prompt "photo of a student night out, group of university students having fun, drunk, amateurish flash photography, 2004 canon-EOS digital camera, indoors, bar, over exposed flash"'},
  {a:"real3.jpg", b:"fake3.jpg", fake:"B", prompt:'Image B was generated with Flux using the prompt "middle aged bald man on a zoom call, blur background, amateur, off centre, low quality webcam, sitting further back, more amateurish, more blurry, artifacts, low quality internet connection, low quality webcam"'},
  {a:"fake4.jpg", b:"real4.jpg", fake:"A", prompt:'Image A was generated with Flux using the prompt "stock photo of a woman walking a dog"'},
  {a:"real5.jpg", b:"fake5.jpg", fake:"B", prompt:'Image B was generated with Flux using the prompt "amateurish photo of a teacher taken for a local newspaper"'},
  {a:"fake6.jpg", b:"real6.jpg", fake:"A", prompt:'Image A was generated with Flux using the prompt "journalism CCTV photo of a tesla crashed into a highway barrier"'},
  {a:"real7.jpg", b:"fake7.jpg", fake:"B", prompt:'Image B was generated with Flux using the prompt "urban warfare, amateur camera low quality shot"'},
  {a:"fake8.jpg", b:"real8.jpg", fake:"A", prompt:'Image A was generated with Flux using the prompt "professional corporate headshot of a man"'},
  {a:"real9.jpg", b:"fake9.jpg", fake:"B", prompt:'Image B was generated with Flux using the prompt "school photo group of students in uniform taken outside the school on tiered seating, Victorian era black and white"'},
  {a:"real10.jpg", b:"fake10.jpg", fake:"B", prompt:'Image B was generated with Flux'}
];

const imageA = document.getElementById("imageA");
const imageB = document.getElementById("imageB");
const feedback = document.getElementById("feedback");
const nextPairBtn = document.getElementById("next-pair");
const endGame = document.getElementById("end-game");
const finalScore = document.getElementById("final-score");
const progressFill = document.getElementById("progress-fill");
const currentQuestion = document.getElementById("current-question");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");

// Preload all images
const imagePaths = [];
rounds.forEach(r => {
  imagePaths.push("images/" + r.a);
  imagePaths.push("images/" + r.b);
});
const preloadedImages = [];
imagePaths.forEach(src => {
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
});

function loadRound() {
  if(currentRound >= rounds.length){ showEndGame(); return; }

  const round = rounds[currentRound];
  imageA.src = "images/" + round.a;
  imageB.src = "images/" + round.b;

  feedback.textContent = "";
  nextPairBtn.classList.add("hidden");
  btnA.disabled = false;
  btnB.disabled = false;

  [imageA, imageB].forEach(img => {
    img.classList.remove("loaded");
    img.onload = () => img.classList.add("loaded");
  });

  currentQuestion.textContent = currentRound + 1;
  progressFill.style.width = `${(currentRound / rounds.length)*100}%`;
}

function makeGuess(choice){
  const round = rounds[currentRound];
  let correct = (choice === round.fake);

  if(correct){
    score++;
    feedback.textContent = `✓ Correct! ${round.prompt}`;
    feedback.style.color = "green";
  } else {
    feedback.textContent = `✗ Incorrect! ${round.prompt}`;
    feedback.style.color = "red";
  }

  btnA.disabled = true;
  btnB.disabled = true;
  nextPairBtn.classList.remove("hidden");
}

function nextPair(){
  currentRound++;
  loadRound();
}

function showEndGame(){
  document.getElementById("game-board").classList.add("hidden");
  feedback.classList.add("hidden");
  nextPairBtn.classList.add("hidden");
  endGame.classList.remove("hidden");
  finalScore.textContent = score;
  progressFill.style.width = "100%";

  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`I scored ${score}/10 on the Reke Real or Fake AI game! Can you beat me?`);
  document.getElementById("share-twitter").href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  document.getElementById("share-linkedin").href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=Reke AI Game&summary=${text}`;
  document.getElementById("share-whatsapp").href = `https://api.whatsapp.com/send?text=${text} ${url}`;
}

function restartGame(){
  currentRound=0;
  score=0;
  document.getElementById("game-board").classList.remove("hidden");
  feedback.classList.remove("hidden");
  endGame.classList.add("hidden");
  loadRound();
}

function enlargeImage(img){
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal-img").src = img.src;
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

// Start the game
loadRound();

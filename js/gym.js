// Form

const answers = [];


function saveAnswerAndNext(questionIndex, answer) {
  answers[questionIndex - 1] = answer; 
  showNextQuestion();
}


function saveTextareaAndNext(questionIndex) {
    const activeQuestion = document.querySelector(`#questions-container .question.active`);
    const fields = activeQuestion.querySelectorAll('input, textarea');
  
    fields.forEach((field, idx) => {
      const fieldAnswerIndex = questionIndex - 1 + idx; 
      answers[fieldAnswerIndex] = field.value.trim();
    });
  
    const nextQuestion = activeQuestion.nextElementSibling;
    if (!nextQuestion || !nextQuestion.classList.contains('question')) {
        sendAnswers();
    } else {
        showNextQuestion();
    }
  }


function toggleNextButton(questionIndex) {
  const activeQuestion = document.querySelector(`#questions-container .question.active`);
  const fields = activeQuestion.querySelectorAll('input, textarea');
  const nextButton = document.getElementById(`next-btn-${questionIndex}`);


  const allFilled = Array.from(fields).every(field => field.value.trim() !== '');

  nextButton.disabled = !allFilled;
}


function showNextQuestion() {
  const currentQuestion = document.querySelector('.question.active');
  const nextQuestion = currentQuestion.nextElementSibling;

  if (nextQuestion && nextQuestion.classList.contains('question')) {
    currentQuestion.classList.remove('active');
    nextQuestion.classList.add('active');
  } else {
    showResults();
  }
}


function showPreviousQuestion() {
  const currentQuestion = document.querySelector('.question.active');
  const previousQuestion = currentQuestion.previousElementSibling;

  if (previousQuestion && previousQuestion.classList.contains('question')) {
    currentQuestion.classList.remove('active');
    previousQuestion.classList.add('active');
  }
}


function resetSurvey() {

  answers.length = 0;


  const questions = document.querySelectorAll('.question');
  questions.forEach((question, index) => {
      question.classList.remove('active');
      if (index === 0) {
          question.classList.add('active');
      }
  });
}


function sendAnswers() {
    const accessKey = "2dbb2bf8-00d6-41c0-846f-8b872d4fa11a";
  
    const answersText = answers
      .map((answer, index) => `Question ${index + 1}: ${answer || "No answer provided"}`)
      .join('\n');
  
    const data = {
      access_key: accessKey,
      message: answersText
    };
  
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        resetSurvey();
    })
    .catch(error => {
        console.error('Error submitting answers:', error);
    });
  }

  
  
// Particles

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  const container = document.querySelector('.particles');
  container.appendChild(particle);
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const endX = startX + (Math.random() * 100 - 50);
  const endY = startY + (Math.random() * 100 - 50);
  gsap.set(particle, {
      x: startX,
      y: startY,
      opacity: 1,
      scale: 1,
  });
  gsap.to(particle, {
      x: endX,
      y: endY,
      opacity: 0,
      scale: 0.5,
      duration: 2,
      onComplete: () => {
          particle.remove();
      }
  });
}

setInterval(createParticle, 100);




// Navigation

document.addEventListener("click", () => {
  const checkbox = document.querySelector("#check");
  const burgerMenu = document.querySelector(".burger-menu");

  checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
          burgerMenu.style.display = "block"; 
          requestAnimationFrame(() => {
              burgerMenu.classList.add("open"); 
          });
      } else {
          burgerMenu.classList.remove("open");
          burgerMenu.addEventListener("transitionend",() => {
                  if (!burgerMenu.classList.contains("open")) {
                      burgerMenu.style.display = "none"; 
                  }
              },
          );
      }
  });
});



window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const targetElement = document.querySelector('.burger-wrapper');

  if (scrollPosition >= 100) {
    targetElement.classList.add('active'); 
  } else {
    targetElement.classList.remove('active'); 
  }
});



// Main-App


appOption = false;



window.addEventListener('scroll', () => {
  
  const scrollPositionApp = window.scrollY;
  console.log(scrollPositionApp);
  
  const img = document.querySelector(".main-app__options-img img")
  const appMainText = document.querySelector(".main-app__main-text h2")
  
  if (scrollPositionApp >= 1450 && scrollPositionApp <= 3300) {
    
    if (!appOption) {
      appOption = true;
      $('.main-app__options-text').slideDown(1000)
      img.style.opacity = "1";
      appMainText.style.opacity = "1"
      
    } 
  } else {
    
    if (appOption)
      appOption = false;
    $('.main-app__options-text').slideUp(1000)
    img.style.opacity = "0";
    appMainText.style.opacity = "0"
  }
  
  
})


if (window.innerWidth <= 1089) {

  const optionNext = document.querySelector(".option-next");
  const optionBack = document.querySelector(".option-back");
  const optionsDivs = document.querySelectorAll(".option");

  let currentIndexOption = 0;


  optionNext.addEventListener('click', () => {

    if (currentIndexOption >= 0) {
      optionsDivs[currentIndexOption].classList.remove('active')
    }

    currentIndexOption = (currentIndexOption + 1) % optionsDivs.length;

    optionsDivs[currentIndexOption].classList.add('active');


  })

  optionBack.addEventListener('click', () => {

    if (currentIndexOption >= -1) {
      optionsDivs[currentIndexOption].classList.remove('active')
    }

    currentIndexOption = (currentIndexOption - 1 + optionsDivs.length) % optionsDivs.length;

    optionsDivs[currentIndexOption].classList.add('active');

  })

}



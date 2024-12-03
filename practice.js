const urlParams = new URLSearchParams(window.location.search);
const targetLanguage = urlParams.get('targetLanguage');
const targetGrammar = urlParams.get('targetGrammar');

fetch(`./grammarDataJson/${targetLanguage}.json`)
  .then(response => response.json())
  .then(data => {
    if (!data || data.language !== targetLanguage) {
      console.error('Language data not found!');
      return;
    }
    
    const grammarData = data.grammarPoints.find(point => 
      `${point.grammarPoint}_${point.subCategory}` === targetGrammar
    );
    
    if (!grammarData) {
      console.error('Grammar point not found!');
      return;
    }

    document.getElementById("grammarType").innerHTML = grammarData.Title;

    const practiceQuestions = grammarData.exercises;

    function getRandomQuestions(){
        const randomIndex= Math.floor(Math.random()*practiceQuestions.length);
        return practiceQuestions[randomIndex];
    }

    let currentIndex = 0; 


const orderSwitch = document.getElementById("orderSwitch");

  let isOrdered = false;

  orderSwitch.onclick = function() {
    isOrdered = !isOrdered;  

    
    if (isOrdered === false) {
      orderSwitch.innerHTML = "Current mode: Random <br> Click to change"; 
      loadQuestions();
       
    } else {
      orderSwitch.innerHTML = "Current mode: Sequential <br> Click to change"; 
      loadQuestions();
      
    }

  };

let currentQuestion;
function loadQuestions(){
    document.getElementById("submitBtn").disabled = false;
    document.getElementById("submitBtn").classList.remove("disabled");
    if (isOrdered) {
      currentQuestion = practiceQuestions[currentIndex];
    } else {
    currentQuestion= getRandomQuestions(); }
    document.getElementById("questionArea").innerText=currentQuestion.text;
    document.getElementById("translationCn").innerText=currentQuestion.ChineseTranslation;
    document.getElementById("translationEn").innerText=currentQuestion.EnglishTranslation;
    document.getElementById("inputAnswerArea").value="";
    document.getElementById("feedbackArea").innerText="";
    console.log("Current Question:", currentQuestion);

    return currentQuestion
}



function getFeedback(){
    console.log("Submit button clicked");
    const userInputText= document.getElementById("inputAnswerArea").value.trim().toLowerCase();
    const correctAnswer= currentQuestion.correctAnswer.toLowerCase();
    const correctAnswer2 = currentQuestion.correctAnswer2 ? currentQuestion.correctAnswer2.toLowerCase() : null;
    
    if ((userInputText=== correctAnswer) || (userInputText=== correctAnswer2)) {
    document.getElementById("feedbackArea").innerText="Correct!";
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").classList.add("disabled");
    console.log(document.getElementById("submitBtn").disabled);
    }else{
    document.getElementById("feedbackArea").innerHTML =`Wrong. The correct answer is <span style="color: red">${correctAnswer}</span>`;
    console.log("Current Question:", currentQuestion);
    document.getElementById("submitBtn").disabled = false;
    
}

}
submitBtn.addEventListener("click",getFeedback);



nextBtn.addEventListener("click", () => {
  if (isOrdered) {
    if (currentIndex >= practiceQuestions.length - 1) {
      alert("You have finished all the questions~Start again");
      currentIndex = 0; 
    } else {
      currentIndex++; 
    }
    loadQuestions(); 
  } else {
    loadQuestions(); 
  }
});

loadQuestions();

})
.catch(error => {
  console.error('Error loading data:', error);
});


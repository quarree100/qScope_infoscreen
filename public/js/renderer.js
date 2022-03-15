//dev function to print element that jquery captured
//usage: $(xxx).log()
$.fn.log = function() {
  console.log.apply(console, this);
  return this;
}

// ----------------------------- running modes ------------------------
const displayQuestionnaireMode = function(question){
    $(".questionnaire").show();
    $(".inputMode").hide();
    $(".simulationMode").hide();

    if (question){
      $("#questionText").text(question)
    } else {
      $("#questionText").text(sampleQuestions[getRandomInt(5)])
    }
    
}

const highlightAnswerYes = function(){
  $("#questionAnswerYes").addClass("questionAnswerYesActive")
}
const highlightAnswerNo = function(){
  $("#questionAnswerNo").addClass("questionAnswerNoActive")
}
const grayoutAnswerYes = function(){
  $("#questionAnswerYes").removeClass("questionAnswerYesActive")
}
const grayoutAnswerNo = function(){
  $("#questionAnswerNo").removeClass("questionAnswerNoActive")
}

const displayInputMode = function(){
    $(".questionnaire").hide();
    $(".inputMode").show();
    $(".simulationMode").hide();
}

const displaySimulationMode = function(){
    $(".questionnaire").hide();
    $(".inputMode").hide();
    $(".simulationMode").show();
}

const switchUserMode = function(mode, question){
  //Todo: wrap in resetAnswer function
  grayoutAnswerYes()
  grayoutAnswerNo()
  if (mode == 'simulation'){
    displaySimulationMode()
  }
  else if (mode == 'input'){
    displayInputMode()
  }
  else if (mode == 'questionnaire'){
    displayQuestionnaireMode(question)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
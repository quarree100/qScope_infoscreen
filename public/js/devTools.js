// ---------------------------- KEY EVENTS ----------------------------
document.addEventListener('keydown', function (event) {
  console.log("current user mode", currentUserMode);
  if (event.key == " ") { // space
    const nextUserMode = calculateNextUserMode(currentUserMode)
    switchUserMode(nextUserMode, getRandomInt(5));
    currentUserMode = nextUserMode
  } else if (event.key == "d") { //d for dataview
    toggleDataViewContent()
  }
  else if (event.key == "v") { //d for dataview
    toggleVerboseMode()
  }
});

function calculateNextUserMode(currentUserMode){
  const userModes = ["input_scenarios", "input_households", "simulation", "questionnaire", "data_view"]
  const currentUserModeIndex = userModes.indexOf(currentUserMode)
  const nextUserModeIndex = (currentUserModeIndex + 1) % userModes.length
  return userModes[nextUserModeIndex]
}

//jquery log function
$.fn.log = function() {
  console.log.apply(console, this);
  return this;
};

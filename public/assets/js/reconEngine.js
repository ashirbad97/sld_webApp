var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var synth = window.speechSynthesis;
voices = synth.getVoices();
console.log("Supported Voices are : "+voices)
let currentDate = new Date();
currentDate.setMinutes(currentDate.getMinutes() + 5)
let time = currentDate.getHours() + ":" + currentDate.getMinutes()
console.log("Session Ends at : " + time);
var SessionId = ""

var sendScore = (score) => {
  return fetch('/api/score', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(score)
    // body data type must match "Content-Type" header
  }).then(response => response.json());
}

var generateSession = () => {
  return fetch('/generateSession', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    // body data type must match "Content-Type" header
  }).then(response => response.json());
}

generateSession().then((sessionId) => {
  console.log('New Session ID is : ' + sessionId)
  SessionId = sessionId
})
// Function to 
var playsubModuleName = (subModuleId,subModuleName)=> {
  audioFileName = '../../../assets/audio/'+subModuleId+'/'+subModuleName.toUpperCase()+'.m4a'
  var audio = new Audio(audioFileName)
  audio.crossOrigin = 'anonymous';
  var playPromise = audio.play()
  if (playPromise !== undefined) {
    playPromise.then(function() {
      // Automatic playback started!
      console.log("Played Audio Successfully")
    }).catch(function(error) {
      // Automatic playback failed.
      // Show a UI element to let the user manually start playback.
      console.log(error)
    });
  }
}

// var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-IN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
// var bg = document.querySelector('html');
// var hints = document.querySelector('.hints');

// var accuracyHolder = document.querySelector('#accuracy-holder');

// Was Disabled due to using helmet
///////////////////////////////////////////////////////////////////////////////////////////////
// When the page is being loaded it matches the quey elements
// var listenBtn = document.querySelectorAll('[id^="listenButton-"]');
// var speakBtn = document.querySelector('[id^="speakButton-"]');
// Loops through all the elements and adds an event listner to them so they can be used during run-time
// for(i=0;i<listenBtn.length;i++)
// {
//   listenBtn[i].addEventListener('click',function(){
//     listen(this.getAttribute('word'),this.getAttribute('wordid'))
//   })
// }

// for(i=0;i<speakBtn.length;i++)
// {
//   speakBtn[i].addEventListener('click',function(){
//     listen(this.getAttribute('word'),this.getAttribute('wordid'))
//   })
// }
/////////////////////////////////////////////////////////////////////////////////////////////////
var end_time = document.querySelector('#end_time')
end_time.textContent = " " + time

speak = function (val, wordId) {
  wordTarget = '' + wordId
  displayTarget = '#display-area-' + wordTarget
  displayArea = document.querySelector(displayTarget);
  recognition.start();
  correctVal = val.toUpperCase()
  console.log('Ready to receive a speech command.');
}

listen = function (val, wordId) {

  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  var utterThis = new SpeechSynthesisUtterance(val);
  utterThis.onend = function (event) {
    console.log('SpeechSynthesisUtterance.onend');
  }
  utterThis.onerror = function (event) {
    console.error('SpeechSynthesisUtterance.onerror');
  }
  utterThis.lang = 'hi-IN'
  utterThis.pitch = 1;
  utterThis.rate = 1;
  console.log(utterThis)
  synth.speak(utterThis);

}


recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var result = event.results[0][0].transcript.toUpperCase();
  // diagnostic.textContent = 'Result received: ' + color + '.';
  displayArea.textContent = result;
  // confidenceValue = (event.results[0][0].confidence)*100
  // accuracyHolder.textContent = (confidenceValue).toFixed(2) + '%';
  console.log('Word ID is :'+wordTarget)
  console.log('Confidence: ' + event.results[0][0].confidence);
  // console.log(result)
  // console.log(correctVal)
  comparisonResult = compareRecognition(result, correctVal)
  changeBox(wordTarget, comparisonResult)
}

recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onnomatch = function (event) {
  diagnostic.textContent = "Incorrect.";
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


compareRecognition = (result, correctVal) => {
  if (result == correctVal) {
    console.log("Correct Answer")
    return true
  } else {
    console.log("Wrong Answer")
    return false
  }
}

changeBox = (wordTarget, comparisonResult) => {
  attemptboxId = '#attemptbox-' + wordTarget
  speakButtonId = '#speakButton-' + wordTarget
  listenButtonId = '#listenButton-' + wordTarget

  correctSound = '../../../assets/audio/others/correct.wav'
  incorrectSound = '../../../assets/audio/others/wrong.wav'

  var attemptBox = document.querySelector(attemptboxId)
  var listenButton = document.querySelector(listenButtonId)
  var speakButton = document.querySelector(speakButtonId)

  var attempts = attemptBox.getAttribute('value')
  // If recognition is correct
  if (comparisonResult == true) {
    var audio = new Audio(correctSound)
    audio.play()
    if (attemptBox.classList.contains("card-header-warning")) {
      attemptBox.classList.remove("card-header-warning")
    } else if (attemptBox.classList.contains("card-header-danger")) {
      attemptBox.classList.remove("card-header-danger")
    }
    attemptBox.classList.add("card-header-success")
    attemptBox.textContent = 'Correct'
    console.log("Correct in " + attempts + " attempts")
    listenButton.disabled = true
    speakButton.disabled = true
    currentTime = new Date()
    score = new Object({
      sessionId: SessionId,
      wordId: wordTarget,
      attempt: attempts,
      responseTime: currentTime
    })
    sendScore(score).then((data) => {
      console.log(data)
    })

  }
  // If the recognition is wrong
  else if (comparisonResult == false) {
    var audio = new Audio(incorrectSound)
    audio.play()
    newAttempt = parseInt(attempts) + 1
    // console.log(attempts)
    attemptBox.classList.remove("card-header-warning")
    attemptBox.classList.add("card-header-danger")
    if (attempts == 3) {
      listenButton.disabled = true
      speakButton.disabled = true
    }
    attemptBox.setAttribute("value", newAttempt)
  }

}

timesUpModal = () => {
  $('#timesUpModal').modal('show')
  console.log("Modal Triggered");
}
playTickSound = ()=>{
  tickSound = '../../../assets/audio/others/timer-with-ding.mp3'
  var tickSound = new Audio(tickSound)
  tickSound.play()
}
mainModuleRedirection = () => {
  window.location = "/";
}

window.onload = function (event) {
  setTimeout(playTickSound,275000)
  setTimeout(timesUpModal, 300000)
  setTimeout(mainModuleRedirection, 300500)
};


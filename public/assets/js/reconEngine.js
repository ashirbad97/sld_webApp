var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var synth = window.speechSynthesis;
var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
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
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
var displayArea = document.querySelector('#display-area');
var accuracyHolder = document.querySelector('#accuracy-holder');
var listenBtn = document.querySelector('#listen-button');
var speakBtn = document.querySelector('#speak-button');
// var speakBtn = document.querySelector('button');

speak = function() {
  recognition.start();
  console.log('Ready to receive a speech command.');
}

listen = function(){
  if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
  }
  var utterThis = new SpeechSynthesisUtterance("DOG");
  utterThis.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
  }
  utterThis.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
  }
  var voices = []
  voices = synth.getVoices()
  // console.log(voices)
  utterThis.voice = voices[9] //Hindi is voices[9]
  utterThis.pitch = 1;
  utterThis.rate = 1;
  console.log(utterThis)
  synth.speak(utterThis);
}


recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var color = event.results[0][0].transcript.toUpperCase();
  diagnostic.textContent = 'Result received: ' + color + '.';
  displayArea.textContent = color;
  confidenceValue = (event.results[0][0].confidence)*100
  accuracyHolder.textContent = (confidenceValue).toFixed(2) + '%';
  console.log('Confidence: ' + event.results[0][0].confidence);
  console.log(color)
  if(color=='DOG'){
    console.log("showing succes alert")
    $("#success-alert").modal()
  }else{
    $("#failure-alert").modal()
  }
  
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "Incorrect.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

listenBtn.addEventListener('click', listen);
speakBtn.addEventListener('click',speak)
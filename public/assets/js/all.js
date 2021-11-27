if(document.getElementById('allModulesListed')!=null){
    //Finds the current level of the patient which is embedded in the document
    currentLevel = document.getElementById('allModulesListed').getAttribute('value')
    for(i=currentLevel;i>=1;i--){
        button = document.getElementById('level'+i)
        button.disabled = false 
    }
}

if(document.getElementById('loginPage')!=null){

    var checkBrowser = ()=>{
        if(window.navigator.vendor != "Google Inc."){
            // Show a Modal
            $('#browserCheckModal').modal('show')
            console.log(window.navigator.vendor)
            console.log("Modal Triggered")
        }
    }

}

if(document.getElementById('instructionModal')!=null){
    console.log("In HomePage")
    var popInstructions = ()=>{
            $('#instructionModal').modal('show')
            console.log("Modal Triggered")
    }

}

if(document.getElementById('wordsHolderPage')!=null){
    counter = 0 
    wordCount = document.querySelectorAll(".card-body")
    console.log("No of words in sub-module is ",wordCount.length)
    listenCounter = (value)=>{
        value.disabled = true
        counter += 1
        if (counter == wordCount.length){
            speakButton = document.querySelectorAll(".speakButton")
            speakButton.forEach(element => {
                element.disabled = false
            });
        } 
    }
    window.onbeforeunload = function(){
        return 'Are you sure you want to leave?';
      };
}


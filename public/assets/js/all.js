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


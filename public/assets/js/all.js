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
            $('wrongBrowserModal').show()
            console.log("Modal TRiggered")
        }
    }

}
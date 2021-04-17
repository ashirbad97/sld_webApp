// This is a Google Form Script to keep a backup.
// This script takes the response from the form and sends it to the server for storing the patient details

//Enter Form unique Id from the URL
formId = "1dCAGjYmIpA1byqaLL-SOqHbokq0NX66uLFsf-H5j_uY"
patientData = {}
function sendData() {
  
  //Get all the reponses which were ever submitted to the Form using .getResponses()
  var formData = FormApp.openById(formId).getResponses()
  //Since we require the latest value we are only concerend with the last index 
  lastIndex = formData.length-1;
  //Get all the individual responses which are present under the latest reponse block
  currentResponse = formData[lastIndex].getItemResponses()
  // Iterate through all the responses
  for (i=0;i<currentResponse.length;i++){
    // Using the .getResponse() find the value of the response
    Logger.log(currentResponse[i].getResponse())
  }
  
  patientData.id = currentResponse[0].getResponse()
  patientData.name = currentResponse[1].getResponse()
  patientData.age = currentResponse[2].getResponse()
  patientData.gender = currentResponse[3].getResponse()
  patientData.schoolStandard = currentResponse[4].getResponse()
  patientData.interventionDate = currentResponse[5].getResponse()
  patientData.gladScore = currentResponse[6].getResponse()
  patientData.ctopp2Score = currentResponse[7].getResponse()
  patientData.wrat5Score = currentResponse[8].getResponse()
  patientData.fmriFindings = currentResponse[9].getResponse()
  patientData.additionalInfo = currentResponse[10].getResponse()

  //Logger.log(patientData.name)
  var options = {
  'method' : 'post',
  'contentType': 'application/json',
  // Convert the JavaScript object to a JSON string.
  'payload' : JSON.stringify(patientData)
};
var httpResponse = UrlFetchApp.fetch('https://7716f6b3-6e0b-4f11-bdd9-fd3b4f090c86.mock.pstmn.io', options);
Logger.log(httpResponse)
}


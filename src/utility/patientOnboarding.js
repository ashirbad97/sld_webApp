//Enter Form unique Id from the URL
formId = "1dCAGjYmIpA1byqaLL-SOqHbokq0NX66uLFsf-H5j_uY"
//Initialising the patientData object for storing the data into the schema
patientData = {
  scores: {
    glad: '',
    ctopp2: '',
    wrat5: ''
  }
}
//Define the parameters for sending  confirmation email
recipients = "sayoni.datta.rc@gmail.com"
ccrecipients = "samantaray.ashirbad@gmail.com"
subject = "SLD Onboarding Successful for Patient ID : "
body = ""
function sendData() {

  //Get all the reponses which were ever submitted to the Form using .getResponses()
  var formData = FormApp.openById(formId).getResponses()
  //Since we require the latest value we are only concerend with the last index 
  lastIndex = formData.length - 1;
  //Get all the individual responses which are present under the latest reponse block
  currentResponse = formData[lastIndex].getItemResponses()
  // Iterate through all the responses
  for (i = 0; i < currentResponse.length; i++) {
    // Using the .getResponse() find the value of the response
    Logger.log(currentResponse[i].getResponse())
  }

  patientData.patientId = currentResponse[0].getResponse()
  patientData.name = currentResponse[1].getResponse()
  patientData.age = currentResponse[2].getResponse()
  patientData.gender = currentResponse[3].getResponse()
  patientData.schoolStandard = currentResponse[4].getResponse()
  patientData.interventionDate = currentResponse[5].getResponse()
  patientData.scores.glad = currentResponse[6].getResponse()
  patientData.scores.ctopp2 = currentResponse[7].getResponse()
  patientData.scores.wrat5 = currentResponse[8].getResponse()
  patientData.fmriFindings = currentResponse[9].getResponse()
  patientData.additionalData = currentResponse[10].getResponse()

  //Logger.log(patientData.name)
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload': JSON.stringify(patientData)
  };
  var credentials = UrlFetchApp.fetch('http://65.21.110.140/addPatientFormData', options);
  credentials = JSON.parse(credentials)
  Logger.log(credentials.patientId)
  sendEmailConfirmation(credentials)
}
function sendEmailConfirmation(credentials) {
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining email quota: " + emailQuotaRemaining);
  subject += credentials.patientId
  body += "You have successfully added a patient named : "+patientData.name+" with Patient ID and "+"Username : "+credentials.patientId+"<br> Password: "+credentials.password+
  "<br> <br>"+"You have submitted the following details : "+"<br> Name : "+patientData.name+"<br> Age : "+patientData.age+"<br> Gender : "+patientData.gender+"<br> School Standard : "+patientData.schoolStandard+"<br> Intervention Date : "+patientData.interventionDate+"<br> GLAD Scores : "+patientData.scores.glad+"<br> CTOPP2 Scores : "+patientData.scores.ctopp2+"<br> WRAT5 Scores : "+patientData.scores.wrat5+"<br> FMRI Findings : "+patientData.fmriFindings+"<br> Additional Data : "+patientData.additionalData+"<br> Remaining Daily Notification Limit is : "+emailQuotaRemaining+"<br> <br>Best Regards, <br> SLD_Web_App"
  Logger.log("Subject is : "+ subject)
  Logger.log("Body is : "+ body)
  
  MailApp.sendEmail({
    to: recipients,
    cc: ccrecipients,
    subject: subject,
    htmlBody: body
  })
}


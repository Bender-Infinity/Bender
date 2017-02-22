 

 var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.onspeechstart = function() {
    console.log('detecting speech')
  }
  recognition.onresult = function(event) { 
    var input = event.results[0][0].transcript
    console.log('input: ', input) 
    var formField = document.getElementById("m")
    formField.value = input;
  } 

  recognition.onsoundend = function() { 
    console.log('speech detection ended')
  };
  recognition.start();


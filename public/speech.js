
var socket = io();

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var final_span = '';
var interim_span = '';

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = function(event) {
    var time = new Date();
    time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    recognizing = true;

    var ul = document.getElementById('messages');
      var li;
      li = document.createElement('LI');
      li.className = ('chatConsole');
      li.innerHTML = socket.nsp + ' activated Speech to Text chat.' + '\n' + time;
      ul.appendChild(li);
      li.scrollIntoView();
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      console.log('no speech')
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      console.log('no mic')
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        console.log('info blocked')
      } else {
        console.log('info denied')
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    var time = new Date();
    time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    var ul = document.getElementById('messages');
      var li;
      li = document.createElement('LI');
      li.className = ('chatConsole')
      li.innerHTML = socket.nsp + ' deactivated Speech to Text chat ' + '\n' + time;
      ul.appendChild(li);
      li.scrollIntoView();
    recognizing = false;
  };

  recognition.onresult = function(event) {
    var time = new Date();
    time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    var interim_transcript = '';
    if (typeof(event.results) == 'undefined') {
      recognition.onend = null;
      recognition.stop();
      upgrade();
      return;
    }
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript && final_transcript !== "") {
      var outgoing = final_transcript
      final_transcript = " ";
      socket.emit('voice chat', outgoing)
    }
  };
  socket.on('speech chat message from server', function (msg) {
      var time = new Date();
      time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
      console.log('chatting in socket');
      var ul = document.getElementById('messages');
      var input = document.getElementById('m');

      li = document.createElement('LI');
      li.innerHTML = socket.nsp + ' says: ' + msg + '\n' + time;
      ul.appendChild(li);
      li.scrollIntoView();
  })
}

function upgrade() {
  console.log('speech to text not supported, need upgrade')
}

var two_line = /\n\n/g;
var one_line = /\n/g;

function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


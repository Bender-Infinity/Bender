// import io from './socket.io.js'

var socket = io();

//****************************** Speech recognition ******************
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
    console.log('speech in client')
    var time = new Date();
    time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    console.log('speech recognition starting ' + time)
    recognizing = true;
    // showInfo('info_speak_now');
    var ul = document.getElementById('messages');
      var li;
      li = document.createElement('LI');
      li.className = ('chatConsole');
      li.innerHTML = socket.nsp + ' activated Speech to Text chat.' + '\n' + time;
      ul.appendChild(li);
      li.scrollIntoView();
      //add socket emit 
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      console.log('no speech')
      // showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      console.log('no mic')
      // showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        console.log('info blocked')
        // showInfo('info_blocked');
      } else {
        console.log('info denied')
        // showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    var time = new Date();
    time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
    console.log('speech recognition ending ' + time)
    var ul = document.getElementById('messages');
      var li;
      li = document.createElement('LI');
      li.className = ('chatConsole')
      li.innerHTML = socket.nsp + ' deactivated Speech to Text chat ' + '\n' + time;
      ul.appendChild(li);
      li.scrollIntoView();
    recognizing = false;
    // if (ignore_onend) {
    //   return;
    // }
    // if (!final_transcript) {
    //   // showInfo('info_start');
    //   return;
    // }
    // if (window.getSelection) {

    //   console.log('window getSelection: ',window.getSelection)
    //   window.getSelection().removeAllRanges();
    //   console.log('remove ranges:', window.getSelection().removeAllRanges())
    //   var range = document.createRange();
    //   range.selectNode(document.getElementById('final_span'));
    //   window.getSelection().addRange(range);
    // }
    // if (create_email) {
    //   create_email = false;
    //   createEmail();
    // }
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
    // final_span.innerHTML = linebreak(final_transcript);
    // interim_span.innerHTML = linebreak(interim_transcript);
    // if (final_transcript || interim_transcript && final_transcript !== "") {
      console.log('speech chat:', final_transcript );
      // var ul = document.getElementById('messages');
      // var li;
      // li = document.createElement('LI');
      // li.innerHTML = socket.nsp + ' says: ' + final_transcript + '\n' + time;
      // ul.appendChild(li);
      // li.scrollIntoView();
      //$('#messages').append($('<li>').text(socket.id + ' says: ' + final_transcript + '\n' + time));
      socket.emit('chat message', final_transcript)
      final_transcript = " ";
    // }
  };
  // socket.on('speech chat message from server', function (msg) {
  //   console.log('voice chat messaged received from server', msg)
  //     var time = new Date();
  //     time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
  //     console.log('chatting in socket');
  //     var ul = document.getElementById('messages');
  //     var input = document.getElementById('m');

  //     li = document.createElement('LI');
  //     console.log('IS LI DEFINED', li)
  //     li.innerHTML = socket.nsp + ' says: ' + msg + '\n' + time;
  //     ul.appendChild(li);
  //     li.scrollIntoView();
  //     // if(ul.offsetHeight >= div.offsetHeight){
  //     //     ul.style.height = div.offsetHeight + "px";
  //     //   }
  //     //$('#messages').append($('<li>').text(socket.nsp + ' says: ' + msg));
  //     console.log('message to append: ', msg)
  // })

}

export default recognition

function upgrade() {
  console.log('speech to text not supported, need upgrade')
  // showInfo('info_upgrade');
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

// function createEmail() {
//   var n = final_transcript.indexOf('\n');
//   if (n < 0 || n >= 80) {
//     n = 40 + final_transcript.substring(40).indexOf(' ');
//   }
//   var subject = encodeURI(final_transcript.substring(0, n));
//   var body = encodeURI(final_transcript.substring(n + 1));
//   window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
// }

// function copyButton() {
//   if (recognizing) {
//     recognizing = false;
//     recognition.stop();
//   }
//   copy_button.style.display = 'none';
//   copy_info.style.display = 'inline-block';
//   showInfo('');
// }

// function emailButton() {
//   if (recognizing) {
//     create_email = true;
//     recognizing = false;
//     recognition.stop();
//   } else {
//     createEmail();
//   }
//   email_button.style.display = 'none';
//   email_info.style.display = 'inline-block';
//   showInfo('');
// }

// function startButton(event) {
//   if (recognizing) {
//     recognition.stop();
//     return;
//   }
//   final_transcript = '';
//   recognition.lang = select_dialect.value;
//   recognition.start();
//   ignore_onend = false;
//   final_span.innerHTML = '';
//   interim_span.innerHTML = '';
//   start_img.src = '/intl/en/chrome/assets/common/images/content/mic-slash.gif';
//   showInfo('info_allow');
//   showButtons('none');
//   start_timestamp = event.timeStamp;
// }

// function showInfo(s) {
//   if (s) {
//     for (var child = info.firstChild; child; child = child.nextSibling) {
//       if (child.style) {
//         child.style.display = child.id == s ? 'inline' : 'none';
//       }
//     }
//     info.style.visibility = 'visible';
//   } else {
//     info.style.visibility = 'hidden';
//   }
// }

// var current_style;
// function showButtons(style) {
//   if (style == current_style) {
//     return;
//   }
//   current_style = style;
//   copy_button.style.display = style;
//   email_button.style.display = style;
//   copy_info.style.display = 'none';
//   email_info.style.display = 'none';
// }

// recognition.start();



//*************************DISPLAY CLOCK ************************
// function startTime() {
//   var time = new Date();
//     time = Date().substring(15, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second:'numeric', hour12: true });

//     document.getElementById('clock').innerHTML = time
//       var t = setTimeout(startTime, 500);
// }

// function checkTime(i) {
//     if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
//     return i;
// }

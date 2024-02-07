var timer;
var startTime;
var running = false;
var paused = false; // Variable to track if timer is paused
var lapNumber = 1;

function startStop() {
    if (paused) {
      startTime += new Date().getTime() - paused; // Adjust start time based on the time paused
      paused = false; // Reset pause flag
      timer = setInterval(updateDisplay, 10);
      document.getElementById('startStop').innerHTML = 'Stop';
      running = true; // Update running flag to true
      return;
    }
  
    if (running) {
      clearInterval(timer);
      document.getElementById('startStop').innerHTML = 'Start';
    } else {
      startTime = new Date().getTime() - (lapNumber > 1 ? lapNumber - 1 : 0) * 1000;
      timer = setInterval(updateDisplay, 10);
      document.getElementById('startStop').innerHTML = 'Stop';
      running = true; // Update running flag to true
    }
  }
  
function pause() {
    if (running) {
      clearInterval(timer);
      paused = new Date().getTime(); // Save the current time as pause time
      document.getElementById('startStop').innerHTML = 'Resume'; // Change button text to 'Resume'
      running = false; // Update running flag to false
    }
  }
  

function lap() {
  if (!running) return;
  var currentTime = new Date().getTime();
  var lapTime = currentTime - startTime;
  var formattedTime = formatTime(lapTime);
  var lapText = 'Lap ' + lapNumber + ': ' + formattedTime;
  var lapItem = document.createElement('li');
  lapItem.appendChild(document.createTextNode(lapText));
  document.getElementById('laps').appendChild(lapItem);
  lapNumber++;
}

function reset() {
  clearInterval(timer);
  document.getElementById('display').innerHTML = '00:00:00';
  document.getElementById('laps').innerHTML = '';
  document.getElementById('startStop').innerHTML = 'Start';
  running = false;
  paused = false; // Reset paused flag
  lapNumber = 1;
}

function updateDisplay() {
  var currentTime = new Date().getTime();
  var elapsedTime = currentTime - startTime;
  var formattedTime = formatTime(elapsedTime);
  document.getElementById('display').innerHTML = formattedTime;
}

function formatTime(time) {
  var minutes = Math.floor(time / (60 * 1000));
  var seconds = Math.floor((time % (60 * 1000)) / 1000);
  var milliseconds = Math.floor((time % 1000) / 10);
  return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2) + ':' + ('0' + milliseconds).slice(-2);
}

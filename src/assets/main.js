var answer  = document.getElementById('answer'),
    attempt = document.getElementById('attempt'),
    message = document.getElementById('message'),
    results = document.getElementById('results');

function guess() {
    var input = document.getElementById('user-guess');

    if (!answer.value && !attempt.value) {
      setHiddenFields();
    }

    if (validateInput(input.value)) {
      attempt.value = parseInt(attempt.value) + 1;
    } else {
      return false;
    }

    if (getResults(input.value)) {
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
    } else {
      if (parseInt(attempt.value) >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
      } else {
        setMessage('Incorrect, try again.');
      }
    }
}

function setHiddenFields() {
  var randomNumber = Math.floor(Math.random() * 10000);
  var randomNumberStr = randomNumber.toString();

  // add zeros in front of randomNumberStr if its length is less than 4
  while (randomNumberStr.length < 4) {
    randomNumberStr = '0' + randomNumberStr;
  }

  console.log(randomNumberStr);
  // Set hidden input field answer to a random whole number between 0 and 9999
  answer.value = randomNumberStr;
  // Set hiddne input attempt's value to zero
  attempt.value = '0';
}

function setMessage(msg) {
  message.innerHTML = msg;
}

function validateInput(input) {
  if (input.length == 4) {
    return true;
  } else {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
}

function getResults(guess) {
  var result = '<div class="row"><span class="col-md-6">' + guess + '</span><div class="col-md-6">';
  var correctGuesses = 0;

  for (var i = 0; i < guess.length; i++) {
    if (guess[i] === answer.value[i]) {
      result += '<span class="glyphicon glyphicon-ok"></span>';
      correctGuesses++;
    } else if (answer.value.indexOf(guess[i]) != -1) {
      result += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      result += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }

  result += '</div></div>';
  results.innerHTML += result;
  return correctGuesses == 4;
}

var code = document.getElementById('code');

function showAnswer(win) {
  code.innerHTML = answer.value;

  if (win) {
    code.className += ' success';
  } else {
    code.className += ' failure';
  }
}

var guessingDiv = document.getElementById('guessing-div'),
    replayDiv   = document.getElementById('replay-div');

function showReplay() {
  guessingDiv.setAttribute('style', 'display: none');
  replayDiv.setAttribute('style', 'display: block');
}

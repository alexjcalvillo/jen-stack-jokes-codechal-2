$(document).ready(onReady);

const joke = {
  whoseJoke: null,
  jokeQuestion: null,
  punchLine: null,
};

function onReady() {
  $('#addJokeButton').on('click', captureJoke);

  getJokesList();
}

// capture inputs and create obj to be POSTED to server
function captureJoke() {
  joke.whoseJoke = $('#whoseJokeIn').val();
  joke.jokeQuestion = $('#questionIn').val();
  joke.punchLine = $('#punchlineIn').val();
  console.log(joke);
  postJoke();
}
//send jokes to the server
function postJoke() {
  $.ajax({
    type: 'POST',
    url: '/api/joker',
    data: joke,
  })
    .then((response) => {
      console.log('POSTED', response);
      getJokesList();
    })
    .catch((err) => {
      console.log(err);
      alert('Something went horribly wrong.');
    });
}

// get jokes from server
function getJokesList() {
  $.ajax({
    type: 'GET',
    url: '/api/joker',
  }).then((response) => {
    console.log('GOT IT', response);
    render(response);
  });
}

//render to the DOM our Jokes List
function render(jokesList) {
  console.log(jokesList[0].whoseJoke);
  // empty and append our jokes list
  $('#outputDiv').empty();

  // loop through array and add to screen as a list?
  for (let i = 0; i < jokesList.length; i++) {
    $('#outputDiv').append(`
    <div style="margin-left: 25px;">
        <h3>${jokesList[i].whoseJoke}</h3>
        <ul>
            <li>${jokesList[i].jokeQuestion}</li>
            <li>${jokesList[i].punchLine}</li>
        </ul>
    <div>
    `);
  }
}

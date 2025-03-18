import './index.css';
import { fetchData } from './fetch.js';

// PAGE LOAD
// clear localstorage
window.addEventListener('load', () => {
  clearLocalStorage();
});

// USER CREATION
const createUser = document.querySelector('.submit_user');
const successOverlay = document.getElementById("successOverlay");
const successPopup = document.getElementById("successPopup");
const closeSuccessBtn = document.getElementById("closeSuccess");

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Creating a new account');

  const url = 'http://localhost:3000/api/users';

  // get form and check if valid
  const form = document.querySelector('.create_user');
  if (!form.checkValidity()) {
    // If the form is not valid, show the validation messages
    form.reportValidity();
    return; // Exit function if form is not valid
  }

  // user data
  const username = document.querySelector('input[name=username]').value;
  const password = document.querySelector('input[name=password]').value;
  const email = document.querySelector('input[name=email]').value;

  
  const data = {
    username: username,
    password: password,
    email: email
  };

  console.log(data)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };
  


  try { 
    const responseData = await fetchData(url, options);
    console.log(responseData);

    // Check if registration was successful
    if (responseData.message === 'new user created') {
      successPopup.style.display = "block";
      successOverlay.style.display = "block";
    } else {
      // Display any other response messages as alerts
      alert("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    // Handle error if the request fails
    alert('An error occurred. Please try again later.');
  }}

);// Close success entry popup
closeSuccessBtn.addEventListener("click", function () {
  successPopup.style.display = "none";
  successOverlay.style.display = "none";
});

// LOGIN ja TOKEN
const loginUser = document.querySelector('.loginuser');
loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const url = 'http://localhost:3000/api/auth/login';

  // get form and it's values
  const form = document.querySelector('.login_user');
  const username = form.querySelector('input[name=username]').value;
  const password = form.querySelector('input[name=password]').value;

  // insert values into data
  const data = {
    username: username,
    password: password,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const responseData = await fetchData(url, options);
    console.log(responseData);
    
    if (responseData.token === undefined) {
      alert('Username or password is incorrect');
    } else {
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user_id", responseData.user.user_id);
      window.location.href = 'home.html';
      logResponse('loginResponse', `localStorage set with token value: ${responseData.token}`);
    }
  } catch (error) {
    console.error(error);
    // Handle error if the request fails
    alert('An error occurred. Please try again later.');
  }
});


// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector('.loginuser');
meRequest.addEventListener('click', async () => {
  console.log('Testing token and retrieving the user info');

  const url = 'http://localhost:3000/api/auth/me';
  const myToken = localStorage.getItem('token');
  console.log(myToken)

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + myToken,
    },
  };

  console.log(options)
  fetchData(url, options).then((data) => {
    console.log(data);
    logResponse('meResponse', `Authorized user info: ${JSON.stringify(data)}`);
  });
});


// Haetaan nappi josta tyhjennetään localStorage
const clear = document.querySelector('#clearButton');
clear.addEventListener('click', clearLocalStorage);

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  const element = document.getElementById(codeblock);
  if (element) {
    element.innerText = text;
  } else {
    console.log(`Element with ID '${codeblock}' not found.`);
  }
}

// Apufunktio, Tyhjennä local storage
function clearLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  logResponse('clearResponse', 'localStorage cleared!');
};



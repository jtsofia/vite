import './home.css';
import { fetchData } from './fetch.js';

// Logout 
const logout = document.querySelector('.activelogout');

const handleLogout = function(evt) {
  evt.preventDefault();
  window.location.href = 'index.html';
};

logout.addEventListener('click', handleLogout);


// Get username
document.addEventListener("DOMContentLoaded", showUserName);

async function showUserName() {
  const url = "http://localhost:3000/api/auth/me";
  let token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    console.log(data.user.username);
    document.getElementById("username").innerHTML = data.user.username;
  });
}

// GO TO ENTRIES
const pastBtn = document.querySelector('.past');

const goToPastEntries = function(evt) {
  evt.preventDefault();
  window.location.href = 'entries.html';
};

pastBtn.addEventListener('click', goToPastEntries);

// NEW DIARY ENTRY
// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const url = 'http://localhost:3000/api/entries';

const createEntry = document.querySelector('.createEntry');
createEntry.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Lets create a new diary entry');

  // get form and check validity
  const form = document.querySelector('.entry_form');
  if (!createEntry.checkValidity()){
    // Input didn't pass validation
    createEntry.reportValidity()
    return;
  // Check if user has changed input in dropdown menu from the placeholder
  } else {
    // Form passed all validation continue to send request
    gatherNewEntryData();
  }
});

// Function to gather data from the form
async function gatherNewEntryData() {
  // Get form values
  const user_id = localStorage.getItem('user_id');
  const entry_date = document.getElementById("entry_date").value;
  const meal = document.getElementById("meal").value;
  const calories = document.getElementById("calories").value;
  const foodname = document.getElementById("foodname").value;
  const notes = document.getElementById("notes").value;

  // Get token from localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token not found in local storage");
    return;
  }

  // Insert entry form values into data
  const newEntrydata = {
    user_id: user_id,
    entry_date: entry_date,
    meal: meal,
    calories: calories,
    foodname: foodname,
    notes: notes,
  };
  
  console.log(newEntrydata)

  // Define POST request options
  const options = {
    method: 'POST', // Method is POST
    headers: {
      'Content-Type': 'application/json', // Send data in JSON format
      'Authorization': 'Bearer ' + token, // Include authorization token
    },
    body: JSON.stringify(newEntrydata) // Convert data to JSON format and send it
  };
  
  // Send POST request
  postNewEntry(options);
};

// Function to send POST request
async function postNewEntry(options) {
  // Define POST request and send it
  postData('http://localhost:3000/api/entries', options) 
    .then(data => {
      console.log('Response data:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};


// Function to send POST request using fetch
async function postData(url, options = {}) {
  // Define request settings
  const response = await fetch(url, options);
  console.log(response)
  
  // Return response in JSON format
  return response.json();
}

// Popups
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const openPopupBtn = document.querySelector('.new');
const closePopupBtn = document.getElementById('closePopup');
const createEntryBtn = document.querySelector('.createEntry');

openPopupBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.style.display = 'block';
  overlay.style.display = 'block';
});

closePopupBtn.addEventListener('click', function() {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

createEntryBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.style.display = 'none';
  overlay.style.display = 'none';
});
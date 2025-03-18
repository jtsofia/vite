import './style.css'


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="logo.jpeg" class="logo" alt="logo" />
    </a>
    </a>
    <h1>Päiväkirja</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Sign in or up
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

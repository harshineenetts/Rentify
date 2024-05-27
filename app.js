const content = document.getElementById('content');
const postPropertyLink = document.getElementById('postPropertyLink');

function showRegister() {
  content.innerHTML = `
    <form id="registerForm">
      <h2>Register</h2>
      <input type="text" id="firstName" placeholder="First Name" required>
      <input type="text" id="lastName" placeholder="Last Name" required>
      <input type="email" id="email" placeholder="Email" required>
      <input type="text" id="phoneNumber" placeholder="Phone Number" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  `;

  document.getElementById('registerForm').onsubmit = async function(event) {
    event.preventDefault();
    const data = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      password: document.getElementById('password').value
    };

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      alert('Registration successful');
      showLogin();
    } else {
      alert('Registration failed');
    }
  };
}

function showLogin() {
  content.innerHTML = `
    <form id="loginForm">
      <h2>Login</h2>
      <input type="email" id="loginEmail" placeholder="Email" required>
      <input type="password" id="loginPassword" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `;

  document.getElementById('loginForm').onsubmit = async function(event) {
    event.preventDefault();
    const data = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value
    };

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const result = await res.json();
      localStorage.setItem('token', result.token);
      postPropertyLink.style.display = 'inline';
      showProperties();
    } else {
      alert('Login failed');
    }
  };
}

function showProperties() {
  content.innerHTML = '<h2>Properties</h2>';

  fetch('/api/properties')
    .then(res => res.json())
    .then(properties => {
      properties.forEach(property => {
        const div = document.createElement('div');
        div.className = 'property';
        div.innerHTML = `
          <h3>${property.name}</h3>
          <p>${property.description}</p>
          <button onclick="alert('Contact: ${property.contact}')">I'm Interested</button>
        `;
        content.appendChild(div);
      });
    });
}

function showPostProperty() {
  content.innerHTML = `
    <form id="propertyForm">
      <h2>Post Property</h2>
      <input type="text" id="propertyName" placeholder="Property Name" required>
      <textarea id="propertyDescription" placeholder="Description" required></textarea>
      <button type="submit">Post Property</button>
    </form>
  `;

  document.getElementById('propertyForm').onsubmit = async function(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      showLogin();
      return;
    }

    const data = {
      name: document.getElementById('propertyName').value,
      description: document.getElementById('propertyDescription').value
    };

    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      alert('Property posted successfully');
      showProperties();
    } else {
      alert('Failed to post property');
    }
  };
}

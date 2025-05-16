// auth.js

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const registerMessage = document.getElementById('register-message');
const loginMessage = document.getElementById('login-message');

const API_URL = 'http://localhost:5000'; // Your backend URL

// Register handler
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      registerMessage.style.color = 'green';
      registerMessage.textContent = data.message || 'Registration successful!';
      registerForm.reset();
    } else {
      registerMessage.style.color = 'red';
      registerMessage.textContent = data.message || 'Registration failed.';
    }
  } catch (err) {
    registerMessage.style.color = 'red';
    registerMessage.textContent = 'Error connecting to server.';
  }
});

// Login handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      loginMessage.style.color = 'green';
      loginMessage.textContent = 'Login successful!';

      // Save JWT token to localStorage for future authenticated requests
      localStorage.setItem('token', data.token);

      // Redirect to profile page or elsewhere
      window.location.href = 'profile.html';
    } else {
      loginMessage.style.color = 'red';
      loginMessage.textContent = data.message || 'Login failed.';
    }
  } catch (err) {
    loginMessage.style.color = 'red';
    loginMessage.textContent = 'Error connecting to server.';
  }
});

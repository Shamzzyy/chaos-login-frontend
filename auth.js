// auth.js
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const registerMessage = document.getElementById('register-message');
const loginMessage = document.getElementById('login-message');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Register handler
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const username = document.getElementById('reg-username').value.trim();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (error) {
      registerMessage.style.color = 'red';
      registerMessage.textContent = error.message;
    } else {
      registerMessage.style.color = 'green';
      registerMessage.textContent = 'Registration successful! Check your email to confirm.';
      registerForm.reset();
    }
  } catch (err) {
    registerMessage.style.color = 'red';
    registerMessage.textContent = 'Error connecting to server.';
  }
});

// Login handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      loginMessage.style.color = 'red';
      loginMessage.textContent = error.message;
    } else {
      loginMessage.style.color = 'green';
      loginMessage.textContent = 'Login successful!';

      // Save access token to localStorage
      localStorage.setItem('access_token', data.session.access_token);

      // Redirect to profile page
      window.location.href = 'profile.html';
    }
  } catch (err) {
    loginMessage.style.color = 'red';
    loginMessage.textContent = 'Error connecting to server.';
  }
});

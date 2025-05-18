// public/js/profile.js

import { supabase } from './supabase.js';

const profileInfo = document.getElementById('profile-info');
const logoutBtn = document.getElementById('logout-btn');

// Check for token in localStorage
const token = localStorage.getItem('access_token');

if (!token) {
  window.location.href = 'index.html';
}

// Fetch user profile data
async function getProfile() {
  try {
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Error fetching user data:', error.message);
      profileInfo.innerHTML = `<p>Error: ${error.message}</p>`;
      return;
    }

    if (user) {
      profileInfo.innerHTML = `
        <h2>Profile Information</h2>
        <p><strong>Username:</strong> ${user.user_metadata.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      `;
    }
  } catch (err) {
    profileInfo.innerHTML = `<p>Error: Could not connect to server.</p>`;
    console.error('Error fetching profile:', err);
  }
}

// Logout function
logoutBtn.addEventListener('click', async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
  } catch (err) {
    console.error('Error during logout:', err);
  }

  localStorage.removeItem('access_token');
  window.location.href = 'index.html';
});

getProfile();

// profile.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const profileInfo = document.getElementById('profile-info');
const logoutBtn = document.getElementById('logout-btn');

// Get the current session (user data)
async function getProfile() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    profileInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    return;
  }

  if (user) {
    profileInfo.innerHTML = `
      <h2>Profile Information</h2>
      <p><strong>Username:</strong> ${user.user_metadata.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;
  } else {
    profileInfo.innerHTML = `<p>User not logged in.</p>`;
    window.location.href = 'index.html';
  }
}

// Logout function
logoutBtn.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error);
  }

  window.location.href = 'index.html';
});

getProfile();

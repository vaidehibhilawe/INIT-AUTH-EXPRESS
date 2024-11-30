const API_URL = 'http://localhost:5000/api/auth';

// Login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById('message').textContent = 'Login successful!';
      console.log('Token:', data.token);
    } else {
      document.getElementById('message').textContent = data.message;
    }
  } catch (err) {
    console.error(err);
  }
});

// Signup form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById('message').textContent = 'Signup successful!';
    } else {
      document.getElementById('message').textContent = data.message;
    }
  } catch (err) {
    console.error(err);
  }
});

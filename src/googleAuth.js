// src/googleAuth.js
export function initGoogleSignIn({ clientId, backendUrl }) {
  // Google will call this when the user signs in
  const handleCredentialResponse = async (response) => {
    try {
      const res = await fetch(`${backendUrl}?action=google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Backend error:', data);
        alert(data.error || 'Login failed');
        return;
      }

      // At this point `data.token` is your app‑specific JWT
      console.log('Logged in!', data);
      // 👉 Store the token (e.g. localStorage) and redirect as needed
      localStorage.setItem('myAppJwt', data.token);
      // Example redirect:
      // window.location.href = '/dashboard';
    } catch (err) {
      console.error('Network error', err);
      alert('Could not reach the server');
    }
  };

  // Render the Google button
  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
    // optional: you can set `auto_select: true` to skip the button after first login
  });

  window.google.accounts.id.renderButton(
    document.getElementById('gsi-button'),
    {
      theme: 'outline', // or 'filled_black'
      size: 'large',    // 'medium' | 'large' | 'small'
    }
  );

  // Optional: automatically show the One‑Tap prompt
  // window.google.accounts.id.prompt();
}
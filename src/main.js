// src/main.js
import { createApp } from 'vue';               // or React/Plain JS – adjust as needed
import App from './App.vue';
import { initGoogleSignIn } from './googleAuth';

// ----- Vite‑specific: environment variables -----
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; // set in .env
const BACKEND_URL      = import.meta.env.VITE_BACKEND_URL;      // e.g. https://example.com/api/auth_google.php

createApp(App).mount('#app');

// Initialise Google Sign‑In once the DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  initGoogleSignIn({
    clientId: GOOGLE_CLIENT_ID,
    backendUrl: BACKEND_URL,
  });
});
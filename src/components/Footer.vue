<template>
  <footer class="site-footer">
    <div class="container footer-grid">

      <div class="footer-brand">
        <div class="brand-logo">
          <Logo />
          <span>Travel Atelier</span>
        </div>
        <p class="brand-tagline">Curated journeys for the modern traveler. Let us take you somewhere extraordinary.</p>
      </div>

      <div class="footer-links">
        <h4>Explore</h4>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/bookings">Destinations</RouterLink></li>
          <li><RouterLink to="/bookhere">Book a Trip</RouterLink></li>
          <li><RouterLink to="/about">About Us</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </div>

      <div class="footer-links">
        <h4>Account</h4>
        <ul>
          <li v-if="!isAuthenticated"><RouterLink to="/login">Login</RouterLink></li>
          <li v-if="!isAuthenticated"><RouterLink to="/register">Sign Up</RouterLink></li>
          <li v-if="isAuthenticated"><RouterLink to="/my-bookings">My Bookings</RouterLink></li>
          <li v-if="isAuthenticated"><a href="#" @click.prevent="handleLogout">Logout</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h4>Get in Touch</h4>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          hello@travelatelier.com
        </p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          +1 (800) 555-0199
        </p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          123 Wanderlust Ave, Miami, FL
        </p>
      </div>

    </div>

    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} Travel Atelier. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Logo from './Logo.vue';

const { isAuthenticated, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<style scoped>
.site-footer {
  background-color: var(--yinmn-blue);
  color: rgba(255,255,255,0.85);
  padding: 60px 0 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  padding-bottom: 50px;
}

.footer-brand {
  --logo-primary: white;
  --logo-secondary: var(--yinmn-blue);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.brand-tagline {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.65);
  max-width: 260px;
}

h4 {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--amber);
}

.footer-contact p {
  font-size: 0.95rem;
  margin-bottom: 12px;
  color: rgba(255,255,255,0.65);
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-contact svg {
  flex-shrink: 0;
  opacity: 0.7;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 20px 0;
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>

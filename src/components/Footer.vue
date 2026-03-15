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
        <p>📧 hello@travelatelier.com</p>
        <p>📞 +1 (800) 555-0199</p>
        <p>📍 123 Wanderlust Ave, Miami, FL</p>
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
  margin-bottom: 10px;
  color: rgba(255,255,255,0.65);
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

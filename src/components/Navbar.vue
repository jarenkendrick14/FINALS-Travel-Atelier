<template>
  <header :class="headerClass">
    <div class="container">
      <nav class="navbar">
        <RouterLink to="/" class="logo">
          <Logo />
          <span>Travel Atelier</span>
        </RouterLink>
        <ul class="nav-links">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/bookings">Bookings</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          
          <!-- Conditionally show these links only if logged in -->
          <template v-if="isAuthenticated">
            <li><RouterLink to="/customer-list">Customer List</RouterLink></li>
            <li><RouterLink to="/customer-messages">Customer Messages</RouterLink></li>
          </template>
        </ul>
        <div class="nav-actions">
          <!-- Show Login button if logged out -->
          <RouterLink v-if="!isAuthenticated" to="/login" class="btn btn-login">Login</RouterLink>
          <!-- Show Logout button if logged in -->
          <button v-else @click="handleLogout" class="btn btn-logout">Logout</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Logo from './Logo.vue';

const route = useRoute();
const router = useRouter();
const { isAuthenticated, logout } = useAuth();

const headerClass = computed(() => {
  return route.meta.navColor === 'blue' ? 'header-blue' : 'header-yellow';
});

const handleLogout = () => {
  logout();
  router.push('/'); // Redirect to home page after logout
};
</script>

<style scoped>
header {
  padding: 15px 0;
  color: var(--night);
  transition: background-color 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-blue {
  background-color: var(--yinmn-blue);
  color: white;
}

.header-yellow {
  background-color: var(--amber);
}

/* --- NEW CSS RULES FOR THE LOGO --- */
.header-blue .logo {
  --logo-primary: white;
  --logo-secondary: var(--yinmn-blue);
}

.header-yellow .logo {
  --logo-primary: var(--yinmn-blue);
  --logo-secondary: var(--baby-powder);
}
/* ----------------------------------- */

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 25px;
  margin: 0 auto; /* Center the links */
}

.nav-links a {
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  color: inherit;
  position: relative;
  padding-bottom: 5px;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-exact-active::after {
  width: 100%;
}

.nav-actions .btn {
  padding: 8px 20px;
  font-size: 0.9rem;
}

.btn-login {
  background-color: var(--baby-powder);
  color: var(--yinmn-blue);
}

.header-blue .btn-login {
  background-color: var(--amber);
  color: var(--night);
}

.btn-logout {
  background-color: transparent;
  border: 2px solid currentColor;
  color: inherit;
}
</style>
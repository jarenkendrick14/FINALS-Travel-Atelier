<template>
  <header :class="headerClass">
    <div class="container">
      <nav class="navbar">
        <RouterLink to="/" class="logo">
          <Logo />
          <span>Travel Atelier</span>
        </RouterLink>

        <!-- Desktop nav links -->
        <ul class="nav-links">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/bookings">Bookings</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          <template v-if="isAuthenticated">
            <li><RouterLink to="/my-bookings">My Bookings</RouterLink></li>
          </template>
          <template v-if="isAdmin">
            <li><RouterLink to="/customer-list">Customer List</RouterLink></li>
            <li><RouterLink to="/customer-messages">Customer Messages</RouterLink></li>
          </template>
        </ul>

        <div class="nav-actions">
          <RouterLink v-if="!isAuthenticated" to="/login" class="btn btn-login">Login</RouterLink>
          <button v-else @click="handleLogout" class="btn btn-logout">Logout</button>

          <!-- Hamburger button -->
          <button class="hamburger" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Close menu' : 'Open menu'">
            <span :class="{ open: menuOpen }"></span>
            <span :class="{ open: menuOpen }"></span>
            <span :class="{ open: menuOpen }"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile menu -->
      <ul class="mobile-menu" :class="{ open: menuOpen }" @click="menuOpen = false">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/bookings">Bookings</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
        <template v-if="isAuthenticated">
          <li><RouterLink to="/my-bookings">My Bookings</RouterLink></li>
        </template>
        <template v-if="isAdmin">
          <li><RouterLink to="/customer-list">Customer List</RouterLink></li>
          <li><RouterLink to="/customer-messages">Customer Messages</RouterLink></li>
        </template>
        <li v-if="!isAuthenticated"><RouterLink to="/login">Login</RouterLink></li>
        <li v-else><button @click="handleLogout" class="mobile-logout">Logout</button></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import Logo from './Logo.vue';

const route = useRoute();
const router = useRouter();
const { isAuthenticated, isAdmin, logout } = useAuth();
const menuOpen = ref(false);

const headerClass = computed(() => {
  return route.meta.navColor === 'blue' ? 'header-blue' : 'header-yellow';
});

const handleLogout = () => {
  logout();
  menuOpen.value = false;
  router.push('/');
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

.header-blue .logo {
  --logo-primary: white;
  --logo-secondary: var(--yinmn-blue);
}

.header-yellow .logo {
  --logo-primary: var(--yinmn-blue);
  --logo-secondary: var(--baby-powder);
}

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
  margin: 0 auto;
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

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
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

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: currentColor;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger span:nth-child(1).open {
  transform: translateY(8px) rotate(45deg);
}
.hamburger span:nth-child(2).open {
  opacity: 0;
}
.hamburger span:nth-child(3).open {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.mobile-menu.open {
  max-height: 500px;
  padding: 12px 0;
}

.mobile-menu li {
  border-top: 1px solid rgba(0,0,0,0.08);
}

.mobile-menu a,
.mobile-logout {
  display: block;
  padding: 12px 4px;
  font-weight: 500;
  font-size: 1rem;
  color: inherit;
  text-decoration: none;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.mobile-menu a:hover,
.mobile-logout:hover {
  opacity: 0.75;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .nav-actions .btn-login,
  .nav-actions .btn-logout {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}
</style>

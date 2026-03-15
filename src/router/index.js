import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth' // Import the auth composable

import HomeView from '../views/HomeView.vue'
import BookingsView from '../views/BookingsView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import BookHereView from '../views/BookHere.vue'
import CustomerListView from '../views/CustomerListView.vue'
import CustomerMessagesView from '../views/CustomerMessagesView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { navColor: 'blue' } 
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsView,
      meta: { navColor: 'yellow' } 
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { navColor: 'yellow' } 
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: { navColor: 'yellow' } 
    },
    {
      path: '/bookhere',
      name: 'bookhere',
      component: BookHereView,
      meta: { navColor: 'yellow' } 
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: MyBookingsView,
      meta: { navColor: 'yellow', requiresAuth: true }
    },
    {
      path: '/customer-list',
      name: 'customer-list',
      component: CustomerListView,
      meta: { navColor: 'yellow', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/customer-messages',
      name: 'customer-messages',
      component: CustomerMessagesView,
      meta: { navColor: 'yellow', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { navColor: 'yellow' }
    },
    // --- YOU ARE MISSING THIS ROUTE OBJECT ---
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { navColor: 'yellow' }
    }
  ]
})

// Navigation Guard - This runs before every route change.
router.beforeEach((to, from, next) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !isAuthenticated.value) {
    next({ name: 'login' });
  } else if (requiresAdmin && !isAdmin.value) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
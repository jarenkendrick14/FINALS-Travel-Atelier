<template>
  <div class="my-bookings-page">
    <div class="container">
      <h1>My Bookings</h1>

      <div v-if="isLoading" class="spinner-wrapper">
        <div class="spinner"></div>
      </div>

      <div v-else-if="bookings.length === 0" class="empty-state">
        <p>You haven't made any bookings yet.</p>
        <RouterLink to="/bookhere" class="btn">Book a Trip</RouterLink>
      </div>

      <div v-else class="bookings-grid">
        <div v-for="booking in bookings" :key="booking.bookingId" class="booking-card">
          <div class="booking-header">
            <span class="booking-id">{{ booking.bookingId }}</span>
            <span class="booking-date">{{ new Date(booking.bookingDate).toLocaleDateString() }}</span>
          </div>
          <div class="booking-body">
            <p><strong>Hotel:</strong> {{ booking.hotel }}</p>
            <p><strong>Rooms:</strong> {{ booking.rooms }}</p>
            <p><strong>Check-in:</strong> {{ booking.checkin }}</p>
            <p v-if="booking.checkout"><strong>Check-out:</strong> {{ booking.checkout }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const bookings = ref([]);
const isLoading = ref(true);
const { token } = useAuth();

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/my-bookings`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    if (!response.ok) throw new Error('Failed to load bookings.');
    bookings.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.my-bookings-page {
  padding: 60px 0;
  min-height: 80vh;
  background-color: #f4f7f6;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: var(--yinmn-blue);
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #ddd;
  border-top-color: var(--yinmn-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  font-size: 1.2rem;
  color: #777;
}

.empty-state .btn {
  display: inline-block;
  margin-top: 20px;
}

.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.booking-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  overflow: hidden;
}

.booking-header {
  background-color: var(--yinmn-blue);
  color: white;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.booking-id {
  font-weight: 700;
  font-family: monospace;
}

.booking-body {
  padding: 20px;
}

.booking-body p {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
}
</style>

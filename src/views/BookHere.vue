<template>
  <div class="book-here-page">
    <div class="overlay">
      <div class="container booking-layout">
        <!-- Traveler Form -->
        <form class="booking-form" @submit.prevent="submitBooking">
          <h2>Traveler's Information</h2>

          <div class="form-group">
            <label>First Name</label>
            <input v-model="form.firstName" required />
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input v-model="form.lastName" required />
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" v-model="form.email" required />
          </div>

          <div class="form-group">
            <label>Billing Address</label>
            <input v-model="form.address" placeholder="Street, City, Country" required />
          </div>

          <div class="form-group">
            <label>Card Number</label>
            <input v-model="form.cardNumber" maxlength="16" required />
          </div>

          <div class="form-group">
            <label>Expiration Date</label>
            <input type="month" v-model="form.expiry" required />
          </div>

          <div class="form-group">
            <label>Security Code</label>
            <input v-model="form.cvv" maxlength="4" required />
          </div>

          <div class="form-group">
            <label>Preferred Place to Stay</label>
            <input v-model="form.hotel" placeholder="Hotel Name" required />
          </div>

          <div class="form-group">
            <label>Number of Rooms</label>
            <input type="number" v-model="form.rooms" min="1" required />
          </div>

          <div class="form-group">
            <label>Check-in Date</label>
            <input type="date" v-model="form.checkin" :max="form.checkout || undefined" required />
          </div>

          <div class="form-group">
            <label>Check-out Date</label>
            <input type="date" v-model="form.checkout" :min="form.checkin || undefined" required />
          </div>

          <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
          <p v-if="submitted" class="success-message">Booking confirmed! ID: {{ bookingId }}</p>
          <button class="btn" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Book Now' }}
          </button>
        </form>

        <!-- Summary Panel -->
        <div class="summary-panel">
          <h2>Summary</h2>
          <div v-if="submitted">
            <p><strong>Booking ID:</strong> {{ bookingId }}</p>
            <p><strong>Name:</strong> {{ form.firstName }} {{ form.lastName }}</p>
            <p><strong>Email:</strong> {{ form.email }}</p>
            <p><strong>Hotel:</strong> {{ form.hotel }}</p>
            <p><strong>Rooms:</strong> {{ form.rooms }}</p>
            <p><strong>Check-in:</strong> {{ form.checkin }}</p>
            <p><strong>Check-out:</strong> {{ form.checkout }}</p>
          </div>
          <div v-else>
            <p>Fill out the form to see your booking summary.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const { token } = useAuth();
const route = useRoute();
const router = useRouter();

const form = reactive({
  firstName: '', lastName: '', email: '', address: '',
  cardNumber: '', expiry: '', cvv: '',
  hotel: route.query.destination || '', rooms: 1, checkin: '', checkout: ''
});

const submitted = ref(false);
const isSubmitting = ref(false);
const bookingId = ref('');
const errorMsg = ref('');

async function submitBooking() {
  if (!token.value) {
    router.push({ path: '/login', query: { redirect: '/bookhere' } });
    return;
  }
  errorMsg.value = '';
  isSubmitting.value = true;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Booking failed. Please try again.');
    submitted.value = true;
    bookingId.value = data.booking.bookingId;
  } catch (error) {
    errorMsg.value = error.message;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.book-here-page {
  background-image: url('/bg-beach.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 60px 0;
  position: relative;
}

.overlay {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.booking-layout {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.booking-form, .summary-panel {
  flex: 1 1 500px;
}

.booking-form h2, .summary-panel h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--yinmn-blue);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.summary-panel {
  background-color: var(--baby-powder);
  padding: 30px;
  border-radius: 10px;
  border: 2px solid var(--amber);
}

.summary-panel p {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.error-message {
  color: #d9534f;
  font-weight: 500;
  margin-bottom: 12px;
}

.success-message {
  color: #2d7a2d;
  font-weight: 600;
  margin-bottom: 12px;
  background: #e8f5e9;
  padding: 10px 14px;
  border-radius: 8px;
}

input {
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .overlay {
    padding: 20px;
    margin: 0 16px;
  }

  .booking-form, .summary-panel {
    flex: 1 1 100%;
  }

  .booking-form h2, .summary-panel h2 {
    font-size: 1.5rem;
  }
}
</style>

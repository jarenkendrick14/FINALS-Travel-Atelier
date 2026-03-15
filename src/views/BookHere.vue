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
            <input type="date" v-model="form.checkin" required />
          </div>

          <button class="btn" type="submit">Book Now</button>
        </form>

        <!-- Summary Panel -->
        <div class="summary-panel">
          <h2>Summary</h2>
          <div v-if="submitted">
            <p><strong>Name:</strong> {{ form.firstName }} {{ form.lastName }}</p>
            <p><strong>Email:</strong> {{ form.email }}</p>
            <p><strong>Hotel:</strong> {{ form.hotel }}</p>
            <p><strong>Rooms:</strong> {{ form.rooms }}</p>
            <p><strong>Check-in:</strong> {{ form.checkin }}</p>
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
import { useAuth } from '@/composables/useAuth'; // Import useAuth

const { token } = useAuth(); // Get the auth token

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  hotel: '',
  rooms: 1,
  checkin: ''
});

const submitted = ref(false);

async function submitBooking() {
  // Check if token exists
  if (!token.value) {
    alert('You must be logged in to make a booking.');
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // **IMPORTANT**: Include the JWT for authentication
        'Authorization': `Bearer ${token.value}`
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle potential auth errors (e.g., expired token)
      throw new Error(data.message || 'Booking failed. Please try again.');
    }

    // Success!
    submitted.value = true;
    alert('Booking submitted successfully! Confirmation: ' + data.booking.bookingId);
    
    // Optionally reset the form or redirect
    // Object.keys(form).forEach(key => form[key] = ''); 

  } catch (error) {
    alert(error.message);
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
</style>

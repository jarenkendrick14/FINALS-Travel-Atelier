<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Create an Account</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="form.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="form.lastName" required />
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required />
        </div>
        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
        <button type="submit" class="btn">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});
const errorMsg = ref('');
const router = useRouter();
const { setAuth } = useAuth(); // We'll need a way to set the token

const handleRegister = async () => {
  // Add this console.log for debugging
  console.log('Attempting to register with:', form);
  errorMsg.value = '';
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed.');
    }

    // On successful registration, the backend sends a token.
    // We use it to log the user in.
    setAuth(data.token);
    router.push('/'); // Redirect to home

  } catch (error) {
    console.error('Registration Error:', error);
    errorMsg.value = error.message;
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 84px);
  padding: 40px 0;
  background-color: #f4f7f6;
}

.register-container {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  font-size: 2rem;
  color: var(--yinmn-blue);
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.error-message {
  color: #d9534f;
  margin-bottom: 15px;
}

.btn {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
}
</style>
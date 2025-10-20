<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login to Your Account</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" required placeholder="user@example.com" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="password" />
        </div>
        <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
        <button type="submit" class="btn">Login</button>
      </form>
      <p class="signup-link">
        Don't have an account? <RouterLink to="/register">Sign Up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const email = ref('user@example.com');
const password = ref('password');
const errorMsg = ref('');
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  // Add a debug log here as well
  console.log('Attempting to login with:', email.value);
  errorMsg.value = ''; // Reset error message
  try {
    await login({ email: email.value, password: password.value });
    router.push('/'); // Redirect to home page on successful login
  } catch (error) {
    // The error message comes from the backend or the fetch call
    console.error('Login Error:', error);
    errorMsg.value = error.message;
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 84px);
  background-color: #f4f7f6;
}

.login-container {
  width: 100%;
  max-width: 400px;
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

.signup-link {
  margin-top: 20px;
  font-size: 0.9rem;
}
.signup-link a {
  color: var(--yinmn-blue);
  font-weight: 600;
  text-decoration: none;
}
.signup-link a:hover {
  text-decoration: underline;
}
</style>
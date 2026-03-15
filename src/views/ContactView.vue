<template>
  <div class="contact-page">
    <div class="container">
      <div class="form-container">
        <h1>Get in Touch</h1>
        <p class="subtitle">Have a question or feedback? Drop us a line!</p>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">Your Email</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" v-model="form.message" rows="6" required></textarea>
          </div>

          <div v-if="responseMessage" :class="['response-message', responseStatus]">
            {{ responseMessage }}
          </div>

          <button class="btn" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const responseMessage = ref('');
const responseStatus = ref(''); // 'success' or 'error'

const handleSubmit = async () => {
  isSubmitting.value = true;
  responseMessage.value = '';
  responseStatus.value = '';

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact-messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An unknown error occurred.');
    }

    // Handle success
    responseStatus.value = 'success';
    responseMessage.value = data.message;
    // Reset form
    form.name = '';
    form.email = '';
    form.message = '';

  } catch (error) {
    // Handle error
    responseStatus.value = 'error';
    responseMessage.value = error.message;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  padding: 80px 0;
  background-color: #f4f7f6;
  min-height: 80vh;
}

.container {
  max-width: 700px;
}

.form-container {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  font-size: 2.8rem;
  color: var(--yinmn-blue);
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--yinmn-blue);
  box-shadow: 0 0 0 3px rgba(27, 82, 153, 0.2);
}

textarea {
  resize: vertical;
}

.btn {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.response-message {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}
.response-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.response-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 600px) {
  h1 { font-size: 2rem; }
  .form-container { padding: 24px 16px; }
}
</style>
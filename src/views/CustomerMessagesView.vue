<template>
  <div class="list-page">
    <div class="container">
      <h1>Customer Messages</h1>
      <div class="search-bar-wrapper">
        <input type="text" v-model="searchTerm" placeholder="Search by name, email, or message..." class="search-input"/>
      </div>
      <div v-if="isLoading" class="spinner-wrapper"><div class="spinner"></div></div>
      <div v-else-if="filteredMessages.length > 0" class="messages-grid">
        <div v-for="message in filteredMessages" :key="message.id" class="message-card" :class="{ unread: !message.read }">
          <div class="card-top">
            <h3>From: {{ message.name }}</h3>
            <span v-if="!message.read" class="badge-unread">New</span>
          </div>
          <p class="email"><strong>Email:</strong> {{ message.email }}</p>
          <p class="date"><strong>Sent:</strong> {{ new Date(message.dateSent).toLocaleString() }}</p>
          <p class="message-content">{{ message.message }}</p>
          <button v-if="!message.read" class="btn-mark-read" @click="markRead(message)">Mark as Read</button>
        </div>
      </div>
      <div v-else-if="!isLoading" class="no-results">
        <p>No messages found.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuth } from '@/composables/useAuth'; // We need the token to be sure we are logged in

const messages = ref([]);
const searchTerm = ref('');
const isLoading = ref(true);
const errorMsg = ref('');
const { token } = useAuth();

const markRead = async (message) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/messages/${message.id}/read`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    message.read = true;
  } catch (error) {
    console.error('Failed to mark message as read:', error);
  }
};

onMounted(async () => {
  if (!token.value) {
    // This is a fallback, the router guard should prevent this page from loading anyway
    errorMsg.value = "You must be logged in to view messages.";
    isLoading.value = false;
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    if (!response.ok) {
      throw new Error('Failed to load messages from the server.');
    }
    messages.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    errorMsg.value = error.message;
  } finally {
    isLoading.value = false;
  }
});

const filteredMessages = computed(() => {
  if (!searchTerm.value) {
    return messages.value;
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  return messages.value.filter(message =>
    message.name.toLowerCase().includes(lowerCaseSearch) ||
    message.email.toLowerCase().includes(lowerCaseSearch) ||
    message.message.toLowerCase().includes(lowerCaseSearch)
  );
});
</script>

<style scoped>
.list-page {
  padding: 60px 0;
  background-color: #f4f7f6;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: var(--yinmn-blue);
}

.search-bar-wrapper {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.messages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.message-card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  border-left: 5px solid var(--amber);
}

.message-card.unread {
  border-left-color: var(--yinmn-blue);
  background-color: #f0f5ff;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.badge-unread {
  background-color: var(--yinmn-blue);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 50px;
}

.btn-mark-read {
  margin-top: 14px;
  background: none;
  border: 1px solid var(--yinmn-blue);
  color: var(--yinmn-blue);
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
}

.btn-mark-read:hover {
  background-color: var(--yinmn-blue);
  color: white;
}

.message-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--night);
}

.message-card .email, .message-card .date {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
}

.message-card .message-content {
  margin-top: 15px;
  line-height: 1.6;
}

.no-results {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  color: #777;
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
</style>
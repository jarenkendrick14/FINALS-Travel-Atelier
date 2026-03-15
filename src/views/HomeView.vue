<template>
  <div class="hero-wrapper">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="container">
        <p class="hero-eyebrow">Travel Atelier</p>
        <h1>Book a trip with Travel Atelier</h1>
        <form @submit.prevent="handleSearch" class="search-container">
          <div class="search-bar">
            <span class="search-icon">⌕</span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search for destinations like 'Paris', 'Japan'..."
            >
          </div>
          <p class="search-subtext">Search trips, bookings, countries you want to visit</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/bookings', query: { search: searchQuery.value.trim() } });
  }
};
</script>

<style scoped>
.hero-wrapper {
  background-image: url('/bg-plane.jpg');
  background-size: cover;
  background-position: center;
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(27,82,153,0.55) 0%, rgba(27,82,153,0.75) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
}

.hero-eyebrow {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 16px;
}

h1 {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  line-height: 1.15;
}

.search-bar {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  border-radius: 50px;
  padding: 5px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-bar:focus-within {
  transform: scale(1.02);
  box-shadow: 0 6px 30px rgba(0,0,0,0.3);
}

.search-bar input {
  width: 100%;
  padding: 12px 20px 12px 50px;
  border-radius: 50px;
  border: none;
  background-color: transparent;
  color: var(--night);
  font-size: 1.1rem;
  box-sizing: border-box;
}

.search-bar input::placeholder {
  color: #999;
}

.search-bar input:focus {
  outline: none;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #999;
}

.search-subtext {
  margin-top: 16px;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.75);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
}
</style>

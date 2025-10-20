<template>
  <div class="hero-wrapper">
    <div class="hero-content">
      <div class="container">
        <h1>Book a trip with Travel Atelier</h1>
        
        <!-- The search container is now a form -->
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
  // Only navigate if the user has typed something
  if (searchQuery.value.trim()) {
    router.push({ 
      path: '/bookings', 
      query: { search: searchQuery.value.trim() } 
    });
  }
};
</script>

<style scoped>
.hero-wrapper {
  background-image: url('/bg-plane.jpg');
  background-size: cover;
  background-position: center;
  height: calc(100vh - 84px); 
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  color: white;
}

.hero-content {
  background-color: var(--yinmn-blue);
  padding: 60px 0;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

/* No style changes needed for .search-container, just changed the tag to <form> */

.search-bar {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  background-color: var(--amber);
  border-radius: 50px;
  padding: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-bar:focus-within {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(242, 187, 5, 0.7);
}

.search-bar input {
  width: 100%;
  padding: 10px 20px 10px 50px; 
  border-radius: 50px;
  border: none;
  background-color: var(--amber);
  color: var(--night);
  font-size: 1.1rem;
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
  color: var(--night);
}

.search-subtext {
  margin-top: 15px;
  font-size: 1rem;
  color: #ccc; 
}
</style>
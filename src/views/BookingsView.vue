<template>
  <div class="bookings-page">
    <div class="container">
      <div class="content-wrapper">
        <div class="page-header">
          <h1>Our Destinations</h1>
          <p>Explore our curated list of world-class travel spots.</p>
          <div class="search-bar-wrapper">
            <input type="text" v-model="searchTerm" placeholder="Search for a destination..." class="search-input"/>
          </div>
        </div>

        <!-- Loading spinner -->
        <div v-if="isLoading" class="spinner-wrapper">
          <div class="spinner"></div>
        </div>

        <!-- Destinations Grid with Staggered Animation -->
        <TransitionGroup
          v-else-if="filteredDestinations.length > 0"
          tag="div"
          name="card-list"
          class="destinations-grid"
          appear
        >
          <div v-for="(dest, index) in filteredDestinations" :key="dest.id" class="card" :style="{'--i': index}">
            <div class="card-image-wrapper">
              <img :src="getImageUrl(dest.imageUrl)" :alt="dest.name" class="card-image" />
            </div>
            <div class="card-content">
              <h3>{{ dest.name }}</h3>
              <p>{{ dest.location }}</p>
              <p class="description">{{ dest.description }}</p>
            </div>
          </div>
        </TransitionGroup>

        <div v-else-if="!isLoading" class="no-results">
          <p>No destinations found matching your search.</p>
        </div>

        <!-- Call to Action -->
        <div class="call-to-action">
          <h2>Ready for an Adventure?</h2>
          <RouterLink to="/bookhere" class="btn">Book Here</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router'; // Import useRoute

const allDestinations = ref([]);
const searchTerm = ref('');
const isLoading = ref(true);
const route = useRoute();

function getImageUrl(filename) {
  return new URL(`../assets/destinations/${filename}`, import.meta.url).href
}

onMounted(async () => {
  // **NEW**: Check for a search query in the URL when the page loads
  if (route.query.search) {
    searchTerm.value = route.query.search;
  }

  // Fetch the destination data (existing logic)
  try {
    const response = await fetch('/api/destinations.json');
    if (!response.ok) throw new Error('Network response was not ok');
    allDestinations.value = await response.json();
  } catch(error) {
    console.error("Failed to fetch destinations:", error);
  } finally {
    isLoading.value = false;
  }
});

const filteredDestinations = computed(() => {
    // This existing computed property will automatically work with the pre-filled searchTerm
    if (!searchTerm.value) {
        return allDestinations.value;
    }
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    return allDestinations.value.filter(dest => 
        dest.name.toLowerCase().includes(lowerCaseSearch) ||
        dest.description.toLowerCase().includes(lowerCaseSearch) ||
        dest.location.toLowerCase().includes(lowerCaseSearch)
    );
});
</script>

<style scoped>
/* Staggered List Animation */
.card-list-enter-active,
.card-list-leave-active {
  transition: all 0.5s ease;
  /* Calculate delay based on the item's index */
  transition-delay: calc(0.05s * var(--i));
}
.card-list-enter-from,
.card-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}


/* Existing Styles */
.bookings-page {
  background-image: url('/bg-palms.jpg');
  background-size: cover;
  background-position: center;
  padding: 60px 0;
  background-color: var(--yinmn-blue);
}

.content-wrapper {
  background-color: var(--baby-powder);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.8rem;
  color: var(--yinmn-blue);
  margin-bottom: 10px;
}

.page-header p {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 30px;
}

/* Enhanced Search Input */
.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 20px;
  border-radius: 50px;
  border: 2px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--amber);
  box-shadow: 0 0 15px rgba(242, 187, 5, 0.5);
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

/* Enhanced Card Styles */
.card {
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.card-image-wrapper {
  border-radius: 10px 10px 0 0;
  overflow: hidden; /* This is crucial for the zoom effect */
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.card:hover .card-image {
  transform: scale(1.1); /* Zoom effect on hover */
}

.card-content {
    padding: 20px;
    flex-grow: 1;
}

.card-content h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: var(--yinmn-blue);
}

.card-content p {
    font-size: 1rem;
    font-weight: 500;
    color: #666;
    margin-bottom: 15px;
}
.card-content p.description {
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.6;
    color: #333;
}

.call-to-action {
  text-align: center;
  padding: 50px 0 10px;
}

.call-to-action h2 {
  font-size: 2.5rem;
  color: var(--yinmn-blue);
  margin-bottom: 25px;
  font-weight: 700;
}

.no-results {
  text-align: center;
  padding: 40px 0;
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
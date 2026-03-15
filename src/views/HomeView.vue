<template>
  <div>
  <!-- ===== HERO ===== -->
  <div class="hero-wrapper">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-eyebrow">— Premium Travel Experiences —</p>
      <h1>Your Journey<br><span class="accent">Starts Here</span></h1>
      <p class="hero-sub">Discover handpicked destinations crafted for the modern explorer.</p>
      <form @submit.prevent="handleSearch" class="search-container">
        <div class="search-bar">
          <span class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></span>
          <input type="text" v-model="searchQuery" placeholder="Search destinations like 'Paris', 'Japan'..." />
          <button type="submit" class="search-btn">Search</button>
        </div>
      </form>
      <div class="hero-tags">
        <span v-for="tag in popularTags" :key="tag" @click="quickSearch(tag)" class="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="hero-scroll-hint">
      <span>Scroll to explore</span>
      <div class="scroll-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg></div>
    </div>
  </div>

  <!-- ===== STATS ===== -->
  <section class="stats-bar">
    <div class="container stats-grid">
      <div class="stat" v-for="s in stats" :key="s.label">
        <span class="stat-value">{{ s.value }}</span>
        <span class="stat-label">{{ s.label }}</span>
      </div>
    </div>
  </section>

  <!-- ===== FEATURED DESTINATIONS ===== -->
  <section class="section featured-section">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Top Picks</p>
        <h2>Featured Destinations</h2>
        <p class="section-sub">Explore our most loved spots around the world</p>
      </div>
      <div class="featured-grid">
        <div
          v-for="(dest, i) in featured"
          :key="dest.id"
          class="featured-card"
          :class="{ 'featured-card--tall': i === 0 }"
          @click="goBook(dest)"
        >
          <img :src="getImageUrl(dest.imageUrl)" :alt="dest.name" />
          <div class="featured-card-overlay">
            <p class="featured-location"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> {{ dest.location }}</p>
            <h3>{{ dest.name }}</h3>
            <span class="featured-cta">Book Now →</span>
          </div>
        </div>
      </div>
      <div class="view-all-wrapper">
        <RouterLink to="/bookings" class="btn btn-outline">View All Destinations</RouterLink>
      </div>
    </div>
  </section>

  <!-- ===== WHY CHOOSE US ===== -->
  <section class="section why-section">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Why Us</p>
        <h2>Travel Done Right</h2>
        <p class="section-sub">We handle every detail so you can focus on the experience</p>
      </div>
      <div class="why-grid">
        <div class="why-card" v-for="w in whyUs" :key="w.title">
          <div class="why-icon" v-html="w.svg"></div>
          <h3>{{ w.title }}</h3>
          <p>{{ w.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== HOW IT WORKS ===== -->
  <section class="section how-section">
    <div class="container">
      <div class="section-header">
        <p class="section-eyebrow">Simple Process</p>
        <h2>How It Works</h2>
        <p class="section-sub">From discovery to departure in three easy steps</p>
      </div>
      <div class="steps-grid">
        <div class="step" v-for="(step, i) in steps" :key="step.title">
          <div class="step-number">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="step-icon" v-html="step.svg"></div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== CTA BANNER ===== -->
  <section class="cta-section">
    <div class="cta-overlay"></div>
    <div class="container cta-content">
      <h2>Ready for Your Next Adventure?</h2>
      <p>Hundreds of destinations. One seamless booking experience.</p>
      <div class="cta-buttons">
        <RouterLink to="/bookings" class="btn btn-amber">Browse Destinations</RouterLink>
        <RouterLink to="/contact" class="btn btn-ghost">Talk to Us</RouterLink>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();
const featured = ref([]);

const popularTags = ['Singapore', 'Paris', 'Japan', 'Italy', 'Australia'];

const stats = [
  { value: '6+', label: 'Destinations' },
  { value: '500+', label: 'Happy Travelers' },
  { value: '4.9 / 5', label: 'Average Rating' },
  { value: '24/7', label: 'Customer Support' },
];

const whyUs = [
  {
    title: 'Curated Experiences',
    desc: 'Every destination is handpicked by our travel experts to ensure an unforgettable journey.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>`
  },
  {
    title: 'Premium Quality',
    desc: 'From accommodation to activities, we partner only with the best providers worldwide.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`
  },
  {
    title: 'Safe & Secure',
    desc: 'Your bookings and personal data are protected every step of the way.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
  },
  {
    title: '24/7 Support',
    desc: 'Our team is always on standby to help you wherever you are in the world.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
  },
];

const steps = [
  {
    title: 'Search',
    desc: 'Browse our curated list of world-class destinations and find your perfect match.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`
  },
  {
    title: 'Book',
    desc: 'Fill in your details and confirm your booking in minutes — no hassle, no hidden fees.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`
  },
  {
    title: 'Travel',
    desc: 'Pack your bags and go. We take care of everything else.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`
  },
];

function getImageUrl(filename) {
  return new URL(`../assets/destinations/${filename}`, import.meta.url).href;
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/bookings', query: { search: searchQuery.value.trim() } });
  }
};

const quickSearch = (tag) => {
  router.push({ path: '/bookings', query: { search: tag } });
};

const goBook = (dest) => {
  router.push({ path: '/bookhere', query: { destination: dest.name } });
};

onMounted(async () => {
  try {
    const res = await fetch('/api/destinations.json');
    const all = await res.json();
    featured.value = all.slice(0, 4);
  } catch (e) {
    console.error(e);
  }
});
</script>

<style scoped>
/* ===== HERO ===== */
.hero-wrapper {
  background-image: url('/bg-plane.jpg');
  background-size: cover;
  background-position: center;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(19,17,18,0.6) 0%, rgba(27,82,153,0.75) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
}

.hero-eyebrow {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
}

h1 {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.2rem;
  text-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

h1 .accent {
  color: var(--amber);
}

.hero-sub {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 2.5rem;
  font-weight: 300;
}

.search-bar {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 6px 6px 6px 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  transition: box-shadow 0.3s ease;
}

.search-bar:focus-within {
  box-shadow: 0 12px 40px rgba(0,0,0,0.35);
}

.search-icon {
  color: #aaa;
  margin-right: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.search-bar input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: var(--night);
  padding: 8px 0;
}

.search-bar input:focus { outline: none; }
.search-bar input::placeholder { color: #bbb; }

.search-btn {
  background: var(--yinmn-blue);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.search-btn:hover { background: #163f80; }

.hero-tags {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.tag:hover {
  background: rgba(242,187,5,0.3);
  border-color: var(--amber);
}

.hero-scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  z-index: 1;
}

.scroll-arrow {
  animation: bounce 1.6s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* ===== STATS ===== */
.stats-bar {
  background: var(--yinmn-blue);
  padding: 36px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--amber);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ===== SHARED SECTION STYLES ===== */
.section {
  padding: 100px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-eyebrow {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--yinmn-blue);
  margin-bottom: 12px;
}

.section-header h2 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--night);
  margin-bottom: 14px;
}

.section-sub {
  font-size: 1.1rem;
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}

/* ===== FEATURED DESTINATIONS ===== */
.featured-section {
  background: #f8f9fc;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  grid-template-rows: 260px 260px;
  gap: 16px;
}

.featured-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.featured-card--tall {
  grid-row: 1 / 3;
}

.featured-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.featured-card:hover img {
  transform: scale(1.07);
}

.featured-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: white;
  transition: background 0.3s ease;
}

.featured-card:hover .featured-card-overlay {
  background: linear-gradient(to top, rgba(27,82,153,0.85) 0%, rgba(27,82,153,0.2) 100%);
}

.featured-location {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 6px;
}

.featured-card-overlay h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.featured-cta {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.featured-card:hover .featured-cta {
  opacity: 1;
  transform: translateY(0);
}

.view-all-wrapper {
  text-align: center;
  margin-top: 48px;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--yinmn-blue);
  color: var(--yinmn-blue);
  padding: 12px 36px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s ease, color 0.2s ease;
}

.btn-outline:hover {
  background: var(--yinmn-blue);
  color: white;
}

/* ===== WHY CHOOSE US ===== */
.why-section {
  background: white;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.why-card {
  text-align: center;
  padding: 40px 24px;
  border-radius: 16px;
  background: #f8f9fc;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.why-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(27,82,153,0.1);
}

.why-icon {
  margin-bottom: 20px;
  color: var(--yinmn-blue);
  display: flex;
  justify-content: center;
}

.why-card:hover .why-icon {
  color: var(--amber);
}

.why-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--night);
  margin-bottom: 12px;
}

.why-card p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.7;
}

/* ===== HOW IT WORKS ===== */
.how-section {
  background: var(--yinmn-blue);
}

.how-section .section-eyebrow {
  color: var(--amber);
}

.how-section .section-header h2 {
  color: white;
}

.how-section .section-sub {
  color: rgba(255,255,255,0.65);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
}

.steps-grid::before {
  content: '';
  position: absolute;
  top: 74px;
  left: 16.67%;
  right: 16.67%;
  height: 1px;
  background: rgba(255,255,255,0.2);
  z-index: 0;
}

.step {
  text-align: center;
  position: relative;
  z-index: 1;
}

.step-number {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--amber);
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.step-icon {
  margin-bottom: 20px;
  background: rgba(255,255,255,0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border: 2px solid rgba(255,255,255,0.2);
  color: white;
}

.step h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.step p {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
}

/* ===== CTA ===== */
.cta-section {
  position: relative;
  background-image: url('/bg-beach.jpg');
  background-size: cover;
  background-position: center;
  padding: 120px 0;
  text-align: center;
  color: white;
}

.cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(19,17,18,0.65), rgba(27,82,153,0.7));
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 16px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.3);
}

.cta-content p {
  font-size: 1.15rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-amber {
  background: var(--amber);
  color: var(--night);
  padding: 14px 40px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px rgba(242,187,5,0.4);
}

.btn-amber:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(242,187,5,0.5);
}

.btn-ghost {
  background: transparent;
  border: 2px solid rgba(255,255,255,0.6);
  color: white;
  padding: 14px 40px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.btn-ghost:hover {
  background: rgba(255,255,255,0.1);
  border-color: white;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .featured-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  .featured-card--tall {
    grid-row: auto;
    grid-column: 1 / -1;
    height: 300px;
  }
}

@media (max-width: 768px) {
  h1 { font-size: 2.6rem; }

  .stats-grid { grid-template-columns: repeat(2, 1fr); }

  .featured-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .featured-card--tall {
    grid-column: auto;
    height: 260px;
  }

  .featured-card { height: 220px; }

  .steps-grid { grid-template-columns: 1fr; }
  .steps-grid::before { display: none; }

  .why-grid { grid-template-columns: 1fr; }

  .cta-content h2 { font-size: 2rem; }

  .section { padding: 70px 0; }
}
</style>

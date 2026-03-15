<template>
  <div class="about-page">
    <!-- About Us Section -->
    <section class="about-us">
      <div class="container content-box">
        <h1>About Us</h1>
        <p>
          At Travel Atelier, we believe travel isn’t just about reaching a destination—it’s about experiencing the extraordinary. Our mission is to connect curious explorers with unforgettable journeys across the world’s most iconic and hidden gems. From the vibrant streets of Singapore to the timeless charm of Paris, we curate trips that blend adventure, comfort, and cultural immersion. With a team of passionate travel experts, we ensure every booking is seamless, secure, and tailored to your preferences. We partner with trusted hotels, local guides, and global networks to deliver exceptional service from start to finish. Whether you’re planning a romantic escape, a family vacation, or a solo adventure, we’re here to make it effortless and inspiring. Our platform is designed to simplify your travel planning while sparking your wanderlust. Let us turn your next trip into a story worth telling.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  background-color: var(--baby-powder);
}
.about-us, .contact {
  padding: 80px 0;
  text-align: center;
}
.content-box {
  max-width: 800px;
}
h1, h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: var(--night);
}
p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}
.contact .email {
  font-size: 1.5rem;
  margin: 15px 0;
}

@media (max-width: 600px) {
  h1, h2 { font-size: 2rem; }
  .about-us { padding: 50px 0; }
}
</style>
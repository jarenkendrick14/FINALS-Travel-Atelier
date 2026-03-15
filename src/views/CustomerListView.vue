<template>
  <div class="list-page">
    <div class="container">
      <h1>Customer List</h1>
      <div class="search-bar-wrapper">
        <input type="text" v-model="searchTerm" placeholder="Search by name or email..." class="search-input"/>
      </div>
      <div v-if="filteredCustomers.length > 0" class="customer-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in filteredCustomers" :key="customer.id">
              <td>{{ customer.firstName }} {{ customer.lastName }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ new Date(customer.joinDate).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="no-results">
        <p>No customers found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

const customers = ref([]);
const searchTerm = ref('');
const { token } = useAuth();

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/customers', {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    if (!response.ok) {
      throw new Error('Failed to load customers from the server.');
    }
    customers.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  }
});

const filteredCustomers = computed(() => {
  if (!searchTerm.value) {
    return customers.value;
  }
  const lowerCaseSearch = searchTerm.value.toLowerCase();
  return customers.value.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(lowerCaseSearch) ||
    customer.email.toLowerCase().includes(lowerCaseSearch)
  );
});
</script>

<style scoped>
.list-page {
  padding: 60px 0;
  min-height: 80vh;
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

.customer-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: var(--yinmn-blue);
  color: white;
  font-weight: 600;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.no-results {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  color: #777;
}
</style>
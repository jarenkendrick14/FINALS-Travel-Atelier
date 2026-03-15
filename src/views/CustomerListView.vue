<template>
  <div class="list-page">
    <div class="container">
      <h1>Customer List</h1>
      <div class="search-bar-wrapper">
        <input type="text" v-model="searchTerm" placeholder="Search by name or email..." class="search-input"/>
      </div>
      <div v-if="isLoading" class="spinner-wrapper"><div class="spinner"></div></div>
      <div v-else-if="filteredCustomers.length > 0" class="customer-table">
        <table>
          <thead>
            <tr>
              <th @click="setSort('name')" class="sortable">Name <span class="sort-icon">{{ sortIcon('name') }}</span></th>
              <th @click="setSort('email')" class="sortable">Email <span class="sort-icon">{{ sortIcon('email') }}</span></th>
              <th>Address</th>
              <th @click="setSort('joinDate')" class="sortable">Join Date <span class="sort-icon">{{ sortIcon('joinDate') }}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in sortedCustomers" :key="customer.id">
              <td>{{ customer.firstName }} {{ customer.lastName }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ customer.joinDate ? new Date(customer.joinDate).toLocaleDateString() : '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!isLoading" class="no-results">
        <p>No customers found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

const sortKey = ref('');
const sortDir = ref('asc');

const setSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
};

const sortIcon = (key) => {
  if (sortKey.value !== key) return '⇅';
  return sortDir.value === 'asc' ? '↑' : '↓';
};

const customers = ref([]);
const searchTerm = ref('');
const isLoading = ref(true);
const { token } = useAuth();

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/customers`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    if (!response.ok) throw new Error('Failed to load customers from the server.');
    customers.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  } finally {
    isLoading.value = false;
  }
});

const filteredCustomers = computed(() => {
  if (!searchTerm.value) return customers.value;
  const lower = searchTerm.value.toLowerCase();
  return customers.value.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(lower) ||
    c.email.toLowerCase().includes(lower)
  );
});

const sortedCustomers = computed(() => {
  if (!sortKey.value) return filteredCustomers.value;
  return [...filteredCustomers.value].sort((a, b) => {
    let valA = sortKey.value === 'name' ? `${a.firstName} ${a.lastName}` : a[sortKey.value] ?? '';
    let valB = sortKey.value === 'name' ? `${b.firstName} ${b.lastName}` : b[sortKey.value] ?? '';
    if (sortKey.value === 'joinDate') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }
    if (valA < valB) return sortDir.value === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir.value === 'asc' ? 1 : -1;
    return 0;
  });
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

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background-color: #163f80;
}

.sort-icon {
  font-size: 0.8rem;
  margin-left: 4px;
  opacity: 0.8;
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
import { ref, readonly, computed } from 'vue';

// State is initialized by checking localStorage for an existing token
const token = ref(localStorage.getItem('authToken'));
const user = ref(token.value ? JSON.parse(atob(token.value.split('.')[1])) : null); // Decode user info from token
const isAuthenticated = ref(!!token.value);

const isAdmin = computed(() => user.value?.role === 'admin');

export function useAuth() {
  const setAuth = (newToken) => {
    if (newToken) {
      token.value = newToken;
      // Decode the payload part of the JWT to get user info
      user.value = JSON.parse(atob(newToken.split('.')[1]));
      isAuthenticated.value = true;
      localStorage.setItem('authToken', newToken);
    } else {
      token.value = null;
      user.value = null;
      isAuthenticated.value = false;
      localStorage.removeItem('authToken');
    }
  };

  const login = async (credentials) => {
    // Make API call to the backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.success && data.token) {
      setAuth(data.token);
      return true; // Indicate success
    } else {
      // Throw an error with the message from the backend
      throw new Error(data.message || 'Login failed.');
    }
  };

  const logout = () => {
    setAuth(null);
  };

  // Ensure state is updated if another tab logs in/out
  window.addEventListener('storage', (event) => {
    if (event.key === 'authToken') {
      setAuth(event.newValue);
    }
  });

  return {
    isAuthenticated: readonly(isAuthenticated),
    isAdmin: readonly(isAdmin),
    user: readonly(user),
    token: readonly(token), // Expose token for API calls
    login,
    logout,
    setAuth, // Expose the setAuth function for registration
  };
}
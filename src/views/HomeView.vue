<template>
  <main>
    <TheWelcome />
    
    <div class="api-status">
      <h2>API Status</h2>
      <button @click="checkStatus" :disabled="loading">Check API Status</button>
      
      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="apiStatus" class="status">
        <p>Status: {{ apiStatus.status }}</p>
        <p>Message: {{ apiStatus.message }}</p>
        <p>Timestamp: {{ new Date(apiStatus.timestamp).toLocaleString() }}</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TheWelcome from '@/components/TheWelcome.vue'
import { useApiService } from '@/services/apiService'

const { apiStatus, loading, error, checkApiStatus } = useApiService()

function checkStatus() {
  checkApiStatus()
}

// Optional: Check status when component mounts
onMounted(() => {
  checkStatus()
})
</script>

<style scoped>
.api-status {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.error {
  color: red;
  margin-top: 1rem;
}

.status {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
<template>
  <div>
    <!-- bekerja seperti routerview -->
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useAuth } from './stores/auth';

const store = useAuth()
store.initializeAuth() //bisa panggil action tanpa menggunakan onmounted

</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

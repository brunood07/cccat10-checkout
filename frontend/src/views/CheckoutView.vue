<script setup lang="ts">
  import axios from 'axios';
  import { onMounted } from 'vue';

  const products: any = [];

  onMounted(async () => {
    const response = await axios.get("http://localhost:3000/products")
  });
</script>

<template>
  <div>
    <div class="title-name">Checkout</div>
    <div class="product" v-for="product in products">
      {{ product }}
    </div>
  </div>
</template>

<style scoped>
</style>

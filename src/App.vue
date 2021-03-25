<template>
  <div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import router from "./router.js";
export default {
  router,
  methods: {}
};
</script>

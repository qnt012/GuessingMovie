<template>
  <div class="header">     
    <!-- <img src="../assets/home-logo.png" onclick="location.href = 'http://localhost:8080'" style="cursor:pointer"/> -->
    <p @click="moveTo('')">Guessing Movies</p>
  </div>
</template>

<script>
export default {
  methods: {
    moveTo(page) {
      location.href = "http://localhost:8080/" + page
    }
  }
};
</script>
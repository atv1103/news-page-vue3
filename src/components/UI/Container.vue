<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  max-width: 1436px;
  margin: 0 auto;
  padding: 0 10px;
}

@media (max-width: 1347px) {
  .container {
    max-width: 1271px;
  }
}

@media (max-width: 1092px) {
  .container {
    max-width: 1016px;
  }
}

@media (max-width: 837px) {
  .container {
    max-width: 761px;
  }
}

@media (max-width: 582px) {
  .container {
    max-width: 506px;
  }
}

@media (max-width: 480px) {
  .container {
    max-width: 452px;
  }
}
</style>

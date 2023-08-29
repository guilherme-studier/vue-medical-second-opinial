<template>
  <div class="error-message">
    <div class="error-message-content">
      <p>Ops! Ocorreu um erro durante o carregamento dos dados :(</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage'
}
</script>

<style scoped>
.error-message {
  justify-content: center;
  align-items: center;
  display: flex;
}

.error-message-content {
  padding: 100px;
}
</style>

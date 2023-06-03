<template>
  <footer id="footer">
    <div class="container">
      <h3>2023 - Todos os direitos reservados - Instituto Ceos</h3>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
#footer {
  height: 50px;
  width: 100%;
  text-align: right; /* Alinhamento do texto à direita */
  //position: fixed;
  margin-top: 32px;
  background-color: $gray;
  color: $gray-600;
  opacity: 1;
  bottom: 0;
  right: 0;
  left: auto;
  z-index: 100;
  margin: 0 auto;
}

#footer div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

#footer h3 {
  margin: 0;
  font-size: 15px;
  line-height: 20px;
  font-weight: normal;
}
</style>

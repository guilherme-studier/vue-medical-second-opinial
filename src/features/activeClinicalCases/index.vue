<template>
  <div id="active-clinical-case">
    <div class="active-clinical-case-form">
      <div class="full-width">
        <input-block title="Caso Clínico nº" content="231313131" />
      </div>
      <div class="side-by-side">
        <div class="half-width">
          <input-block title="Caso Clínico nº" content="231313131" />
        </div>
        <div class="half-width with-margin">
          <input-block title="Caso Clínico nº" content="231313131" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputBlock from '@/components/inputBlock'

export default {
  components: {
    InputBlock
  }
}
</script>

<style lang="scss" scoped>
#active-clinical-case {
  width: 100%;
}

.full-width {
  width: 100%;
}

.side-by-side {
  display: flex;
  flex-wrap: wrap; /* Permite que os elementos quebrem para uma nova linha */
}

.half-width {
  flex: 1; /* Ocupa metade do espaço */
  margin-bottom: 10px; /* Adiciona espaço entre os elementos quando quebram para a próxima linha */
}

.with-margin {
  margin-left: 20px; /* Adicione margem direita ao segundo componente */
}

/* Estilos adicionais conforme necessário */
</style>

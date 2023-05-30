<template>
  <div id="home">
    <DataBox title="Indústrias Cadastradas" quantity="2" />
    <DataBox title="Vouchers aguardando ativação" quantity="3" />
    <DataBox title="Vouchers designados" quantity="4" />
  </div>
</template>

<script>
import DataBox from '@/features/home/dataBox/DataBox'

export default {
  name: 'Home',
  components: {
    DataBox
  }
}
</script>

<style scoped>
#home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.data-box {
  flex-basis: calc(
    33.33% - 10px
  ); /* Define a largura base para cada componente DataBox */
  margin-right: 10px; /* Define o espaçamento entre os componentes */
}

.data-box:last-child {
  margin-right: 0; /* Remove o espaçamento à direita do último componente */
}

@media (max-width: 767px) {
  .data-box {
    flex-basis: 100%; /* Altera a largura para ocupar 100% em telas menores */
    margin-right: 0; /* Remove o espaçamento em telas menores */
  }
}
</style>

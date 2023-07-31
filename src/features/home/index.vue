<template>
  <div id="home">
    <signature v-if="doctorName" :name="doctorName" class="signature" />

    <div class="data-box-container">
      <data-box title="Indústrias Cadastradas" quantity="2" />
      <data-box title="Vouchers aguardando ativação" quantity="3" />
      <data-box title="Vouchers designados" quantity="4" />
    </div>
  </div>
</template>

<script>
import Signature from '@/features/home/signature/Signature'
import DataBox from '@/features/home/dataBox/DataBox'

export default {
  name: 'Home',
  components: {
    DataBox,
    Signature
  },
  data() {
    return {
      doctorName: 'Dr. Guilherme Studier'
    }
  }
}
</script>

<style scoped>
#home {
  justify-content: space-between;
  flex-wrap: wrap;
  display: box;
  width: 100%;
}

.signature {
  margin-bottom: 10px;
  width: 100%;
  order: 1;
}

.data-box-container {
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.data-box {
  flex-basis: calc(33.33% - 10px);
  margin-right: 10px;
}

.data-box:last-child {
  margin-right: 0;
}

@media (max-width: 767px) {
  .data-box {
    flex-basis: 100%;
    margin-right: 0;
  }
}
</style>

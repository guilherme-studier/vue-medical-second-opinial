<template>
  <div id="home">
    <signature v-if="getDoctorName" :name="getDoctorName" class="signature" />

    <div class="data-box-container">
      <data-box
        v-for="(box, index) in getDataBoxes"
        :key="index"
        :title="box.title"
        :quantity="box.quantity"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import DataBox from '@/features/home/components/dataBox/DataBox'
import Signature from '@/features/home/components/signature/Signature'

export default {
  name: 'Home',
  components: {
    DataBox,
    Signature
  },
  computed: {
    ...mapGetters('home', ['getDoctorName', 'getDataBoxes'])
  }
}
</script>

<style scoped>
@import './styles/index.scss';
</style>

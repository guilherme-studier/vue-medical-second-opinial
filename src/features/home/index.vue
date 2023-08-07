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
// components
import Signature from '@/features/home/components/signature/Signature'
import DataBox from '@/features/home/components/dataBox/DataBox'

// states
import { mapGetters } from 'vuex'

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

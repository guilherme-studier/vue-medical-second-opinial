<template>
  <div id="home">
    <signature v-if="getDoctorName" :name="getDoctorName" class="signature" />

    <div v-if="getDataBoxes" class="data-box-container">
      <data-box
        v-for="(box, index) in getDataBoxes"
        :key="index"
        :title="box.title"
        :quantity="box.quantity"
      />
    </div>
    <div v-else-if="getLoading">
      <base-loader />
    </div>
    <div v-else-if="getError">
      <base-error />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BaseError from '@/components/baseError'
import BaseLoader from '@/components/baseLoader'
import DataBox from '@/features/home/components/dataBox/DataBox'
import Signature from '@/features/home/components/signature/Signature'

export default {
  name: 'Home',
  components: {
    BaseLoader,
    BaseError,
    Signature,
    DataBox
  },
  computed: {
    ...mapGetters('home', [
      'getDoctorName',
      'getDataBoxes',
      'getLoading',
      'getError'
    ])
  }
}
</script>

<style scoped>
@import './styles/index.scss';
</style>

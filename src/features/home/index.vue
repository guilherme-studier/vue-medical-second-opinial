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
    <div class="loader-spinner" v-else-if="getLoading">
      <loader-spinner />
    </div>
    <div v-else-if="getError">
      <base-error />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import BaseError from '@/components/baseError'
import LoaderSpinner from '@/components/loaderSpinner'
import DataBox from '@/features/home/components/dataBox/DataBox'
import Signature from '@/features/home/components/signature/Signature'

export default {
  name: 'Home',
  components: {
    LoaderSpinner,
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
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions('user', ['getUser'])
  }
}
</script>

<style scoped>
@import './styles/index.scss';
</style>

<template>
  <div id="home" v-loading="getLoading">
    <signature v-if="getName" :name="getName" class="signature" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Signature from '@/features/home/components/signature/Signature'

export default {
  name: 'Home',
  components: {
    Signature
  },
  computed: {
    ...mapGetters('home', [
      'getDoctorName',
      'getDataBoxes',
      'getLoading',
      'getError'
    ]),
    ...mapGetters('user', ['getName'])
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

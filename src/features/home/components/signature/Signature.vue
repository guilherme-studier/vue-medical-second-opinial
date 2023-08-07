<template>
  <div id="signature">
    <img :src="iconDoctor" />
    <h2 class="signature-text">
      Seja bem-vindo <span class="name">{{ name }}</span>
    </h2>
  </div>
</template>

<script>
import userDoctor from '@/assets/icons/icon-doctor.svg'

export default {
  name: 'Signature',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      iconDoctor: userDoctor
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
</style>

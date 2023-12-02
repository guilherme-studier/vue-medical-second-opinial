<template>
  <div id="signature">
    <img :src="iconDoctor" />
    <h2 class="signature-text">
      Seja bem-vindo(a),
      <span class="name">{{ getTitlePrefix }} {{ name }}</span>
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapGetters('user', ['getType']),

    getTitlePrefix() {
      const userType = this.getType
      if (userType === 'consultant_doctor' || userType === 'client_doctor') {
        // Adicione "Dr(a)." se for um médico (consultant_doctor ou client_doctor)
        return 'Dr(a).'
      } else {
        // Retorne uma string vazia se não for um médico
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
</style>

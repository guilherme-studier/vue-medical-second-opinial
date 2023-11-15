<template>
  <div class="container-modal-seem" v-loading="getLoadingOpinion">
    <h2>
      Caso clínico: <span>{{ voucher }}</span>
    </h2>
    <div class="seem">
      <textarea class="seem-text" v-model="opinionText" disabled />
    </div>
    <!-- <div class="seem-send">
      <el-button class="seem-btn" type="primary" @click="sendSeem"
        >Imprimir</el-button
      >
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SeemModal',
  props: {
    voucher: {
      type: String,
      default: null
    },
    opinion: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters('clinicalCasesConsultationDoctor', ['getLoadingOpinion']),

    opinionText() {
      return this.opinion
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

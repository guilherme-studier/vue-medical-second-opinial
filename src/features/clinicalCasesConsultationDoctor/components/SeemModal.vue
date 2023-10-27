<template>
  <div class="container-modal-seem">
    <h2>
      Caso clínico: <span>{{ voucher }}</span>
    </h2>
    <div class="seem">
      <textarea
        class="seem-text"
        v-model="seemText"
        placeholder="Escrever paracer..."
      ></textarea>
    </div>
    <div class="seem-send">
      <button class="seem-btn" @click="sendSeem" :disabled="!enabledSendSeem">
        Enviar
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
  data() {
    return {
      seemText: this.opinion
    }
  },
  computed: {
    enabledSendSeem() {
      return this.seemText?.length
    }
  },
  methods: {
    ...mapActions('clinicalCasesConsultationDoctor', ['putOpinion']),

    sendSeem() {
      this.putOpinion({ voucherId: this.voucher, opinion: this.seemText })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

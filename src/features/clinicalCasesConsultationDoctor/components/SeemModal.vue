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
    }
  },
  data() {
    return {
      seemText: null
    }
  },
  computed: {
    enabledSendSeem() {
      return this.seemText?.length
    }
  },
  methods: {
    ...mapActions('clinicalCasesConsultationDoctor', ['handleSeem']),

    sendSeem() {
      this.handleSeem(this.seemText)
      this.seemText = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

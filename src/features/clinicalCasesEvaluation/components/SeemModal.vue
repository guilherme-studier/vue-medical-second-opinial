<template>
  <div class="container-modal-seem">
    <h2>
      Caso clínico: <span>{{ voucher }}</span>
    </h2>
    <div class="seem-text">
      <p>{{ seem }}</p>
    </div>
    <div class="seem-send">
      <div class="seem-print-out">
        <h3 @click="printSeem">Imprimir Parecer</h3>
      </div>
      <div class="seem-button">
        <button @click="sendSeem">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf'
import { mapActions } from 'vuex'

export default {
  name: 'SeemModal',
  props: {
    voucher: {
      type: String,
      default: null
    },
    seem: {
      type: String,
      default: null
    }
  },
  methods: {
    ...mapActions('clinicalCasesEvaluation', ['handleSeem']),

    printSeem() {
      const pdf = new jsPDF()

      pdf.text(this.seem, 10, 10)
      pdf.save('parecer.pdf')
    },

    sendSeem() {
      this.handleSeem(this.seem)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

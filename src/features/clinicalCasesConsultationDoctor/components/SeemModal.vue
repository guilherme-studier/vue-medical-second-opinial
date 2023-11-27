<template>
  <div class="container-modal-seem" v-loading="getLoadingOpinion">
    <h2>
      Caso clínico: <span>{{ voucher }}</span>
    </h2>
    <div class="seem">
      <textarea
        class="seem-text"
        v-model="seemText"
        placeholder="Escrever parecer..."
        :disabled="!edit"
        :class="{ scrollable: !edit }"
      />
    </div>
    <div v-if="edit" class="seem-send">
      <el-button
        class="seem-btn"
        type="primary"
        @click="sendSeem"
        :disabled="!seemText"
        >Salvar</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      seemText: null
    }
  },
  computed: {
    ...mapGetters('clinicalCasesConsultationDoctor', [
      'getLoadingOpinion',
      'getIsModalSeem',
      'getOpinion'
    ]),

    enabledSendSeem() {
      return this.getOpinion?.length
    }
  },
  mounted() {
    this.seemText = this.getOpinion
  },
  watch: {
    getIsModalSeem() {
      this.seemText = this.getOpinion
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

.scrollable {
  pointer-events: auto;
  /* Outros estilos que você pode querer adicionar */
}
</style>

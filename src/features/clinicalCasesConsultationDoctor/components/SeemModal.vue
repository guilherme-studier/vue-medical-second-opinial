<template>
  <div class="container-modal-seem" v-loading="getLoadingOpinion">
    <h2>
      Caso clínico: <span>{{ voucherId }}</span>
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
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SeemModal',
  setup() {
    const toast = useToast()

    return { toast }
  },
  props: {
    voucherId: {
      type: String,
      default: null
    },
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

    if (this.edit) {
      return this.toast.info(
        'Antes de registrar o parecer, verifique se há mensagens no chat do caso clínico',
        {
          timeout: 8000
        }
      )
    }
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

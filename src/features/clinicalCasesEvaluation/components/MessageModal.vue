<template>
  <div class="container-modal-message">
    <h2>
      Caso clínico: <span>{{ voucher }}</span>
    </h2>
    <div class="messages" v-loading="getLoadingMessages">
      <div
        v-if="getMessages.length"
        class="chat-message-container"
        ref="messageContainer"
      >
        <Message
          v-for="message in getMessages"
          :key="message.id"
          :message="message"
        />
      </div>
      <div v-else class="messages-empty">
        Você ainda não recebeu nenhuma mensagem do médico consultor.
      </div>
      <div v-if="getMessages.length && edit" class="seem">
        <textarea
          class="seem-text"
          v-model="messageText"
          placeholder="Escreva mensagem..."
          type="textarea"
          :disabled="!edit"
        />
      </div>
    </div>
    <div v-if="getMessages.length && edit" class="message-send">
      <el-upload
        v-model="fileList"
        class="upload-demo"
        :auto-upload="false"
        @change="handleFileImg"
        :show-file-list="false"
      >
        <template #trigger>
          <el-button type="primary" class="message-btn" @click="sendMessage">
            Upload de arquivo
          </el-button>
        </template>
      </el-upload>
      <el-button
        type="primary"
        class="message-btn"
        @click="sendMessage"
        :disabled="!enabledSendMessage"
      >
        Enviar
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

import Message from './Message.vue'

export default {
  name: 'MessageModal',
  components: {
    Message
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    voucher: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      messageText: null,
      selectedFile: {}
    }
  },
  mounted() {
    this.scrollToEnd()
  },
  computed: {
    ...mapGetters(['getUserToken']),
    ...mapGetters('clinicalCasesEvaluation', [
      'getLoadingMessages',
      'getIsModalMessage',
      'getMessages'
    ]),
    enabledSendMessage() {
      return this.messageText?.length
    },
    edit() {
      if (this.status === 'Em avaliação') return true
      else return false
    }
  },
  methods: {
    ...mapActions('clinicalCasesEvaluation', [
      'putNewMessage',
      'fetchMessages'
    ]),
    async handleFileImg(file) {
      this.selectedFile = file.raw

      await this.submit()
    },
    async submit() {
      const url = 'https://meso.poatech.com.br:450/clinical-case/api/1.0'
      const voucherId = this.voucher
      const formData = new FormData()
      formData.append('body', this.selectedFile)

      await axios
        .post(`${url}/voucher/${voucherId}/document`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.getUserToken}`
          }
        })
        .then(() => {
          this.toast.success('Upload realizado com sucesso', {
            timeout: 5000
          })
        })
        .catch(() => {
          this.toast.warning('Não foi possível realizar o upload do arquivo')
        })
        .finally(() => {
          this.messageText = `${this.getMessages[0].name} anexou um arquivo. Disponível para consulta em Exames e Laudos Adicionais`
          this.sendMessage()
        })
    },
    async sendMessage() {
      const handleData = {
        id: this.id,
        message: this.messageText
      }
      if (!handleData.message) return
      await this.putNewMessage(handleData)
      await this.fetchMessages(this.id)
      this.messageText = null

      this.$nextTick(() => {
        this.scrollToEnd()
      })
    },

    scrollToEnd() {
      const messageContainer = this.$refs.messageContainer
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

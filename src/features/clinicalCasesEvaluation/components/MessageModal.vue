<template>
  <div class="container-modal-message">
    <h2>
      Caso clínico: <span>{{ voucher }}</span>
    </h2>
    <div class="messages" v-loading="getLoadingMessages">
      <div v-if="getMessages.length" class="chat-message-container">
        <Message
          v-for="message in getMessages"
          :key="message.id"
          :message="message"
        />
      </div>
      <div v-else class="messages-empty">
        Não há mensagens no momento
      </div>
      <div class="seem">
        <textarea
          class="seem-text"
          v-model="messageText"
          placeholder="Escreva mensagem..."
          type="textarea"
        />
      </div>
    </div>
    <div class="message-send">
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
import { mapActions, mapGetters } from 'vuex'

import Message from './Message.vue'

export default {
  name: 'MessageModal',
  components: {
    Message
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    voucher: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      messageText: null
    }
  },
  computed: {
    ...mapGetters('clinicalCasesEvaluation', [
      'getLoadingMessages',
      'getIsModalMessage',
      'getMessages'
    ]),

    enabledSendMessage() {
      return this.messageText?.length
    }
  },
  methods: {
    ...mapActions('clinicalCasesEvaluation', [
      'putNewMessage',
      'fetchMessages'
    ]),

    async sendMessage() {
      const handleData = {
        id: this.id,
        message: this.messageText
      }
      await this.putNewMessage(handleData)
      await this.fetchMessages(this.id)
      this.messageText = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

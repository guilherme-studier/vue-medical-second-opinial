<template>
  <div class="container-modal-message">
    <h2>
      Caso clínico: <span>{{ voucherId }}</span>
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
        Não há mensagens no momento.
      </div>
      <div v-if="edit" class="seem">
        <textarea
          class="seem-text"
          v-model="messageText"
          placeholder="Escreva mensagem..."
          type="textarea"
          :disabled="!edit"
        />
      </div>
    </div>
    <div v-if="edit" class="message-send">
      <el-button
        type="primary"
        class="message-btn"
        @click="sendMessage"
        :disabled="!enabledSendMessage && edit"
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
    voucherId: {
      type: String,
      default: null
    },
    id: {
      type: Number,
      default: null
    },
    voucher: {
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
      messageText: null
    }
  },
  mounted() {
    this.scrollToEnd()
  },
  computed: {
    ...mapGetters('clinicalCasesConsultationDoctor', [
      'getLoadingMessages',
      'getIsModalMessage',
      'getMessages'
    ]),

    enabledSendMessage() {
      return this.messageText?.length
    }
  },
  methods: {
    ...mapActions('clinicalCasesConsultationDoctor', [
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

<template>
  <div class="container-modal-message">
    <h2>
      Caso clínico: <span>{{ voucher }}</span>
    </h2>
    <div class="messages">
      <div class="chat-message-container">
        <Message
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :isUserMessage="message.id !== '52'"
        />
      </div>
      <div class="seem">
        <textarea
          class="seem-text"
          v-model="messageText"
          placeholder="Escreva mensagem..."
        ></textarea>
      </div>
    </div>
    <div class="message-send">
      <button
        class="message-btn"
        @click="sendMessage"
        :disabled="!enabledSendMessage"
      >
        Enviar
      </button>
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
    voucher: {
      type: String,
      default: null
    },
    messages: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      messageText: null
    }
  },
  computed: {
    ...mapGetters('user', ['getId']),

    getUserId() {
      return this.getId
    },

    enabledSendMessage() {
      return this.messageText?.length
    }
  },
  methods: {
    ...mapActions('clinicalCasesConsultationDoctor', ['handleMessage']),

    sendMessage() {
      this.handleMessage(this.messageText)
      this.messageText = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

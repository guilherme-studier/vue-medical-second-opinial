<template>
  <div class="chat-message">
    <div class="chat-message-img" :class="{ 'not-user': isUserMessage }">
      <img class="icon-voucher" :src="icon" />
      <div :class="{ 'not-user': isUserMessage }">
        <div class="message-sender">
          <h2>{{ message.name }}</h2>
        </div>
        <div class="message-date">
          <p>{{ message.date }}</p>
        </div>
      </div>
    </div>
    <div class="message-content">
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    isUserMessage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icon: require('@/assets/icons/icon-voucher.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

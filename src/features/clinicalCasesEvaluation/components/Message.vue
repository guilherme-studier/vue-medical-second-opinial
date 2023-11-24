<template>
  <div class="chat-message">
    <div class="chat-message-img" :class="{ 'not-user': !isDoctorCon }">
      <img class="icon-voucher" :src="icon" />
      <div :class="{ 'not-user': !isDoctorCon }">
        <div class="message-sender">
          <h2>Dr. {{ message.name }}</h2>
        </div>
        <div class="message-date">
          <p>{{ message.createdAtFormatted }}</p>
        </div>
      </div>
    </div>
    <div :class="{ 'not-user': !isDoctorCon }" class="message-content">
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
    }
  },
  data() {
    return {
      icon: require('@/assets/icons/icon-voucher.svg')
    }
  },
  computed: {
    isDoctorCon() {
      return this.message?.doctorOrigem === 'medcon'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

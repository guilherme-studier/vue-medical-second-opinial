<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <img class="icon-close" :src="toggleIcon" @click="closeModal" />
      </div>

      <div class="modal-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import iconClose from '../../assets/icons/icon-close.svg'

export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      toggleIcon: iconClose
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  border: none !important;

  .modal-content {
    border: none !important;
    width: fit-content;
    min-width: 300px;
    max-width: 882px;
    background-color: white;
    padding: 0;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    .modal-text {
      padding: 25px;
    }
  }

  .modal-header {
    background-color: $green-500;
    height: 100%;
    width: 100%;
    max-height: 78px;
    padding: 10px;
    border-radius: 18px 18px 0 0;
    display: flex;
    align-items: center;
    padding: 25px;
  }

  .modal-title {
    color: $white;
    margin: 0;
  }

  .icon-close {
    width: 15px;
    color: $white;
    font-weight: 700;
    cursor: pointer;
  }

  .modal-close-btn {
    background: transparent;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}
</style>

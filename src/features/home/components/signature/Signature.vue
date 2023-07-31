<template>
  <div id="signature">
    <img :src="iconDoctor" />
    <h2 class="signature-text">
      Seja bem-vindo <span class="name">{{ name }}</span>
    </h2>
  </div>
</template>

<script>
import userDoctor from '@/assets/icons/icon-doctor.svg'

export default {
  name: 'Signature',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      iconDoctor: userDoctor
    }
  }
}
</script>

<style lang="scss" scoped>
#signature {
  display: flex;
  align-items: center;
  .signature-text {
    font-weight: 400;
    margin-left: 8px;
    font-size: 18px;

    .name {
      color: $green-500;
      font-weight: 700;
    }
  }
}
</style>

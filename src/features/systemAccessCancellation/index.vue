<template>
  <div id="system-access">
    <system-access-cancellation-form />
  </div>
</template>

<script>
import SystemAccessCancellationForm from './components/SystemAccessCancellationForm.vue'

export default {
  name: 'SystemAccessCancellation',
  components: {
    SystemAccessCancellationForm
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

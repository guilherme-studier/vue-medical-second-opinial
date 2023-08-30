<template>
  <div id="login-base-loader">
    <loader-spinner />
  </div>
</template>

<script>
import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'LoginBaseLoader',
  components: {
    LoaderSpinner
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

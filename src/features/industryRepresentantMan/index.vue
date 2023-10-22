<template>
  <div id="industry-representant-man">
    <industry-representant-man-form />
  </div>
</template>

<script>
import IndustryRepresentantManForm from './components/IndustryRepresentantManForm.vue'

export default {
  name: 'IndustryRepresentantMan',
  components: {
    IndustryRepresentantManForm
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

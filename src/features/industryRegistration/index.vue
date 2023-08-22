<template>
  <div id="industry-registration">
    <industry-registration-form />
  </div>
</template>

<script>
// components
import IndustryRegistrationForm from '../industryRegistration/components/IndustryRegistrationForm'

export default {
  name: 'Industry Registration',
  components: {
    IndustryRegistrationForm
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

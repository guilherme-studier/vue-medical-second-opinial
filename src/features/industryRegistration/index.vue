<template>
  <div id="industry-registration">
    <industry-registration-data />
  </div>
</template>

<script>
// components
import IndustryRegistrationData from '../industryRegistration/components/IndustryRegistrationData'

export default {
  name: 'Industry Registration',
  components: {
    IndustryRegistrationData
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

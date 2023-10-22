<template>
  <div id="management-industry-representatives">
    <authorized-distribute-clinical-case-form />
  </div>
</template>

<script>
import AuthorizedDistributeClinicalCaseForm from './components/AuthorizedDistributeClinicalCaseForm'

export default {
  name: 'AuthorizedDistributeClinicalCase',
  components: {
    AuthorizedDistributeClinicalCaseForm
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

<template>
  <div class="container" :class="{ 'form-loading': isLoading }">
    <industry-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import IndustryForm from './components/IndustryForm'

export default {
  name: 'Gestão de Indústrias',
  components: {
    IndustryForm
  },
  computed: {
    ...mapGetters('industry', ['getLoadingIndustry']),

    isLoading() {
      return this.getLoadingIndustry
    }
  }
}
</script>

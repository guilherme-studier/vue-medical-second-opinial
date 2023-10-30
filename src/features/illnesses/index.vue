<template>
  <div class="container" :class="{ 'form-loading': isLoading }">
    <illnesses-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import IllnessesForm from './components/IllnessesForm'

export default {
  name: 'Gestão de Doenças',
  components: {
    IllnessesForm
  },
  computed: {
    ...mapGetters('disease', ['getDiseases', 'getLoadingDiseases']),

    isLoading() {
      return this.getLoadingDiseases
    }
  }
}
</script>

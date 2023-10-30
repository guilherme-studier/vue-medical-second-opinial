<template>
  <div class="container" :class="{ 'form-loading': isLoading }">
    <specialty-form />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SpecialtyForm from './components/SpecialtyForm'

export default {
  name: 'Gestão de Especialidades',
  components: {
    SpecialtyForm
  },
  computed: {
    ...mapGetters('specialty', ['getSpecialties', 'getLoadingSpecialtys']),

    isLoading() {
      return this.getLoadingSpecialtys
    }
  }
}
</script>

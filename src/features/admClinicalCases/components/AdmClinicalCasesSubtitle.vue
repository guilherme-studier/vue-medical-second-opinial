<template>
  <div class="container clinical-cases--subtitle">
    <div v-for="item in susbtitleClinicalCases" :key="item.icon">
      <subtitle :icon="item.icon" :text="item.text" />
    </div>
  </div>
</template>

<script>
import { faCheck, faX, faTrash } from '@fortawesome/free-solid-svg-icons'

import Subtitle from '@/components/subtitle'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    Subtitle
  },
  data() {
    return {
      susbtitleClinicalCases: [
        {
          icon: faCheck,
          text: 'Aceitar o caso clínico.'
        },
        {
          icon: faX,
          text: 'Declinar caso clínico.'
        },
        {
          icon: faTrash,
          text: 'Cancelar caso clínico.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

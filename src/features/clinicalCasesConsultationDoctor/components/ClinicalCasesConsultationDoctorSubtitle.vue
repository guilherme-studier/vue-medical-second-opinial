<template>
  <div class="container clinical-cases--subtitle">
    <h2>Orientações:</h2>
    <div v-for="item in susbtitleClinicalCases" :key="item.icon">
      <subtitle :icon="item.icon" :text="item.text" />
    </div>
  </div>
</template>

<script>
import {
  faFile,
  faComment,
  faBookOpenReader
} from '@fortawesome/free-solid-svg-icons'

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
          icon: faBookOpenReader,
          text: 'Consulta: Consultar caso clínico'
        },
        {
          icon: faFile,
          text: 'Parecer: Adicionar Parecer'
        },
        {
          icon: faComment,
          text: 'Mensageria: Adicionar mensagem.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.clinical-cases--subtitle {
  h2 {
    margin: 10px;
  }
}
</style>

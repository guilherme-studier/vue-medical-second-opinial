<template>
  <div class="container clinical-cases--subtitle">
    <div v-for="item in susbtitleClinicalCases" :key="item.icon">
      <subtitle :icon="item.icon" :text="item.text" />
    </div>
  </div>
</template>

<script>
import {
  faSquareCheck,
  faFile,
  faComment
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
          icon: faSquareCheck,
          text: 'Para ativar seu caso clínico, por favor clique no botão acima.'
        },
        {
          icon: faFile,
          text:
            'O parecer estará disponível para consulta e/ou impressão quando o médico consultor finalizar a avaliação do caso clínico. O status mudará automaticamente para "avaliado"'
        },
        {
          icon: faComment,
          text:
            'O sistema de mensagens finará habilitado para interação após ativação pelo médico consultor, caso haja dúvidas fundamentais que precisem ser respondidas para conclusão do parecer'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

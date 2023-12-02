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
  faSquareCheck,
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
          icon: faSquareCheck,
          text:
            'Ativação: Para ativar seu caso clínico, por favor clique neste botão, encontrado na coluna "Ação".'
        },
        {
          icon: faBookOpenReader,
          text:
            'Consulta: Consultar caso clínico (disponível após preenchimento e envio do formulário).'
        },
        {
          icon: faFile,
          text:
            'Parecer: O parecer estará disponível para consulta quando o médico consultor finalizar a avaliação do caso clínico. O status mudará automaticamente para "avaliado".'
        },
        {
          icon: faComment,
          text:
            'Mensageria: O sistema de mensagens ficará habilitado para interação após ativação pelo médico consultor, caso haja dúvidas fundamentais que precisem ser respondidas para conclusão do parecer.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

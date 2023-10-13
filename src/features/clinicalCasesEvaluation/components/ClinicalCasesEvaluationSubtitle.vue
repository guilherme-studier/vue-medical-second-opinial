<template>
  <div class="clinical-cases--subtitle">
    <div v-for="item in susbtitleClinicalCases" :key="item.icon">
      <subtitle :icon="item.icon" :text="item.text" />
    </div>
  </div>
</template>

<script>
import iconCheckActive from '@/assets/icons/icon-checked-legend.svg'
import iconFiled from '@/assets/icons/icon-filed.svg'
import iconMessage from '@/assets/icons/icon-message.svg'
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
          icon: iconCheckActive,
          text: 'Para ativar seu caso clínico, por favor clique no botão acima.'
        },
        {
          icon: iconFiled,
          text:
            'O parecer estará disponível para consulta e/ou impressão quando o médico consultor finalizar a avaliação do caso clínico. O status mudará automaticamente para "avaliado"'
        },
        {
          icon: iconMessage,
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

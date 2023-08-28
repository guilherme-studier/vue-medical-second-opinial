<template>
  <div id="clinical-cases-evaluation">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="icon" />
        <h1>{{ doctor }} <span>possui</span> {{ vouchers }} ativos</h1>
      </div>
      <div class="voucher-search">
        <input type="text" v-model="searchTerm" placeholder="Buscar" />
        <img class="search-icon" :src="iconSearch" alt="" />
      </div>
    </div>

    <custom-table
      :tableHeader="tableHeader"
      :tableData="filteredTableData"
      @action="handleCustomTableAction"
    >
      <template v-slot:action="{ item }">
        <img
          :src="value.icon"
          alt="Ícone de Ação"
          @click="value.action(item)"
        />
      </template>
    </custom-table>
  </div>
</template>

<script>
import iconFiled from '@/assets/icons/icon-filed.svg'
import iconMessage from '@/assets/icons/icon-message.svg'
import iconSearch from '@/assets/icons/icon-search.svg'
import iconVoucher from '@/assets/icons/icon-voucher.svg'
import CustomTable from '@/components/customTable'

export default {
  name: 'ClinicalCasesEvaluation',
  components: {
    CustomTable
  },
  data() {
    return {
      icon: iconVoucher,
      iconSearch: iconSearch,
      doctor: 'Dr. Guilherme Studier',
      vouchers: 4,
      tableHeader: ['Casos clínicos', 'Doença', 'Médico', 'Ação'],
      tableData: [
        {
          voucher: '23011014002',
          illness: 'Doença 1',
          doctor: 'Olavo Pereira',
          action: [
            {
              icon: iconFiled,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconMessage,
              handler: () => alert('Função do item 1')
            }
          ]
        },
        {
          voucher: '23011014002',
          illness: 'Doença 2',
          doctor: 'Emilia Souza',
          action: [
            {
              icon: iconFiled,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconMessage,
              handler: () => alert('Função do item 1')
            }
          ]
        },
        {
          voucher: '23011014002',
          illness: 'Doença 3',
          doctor: 'Eduardo Pereira',
          action: [
            {
              icon: iconFiled,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconMessage,
              handler: () => alert('Função do item 1')
            }
          ]
        },
        {
          voucher: '23011014002',
          illness: 'Doença 4',
          doctor: 'Fernando Moura',
          action: [
            {
              icon: iconFiled,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconMessage,
              handler: () => alert('Função do item 1')
            }
          ]
        }
      ],
      searchTerm: ''
    }
  },
  computed: {
    filteredTableData() {
      if (!this.searchTerm) {
        return this.tableData
      }

      const searchTerm = this.searchTerm.toLowerCase()
      return this.tableData.filter((item) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm)
          }
          return false
        })
      })
    }
  },
  methods: {
    handleCustomTableAction(item) {
      alert('Ação do item:', item)
      // Realize a lógica desejada com o item
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

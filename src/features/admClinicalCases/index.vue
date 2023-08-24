<template>
  <div id="adm-clinical-cases">
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
import iconCheckActive from '../../assets/icons/icon-check-active.svg'
import iconCheckInactive from '../../assets/icons/icon-check-inactive.svg'
import iconCloseActive from '../../assets/icons/icon-close-active.svg'
import iconCloseInactive from '../../assets/icons/icon-close-inactive.svg'
import iconSearch from '../../assets/icons/icon-search.svg'
import iconTrashActive from '../../assets/icons/icon-trash-active.svg'
import iconTrashInactive from '../../assets/icons/icon-trash-inactive.svg'
import iconVoucher from '../../assets/icons/icon-voucher.svg'

import CustomTable from '@/components/customTable'

export default {
  name: 'AdmClinicalCases',
  components: {
    CustomTable
  },
  data() {
    return {
      icon: iconVoucher,
      iconSearch: iconSearch,
      doctor: 'Dr. Guilherme Studier',
      vouchers: 4,
      tableHeader: ['Casos Clínicos', 'ID', 'Doença', 'Data', 'Status', 'Ação'],
      tableData: [
        {
          clinicalCases: 'Tratamento Enfermidade ABC',
          id: '001',
          illness: 'Doença 1',
          date: '2016-05-03',
          status: 'Em avaliação',
          action: [
            {
              icon: iconCheckActive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconCloseActive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconTrashActive,
              handler: () => alert('Função do item 1')
            }
          ]
        },
        {
          clinicalCases: 'Tratamento Doença XYZ',
          id: '002',
          illness: 'Doença 2',
          date: '2016-05-03',
          status: 'Em avaliação',
          action: [
            {
              icon: iconCheckActive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconCloseInactive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconTrashInactive,
              handler: () => alert('Função do item 1')
            }
          ]
        },
        {
          clinicalCases: 'Tratamento Enfermidade FG',
          id: '003',
          illness: 'Doença 3',
          date: '2016-05-03',
          status: 'Em avaliação',
          action: [
            {
              icon: iconCheckInactive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconCloseActive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconTrashInactive,
              handler: () => alert('Função do item 1')
            }
          ]
        },
        {
          clinicalCases: 'Tratamento UTI',
          id: '004',
          illness: 'Doença 4',
          date: '2016-05-03',
          status: 'Em avaliação',
          action: [
            {
              icon: iconCheckActive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconCloseActive,
              handler: () => alert('Função do item 1')
            },
            {
              icon: iconTrashActive,
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
#adm-clinical-cases {
  justify-content: center;
  height: fit-content;
  flex-wrap: wrap;
  display: flex;
  width: 100%;

  .title {
    display: flex;
    place-items: flex-end;
    text-align: left;
    color: $green-500;
    width: 100%;
    margin-bottom: 20px;

    .voucher-doctor {
      display: flex;
      place-items: flex-end;
      text-align: left;
      color: $green-500;
      width: 100%;
      margin-bottom: 20px;
      h1 {
        margin-left: 10px;

        span {
          color: $gray-600;
          font-weight: 400;
        }
      }
    }

    .voucher-search {
      position: relative;
      max-width: 280px;
      width: 100%;

      input {
        background-color: $gray;
        padding-right: 30px;
        outline: none;
        border: none;
        margin: 0;
      }

      input::placeholder {
        font-weight: 500;
      }

      .search-icon {
        transform: translateY(-50%);
        position: absolute;
        filter: hue-rotate(180deg);
        right: 10px;
        top: 50%;
      }
    }
  }

  .input-group {
    height: fit-content;
  }
}

.custom-th {
  text-transform: uppercase;
  border: 1px solid $white;
  background: $green-500;
  padding: 20px;
  text-align: center;
  color: white;

  &.custom-th-top-left {
    border-top-left-radius: 10px;
  }

  &.custom-th-top-right {
    border-top-right-radius: 10px;
  }
}

.custom-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  tbody td {
    border: 1px solid $gray-400;
    text-align: center;
    color: $gray-600;
    padding: 20px;
  }
}
</style>

<template>
  <div class="container">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>
          {{ getName }} <span>possui</span> {{ getTotalContent }} casos clínicos
          ativos
        </h1>
      </div>
    </div>

    <el-table
      :data="tableData"
      :height="450"
      style="width: 100%"
      empty-text="Não há dados para serem listados"
      border
      v-loading="isLoading"
    >
      <el-table-column
        prop="voucher"
        label="Casos Clínicos"
        align="center"
      ></el-table-column>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="illness"
        label="Doença"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="Data"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="Status"
        align="center"
      ></el-table-column>
      <el-table-column label="Ação" width="150" align="center">
        <template v-slot="scope">
          <div class="actions">
            <el-tooltip
              class="box-item"
              effect="light"
              content="Aceitar caso clínico"
              placement="top-start"
              ><font-awesome-icon
                :icon="iconCheck"
                @click="accept(scope.row)"
                :class="{
                  'action-disabled': scope.row?.status !== 'Ativo'
                }"
            /></el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              content="Declinar caso clínico"
              placement="top-start"
              ><font-awesome-icon
                :icon="iconX"
                @click="decline(scope.row)"
                :class="{
                  'action-disabled': scope.row?.status !== 'Ativo'
                }"
            /></el-tooltip>
            <el-tooltip
              class="box-item"
              effect="light"
              content="Cancelar caso clínico"
              placement="top-start"
              ><font-awesome-icon
                :icon="iconTrash"
                @click="cancel(scope.row)"
                :class="{
                  'action-disabled': scope.row?.status !== 'Em avaliação'
                }"
            /></el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="getTotalContent"
        :current-page="getPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { faCheck, faX, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters, mapActions } from 'vuex'

import { formatDate } from '@/helpers/date'
import { formatStatus } from '@/helpers/status'

export default {
  name: 'ClinicalCasesConsultationDoctor',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      tableData: [],
      selectedContract: {},
      iconCheck: faCheck,
      iconX: faX,
      iconTrash: faTrash,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters('user', ['getName']),
    ...mapGetters('admClinicalCases', [
      'getClinicalCases',
      'getIcon',
      'getIconSearch',
      'getSearchTerm',
      'getLoading',
      'getTotalPages',
      'getTotalContent',
      'getPage'
    ]),
    isLoading() {
      return this.getLoading
    }
  },
  mounted() {
    this.fetchClinicalCases()
  },
  watch: {
    getClinicalCases: {
      handler(newContracts) {
        // Filter contracts with status 'Ativo' or 'Em avaliação'
        const filteredContracts = newContracts?.filter((contract) =>
          ['ativ', 'emav'].includes(contract?.status)
        )

        // Map the filtered contracts to the tableData
        this.tableData = filteredContracts?.map((contract) => ({
          voucher: contract?.contractName,
          contractId: contract?.contractId,
          id: contract?.id,
          illness: contract?.diseaseName,
          date: formatDate(contract?.createdAt),
          status: formatStatus(contract?.status),
          doctor: contract?.doctorName,
          voucherId: contract?.voucherId,
          opinion: contract?.opinion
        }))
      },
      deep: true
    },
    getPage() {
      this.fetchClinicalCases()
    }
  },
  methods: {
    ...mapActions('admClinicalCases', [
      'fetchClinicalCases',
      'acceptClinicalCase',
      'declineClinicalCase',
      'cancelClinicalCase',
      'updatePage'
    ]),

    accept(row) {
      this.acceptClinicalCase(row.id)
    },
    decline(row) {
      this.declineClinicalCase(row.id)
    },
    cancel(row) {
      this.cancelClinicalCase(row.id)
    },
    handlePageChange(newPage) {
      this.updatePage(newPage)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

.actions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 19px;
  margin: 2px;

  .action-disabled {
    cursor: not-allowed;
    pointer-events: none;
    color: lightgray;
  }

  svg:hover {
    cursor: pointer;
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>

<template>
  <div class="container">
    <div class="title">
      <div class="voucher-doctor">
        <img class="icon-voucher" :src="getIcon" />
        <h1>
          {{ getName }} <span>possui</span> {{ tableData?.length }} casos
          clínicos ativos
        </h1>
      </div>
      <div class="voucher-search">
        <input type="text" v-model="getSearchTerm" placeholder="Buscar" />
        <img class="search-icon" :src="getIconSearch" alt="" />
      </div>
    </div>

    <el-table
      class="consultation-table"
      :data="tableData"
      :height="450"
      style="width: 100%"
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
            <font-awesome-icon :icon="iconCheck" @click="accept(scope.row)" />
            <font-awesome-icon :icon="iconX" @click="decline(scope.row)" />
            <font-awesome-icon :icon="iconTrash" @click="cancel(scope.row)" />
          </div>
        </template>
      </el-table-column>
    </el-table>
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
      iconTrash: faTrash
    }
  },
  computed: {
    ...mapGetters('user', ['getName']),
    ...mapGetters('admClinicalCases', [
      'getClinicalCases',
      'getIcon',
      'getIconSearch',
      'getSearchTerm',
      'getLoading'
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
        this.tableData = newContracts?.map((contract) => ({
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
    }
  },
  methods: {
    ...mapActions('admClinicalCases', [
      'fetchClinicalCases',
      'acceptClinicalCase',
      'declineClinicalCase',
      'cancelClinicalCase'
    ]),

    accept(row) {
      this.acceptClinicalCase(row.contractId)
    },
    decline(row) {
      this.declineClinicalCase(row.contractId)
    },
    cancel(row) {
      this.cancelClinicalCase(row.contractId)
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

  svg:hover {
    cursor: pointer;
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
}
</style>

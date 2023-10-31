<template>
  <div id="custom-table">
    <table :class="{ 'loading-table': loading }" class="table">
      <thead>
        <tr>
          <th
            v-for="(header, index) in tableHeader"
            :key="index"
            class="custom-th"
            :class="{
              'custom-th-top-left': index === 0,
              'custom-th-top-right': index === tableHeader.length - 1
            }"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="body">
        <template v-if="loading">
          <tr>
            <td :colspan="tableHeader.length" class="loading-cell">
              <svg
                class="spinner"
                width="65px"
                height="65px"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="path"
                  fill="none"
                  stroke-width="6"
                  stroke-linecap="round"
                  cx="33"
                  cy="33"
                  r="30"
                ></circle>
              </svg>
            </td>
          </tr>
        </template>
        <template v-else-if="error">
          <tr>
            <td :colspan="tableHeader.length" class="error-cell">
              Ops! Ocorreu um erro durante o processamento dos dados
            </td>
          </tr>
        </template>
        <template v-else-if="tableData?.length === 0 && loading === false">
          <tr>
            <td :colspan="tableHeader.length" class="no-data-cell">
              Não há dados para serem exibidos.
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in tableData" :key="index">
            <td v-for="(value, key) in item" :key="key">
              <template v-if="key === 'action'">
                <div class="action-icons">
                  <div
                    v-for="(iconItem, iconIndex) in value"
                    :key="iconIndex"
                    class="action-icons--item"
                  >
                    <font-awesome-icon
                      :icon="iconItem.icon"
                      :color="getIconColor(iconItem.status)"
                      :style="{
                        cursor: iconItem.status === 0 ? 'auto' : 'pointer'
                      }"
                      @click="
                        handleIconClick(iconItem.status, iconItem.handler, item)
                      "
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                {{ value }}
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div v-if="totalPages > 1" class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Anterior
      </button>
      <ul>
        <li v-for="pageNumber in displayPages" :key="pageNumber">
          <button
            @click="goToPage(pageNumber)"
            :class="{ active: pageNumber === currentPage }"
          >
            {{ pageNumber }}
          </button>
        </li>
      </ul>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'CustomTable',
  components: {
    FontAwesomeIcon
  },
  props: {
    tableHeader: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean
    },
    error: {
      type: Boolean
    },
    color: {
      type: String
    },
    totalPages: {
      type: Number
    },
    currentPage: {
      type: Number
    }
  },
  computed: {
    getIconColor() {
      return (status) => {
        if (status === 1) {
          return '#666'
        } else if (status === 0) {
          return '#ddd'
        } else {
          return '#666'
        }
      }
    },
    displayPages() {
      const currentPage = this.currentPage
      const totalPages = this.totalPages

      if (totalPages <= 2) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }

      if (currentPage <= 1) {
        return [1, 2, '...']
      } else if (currentPage >= totalPages) {
        return ['...', totalPages - 1, totalPages]
      } else {
        return [currentPage - 1, currentPage, currentPage + 1]
      }
    }
  },
  methods: {
    handleIconClick(status, handler, item) {
      if (status === 0) return
      handler(item)
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', {
          currentPage: page,
          totalPages: this.totalPages
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#custom-table {
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: column;

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    font-size: 12px;

    button {
      margin: 5px;
      background-color: $green-400;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    ul {
      list-style: none;
      display: flex;
      padding: 10px;
    }

    li {
      margin: 10px;
    }

    button.active {
      background-color: $green-500;
    }
  }

  .loading-table {
    min-height: 640px;
  }
  .table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    margin: 10px 0;

    .loading-cell,
    .error-cell,
    .no-data-cell {
      text-align: center;
      font-size: 18px;
      padding: 100px;
    }

    .loading-cell {
      color: $gray-600;
    }

    .error-cell {
      color: $gray-600;
    }

    thead td {
      border: 1px solid $gray-400;
      text-align: left;
      color: $gray-600;
      padding: 20px;
      vertical-align: middle;
      text-align: center;
    }

    tbody td {
      border: 1px solid $gray-400;
      text-align: left;
      color: $gray-600;
      padding: 15px;
      vertical-align: middle;
      text-align: center;
    }

    .custom-th {
      text-transform: uppercase;
      font-weight: bold;
      border: 1px solid $white;
      background: $green-500;
      padding: 15px;
      text-align: center;
      color: white;

      &.custom-th-top-left {
        border-top-left-radius: 10px;
      }

      &.custom-th-top-right {
        border-top-right-radius: 10px;
      }
    }
  }

  .action-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &--item {
      display: inline-block;
      cursor: pointer;
      width: 100%;
      height: 100%;

      &:hover {
        box-shadow: 0.1px 0.1px 0.1px rgba(0.1, 0.1, 0.1, 0.1);
      }
    }

    .action-icons--item {
      svg {
        font-size: 22px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

$offset: 187;
$duration: 1.4s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
    colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: $green-500;
  }
  50% {
    stroke: $gray-500;
  }
  75% {
    stroke: $green-500;
  }
  100% {
    stroke: $gray-500;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>

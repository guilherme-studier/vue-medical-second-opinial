<template>
  <div id="custom-table">
    <table class="table">
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
        <template v-else-if="tableData.length === 0">
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
                    <img
                      :src="iconItem.icon"
                      alt="Ícone de Ação"
                      @click="iconItem.handler(item)"
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
  </div>
</template>

<script>
export default {
  name: 'CustomTable',
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
    }
  },
  methods: {
    handleActionClick(item) {
      this.$emit('action', item)
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

  .table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;

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

    tbody td {
      border: 1px solid $gray-400;
      text-align: left;
      color: $gray-600;
      padding: 20px;
      vertical-align: middle;
      text-align: center;
    }

    .custom-th {
      text-transform: uppercase;
      font-weight: bold;
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
  }

  .action-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &--item {
      display: inline-block;
      cursor: pointer;

      img {
        max-height: 22px;
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

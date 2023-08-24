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
      <tbody>
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
  width: 100%;
  .table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;

    tbody td {
      border: 1px solid $gray-400;
      text-align: left;
      color: $gray-600;
      padding: 20px;
      vertical-align: middle;
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
</style>

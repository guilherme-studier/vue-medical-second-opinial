<template>
  <div class="radio-content">
    <div class="radio-items" v-for="(item, index) in items" :key="index">
      <input
        v-model="selectedItem"
        :value="item"
        name="radioOption"
        type="radio"
        :id="index"
      />
      <label :for="index">{{ item.name }}</label>
    </div>
    <div class="btn-save">
      <button @click="saveSelection">Salvar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedItem: null
    }
  },
  methods: {
    saveSelection() {
      console.log('Item selecionado:', this.selectedItem)
      this.$emit('item-selected', this.selectedItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-content {
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  .radio-items {
    margin-bottom: 10px;
  }

  .btn-save {
    text-align: left;
    grid-column: 1 / -1;
    width: 150px;
    place-self: end;
    display: flex;
    margin-top: 15px;
  }
}

.radio-specialty {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

input[type='radio'] {
  margin-right: 10px;
}
</style>

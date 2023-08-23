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
      this.$emit('item-selected', this.selectedItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-content {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 25px;
  display: grid;

  .radio-items {
    margin-bottom: 10px;
  }

  .btn-save {
    grid-column: 1 / -1;
    margin-top: 15px;
    text-align: left;
    place-self: flex-end;
    display: flex;
    width: 150px;
  }
}

input[type='radio'] {
  margin-right: 10px;
  cursor: pointer;
}
</style>

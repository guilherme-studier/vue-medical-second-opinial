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
  display: flex;
  flex-wrap: wrap;

  .radio-items {
    margin-bottom: 15px;
    flex-basis: calc(50%);
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    align-items: start;
    width: 50px;

    label {
      cursor: pointer;
    }
  }

  .btn-save {
    place-content: end;
    margin-top: 30px;
    display: flex;
    width: 100%;

    button {
      width: 100px;
    }
  }
}

input[type='radio'] {
  margin: 3px 10px 0 0;
  cursor: pointer;
}
</style>

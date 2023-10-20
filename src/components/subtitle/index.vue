<template>
  <div id="subtitle">
    <font-awesome-icon :icon="icon" style="color: #008B8F;" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'Subtitle',
  components: {
    FontAwesomeIcon
  },
  props: {
    icon: {
      type: Object,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
#subtitle {
  background-color: #eee;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  padding: 10px;

  p {
    font-size: 12px;
  }

  svg {
    margin-right: 10px;
    width: 15px;
  }
}
</style>

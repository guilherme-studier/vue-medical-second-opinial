<template>
  <div id="specialty">
    <Title :title="titleComponent" />
    <input-group>
      <input-wrapper>
        <v-select
          v-model="selectedInduster"
          :options="specialtyOptions"
          placeholder="Selecione uma especialidade"
        />
      </input-wrapper>
    </input-group>
  </div>
</template>

<script>
import InputWrapper from '@/components/inputWrapper/InputWrapper'
import InputGroup from '@/components/inputGroup/InputGroup'
import Title from '@/components/title/Title'
import vSelect from 'vue-select'

export default {
  name: 'Specialty',
  components: {
    Title,
    vSelect,
    InputGroup,
    InputWrapper
  },
  data() {
    return {
      titleComponent: 'Especialidade',
      specialty: '',
      specialtyOptions: [
        {
          id: '0',
          name: 'Especialidade 0'
        },
        {
          id: '1',
          name: 'Especialidade 1'
        },
        {
          id: '2',
          name: 'Especialidade 2'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#specialty {
  margin-top: 50px;
}
</style>

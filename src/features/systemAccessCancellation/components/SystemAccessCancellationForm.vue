<template>
  <div id="system-access">
    <div class="form" :class="{ 'form-loading': getLoading }">
      {{ getLoading }}
      <InputGroup>
        <InputWrapper>
          <input
            type="text"
            placeholder="CPF"
            class="flexible-input"
            v-model="cpf"
            v-mask="'###.###.###-##'"
            pattern="[0-9]*"
            inputmode="numeric"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Nome"
            class="flexible-input"
            v-model="name"
            :disabled="enabledInput"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="Indústria"
            class="flexible-input"
            v-model="industry"
            :disabled="enabledInput"
          />
        </InputWrapper>
      </InputGroup>

      <div class="save">
        <button @click="handleSave" :disabled="isSaveDisabled">Salvar</button>
      </div>
    </div>
    <div v-if="getLoading">
      <loader-spinner />
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

import InputGroup from '@/components/inputGroup'
import InputWrapper from '@/components/inputWrapper'
import LoaderSpinner from '@/components/loaderSpinner'

export default {
  name: 'SystemAccessCancellationForm',
  components: {
    InputGroup,
    InputWrapper,
    LoaderSpinner
  },
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      industry: null,
      name: null,
      cpf: null
    }
  },
  computed: {
    ...mapGetters('systemAccessCancellation', ['getLoading']),

    enabledInput() {
      return this.cpf === null
    },
    isSaveDisabled() {
      return !this.cpf || !this.name || !this.industry
    }
  },
  methods: {
    ...mapActions('systemAccessCancellation', ['createUser']),

    async handleSave() {
      const userData = {
        industry: this.industry,
        name: this.name,
        cpf: this.cpf
      }

      try {
        await this.createUser(userData)
        this.toast.success(
          'Cancelamento de acesso ao sistema efetuado com sucesso',
          { timeout: 5000 }
        )
      } catch (error) {
        this.toast.warning(
          'Não foi possível realizar cancelamento de acesso ao sistema',
          { timeout: 5000 }
        )
      }
      this.clearForm()
    },
    clearForm() {
      this.cpf = null
      this.name = null
      this.industry = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/index.scss';
</style>

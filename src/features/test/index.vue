<template>
  <div id="apis">
    <!-- <div class="centered-container">
      <button @click="performLogout" class="logout-button">Logout</button>
    </div> -->
    <br />
    <Title title="Especialidade" />
    <h1>Listar especialidades</h1>
    <div class="form">
      <InputGroup>
        <button @click="fetchSpecialty">Listar Especialidades</button>
      </InputGroup>
    </div>
    <br />
    <h1>Criar especialidade</h1>
    <div class="form">
      <InputGroup>
        <input
          type="text"
          placeholder="Nome da Especialidade"
          class="flexible-input"
          v-model="specialtyName"
        />
        <button @click="newSpecialty">Criar Especialidade</button>
      </InputGroup>
    </div>
    <br />
    <h1>Excluir especialidades</h1>
    <div class="form">
      <InputGroup>
        <InputGroup>
          <v-select
            v-model="selectedSpecialty"
            :options="specialties"
            label="name"
            placeholder="Escolha uma especialidade para excluir"
          />
          <button
            class="delete-button"
            :disabled="!disabledDeleteSpecialty"
            @click="specialtyDelete"
          >
            Excluir Especialidade
          </button>
        </InputGroup>
        <pre>{{ specialties }}</pre>
      </InputGroup>
    </div>
    <Title title="Doenças" />
    <h1>Listar doenças</h1>
    <div class="form">
      <InputGroup>
        <button @click="fetchDiseases">Listar Doenças</button>
      </InputGroup>
    </div>
    <br />
    <h1>Criar doenças</h1>
    <div class="form">
      <InputGroup>
        <input
          type="text"
          placeholder="Nome da Doença"
          class="flexible-input"
          v-model="diseaseName"
        />
        <button @click="newDisease">Criar Doença</button>
      </InputGroup>
    </div>
    <br />
    <h1>Excluir doenças</h1>
    <div class="form">
      <InputGroup>
        <InputGroup>
          <v-select
            v-model="selectedDiseases"
            :options="diseases"
            label="name"
            placeholder="Escolha uma especialidade para excluir"
          />
          <button
            class="delete-button"
            :disabled="!disabledDeleteDisease"
            @click="diseaseDelete"
          >
            Excluir Doença
          </button>
        </InputGroup>
        <pre>{{ diseases }}</pre>
      </InputGroup>
    </div>
  </div>
</template>

<script>
import Title from '@/components/title'
import InputGroup from '@/components/inputGroup'
import vSelect from 'vue-select'

import {
  createSpecialty,
  getSpecialties,
  deleteSpecialty
} from '../../services/specialty/index'

import {
  getDiseases,
  createDisease,
  deleteDisease
} from '../../services/disease/index'

export default {
  name: 'IndustryRegistration',
  components: {
    Title,
    vSelect,
    InputGroup
  },
  computed: {
    disabledDeleteSpecialty() {
      return this.selectedSpecialty?.id
    },
    disabledDeleteDisease() {
      return this.selectedDiseases?.id
    }
  },
  data() {
    return {
      specialtyName: '',
      selectedSpecialty: '',
      specialties: '',
      diseases: '',
      selectedDiseases: '',
      diseaseName: ''
    }
  },
  mounted() {
    this.fetchSpecialty()
    this.fetchDiseases()
  },
  methods: {
    newSpecialty() {
      createSpecialty(this.specialtyName)
        .then((response) => {
          // Atualizar a resposta da API no estado
          this.specialtyResponse = JSON.stringify(response.data, null, 2)
        })
        .catch((error) => {
          this.specialtyResponse = 'Erro ao criar a especialidade'
          console.error('Erro ao criar a especialidade:', error)
        })
        .finally(() => {
          this.specialtyName = ''
          this.fetchSpecialty()
        })
    },

    fetchSpecialty() {
      getSpecialties()
        .then((response) => {
          // Atualizar a resposta das especialidades no estado
          this.specialties = response.data.content
        })
        .catch((error) => {
          this.specialties = 'Erro ao buscar as especialidades'
          console.error('Erro ao buscar as especialidades:', error)
        })
    },
    specialtyDelete() {
      console.log(this.selectedSpecialty)
      deleteSpecialty(this.selectedSpecialty?.id)
        .then((response) => {
          console.log(response)
        })
        .finally(() => {
          this.fetchSpecialty()
        })
    },
    fetchDiseases() {
      getDiseases()
        .then((response) => {
          // Atualizar a resposta das especialidades no estado
          this.diseases = response.data.content
        })
        .catch((error) => {
          this.diseases = 'Erro ao buscar as especialidades'
          console.error('Erro ao buscar as especialidades:', error)
        })
    },

    newDisease() {
      createDisease(this.diseaseName)
        .then((response) => {
          // Atualizar a resposta da API no estado
          this.diseaseResponse = JSON.stringify(response.data, null, 2)
        })
        .catch((error) => {
          this.diseaseResponse = 'Erro ao criar a especialidade'
          console.error('Erro ao criar a especialidade:', error)
        })
        .finally(() => {
          this.diseaseName = ''
          this.fetchDiseases()
        })
    },

    diseaseDelete() {
      deleteDisease(this.selectedDiseases?.id)
        .then((response) => {
          console.log(response)
        })
        .finally(() => {
          this.fetchDiseases()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#apis {
  justify-content: center;
  flex-wrap: wrap;
  display: block;
  width: 50%;
}

.delete-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  max-width: 250px;
}

.logout-button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.form {
  flex-direction: column;
  margin-top: 20px;
  display: flex;
  width: 100%;

  .save {
    place-self: end;
    display: flex;
    width: 150px;
  }
}

.full-width {
  grid-column: 1 / -1;
}
</style>

<template>
  <div id="apis">
    <br />
    <Title title="Especialidade" />
    <h1>Listar especialidades</h1>
    <div class="form">
      <InputGroup>
        <button @click="fetchSpecialties">Listar Especialidades</button>
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
            :options="getSpecialties"
            label="name"
            placeholder="Escolha uma especialidade para excluir"
          />
          <button
            class="delete-button"
            @click.prevent="deleteSpecialtyById(selectedSpecialty?.id)"
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
        <button @click="newDisease">
          Criar Doença
        </button>
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
            @click.prevent="deleteDiseaseById(selectedSpecialty?.id)"
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
import InputGroup from '@/components/inputGroup'
import { mapGetters, mapActions } from 'vuex'
import Title from '@/components/title'
import vSelect from 'vue-select'

export default {
  name: 'IndustryRegistration',
  components: {
    Title,
    vSelect,
    InputGroup
  },
  computed: {
    ...mapGetters('specialty', ['getSpecialties'])
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
    this.fetchSpecialties()
    this.fetchDiseases()
  },
  methods: {
    ...mapActions('specialty', [
      'deleteSpecialtyById',
      'createNewSpecialty',
      'fetchSpecialties'
    ]),

    ...mapActions('disease', [
      'deleteDiseaseById',
      'createNewDisease',
      'fetchDiseases'
    ]),

    newSpecialty() {
      if (this.specialtyName.trim() !== '') {
        this.createNewSpecialty(this.specialtyName)
        this.specialtyName = ''
      }
    },
    newDisease() {
      if (this.diseaseName.trim() !== '') {
        this.createNewDisease(this.diseaseName)
        this.diseaseName = ''
      }
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

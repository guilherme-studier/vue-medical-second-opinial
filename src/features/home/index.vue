<template>
  <div id="home" v-loading="getLoading">
    <signature v-if="getName" :name="getName" class="signature" />
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Atualização de Dados Cadastrais" name="1">
          <div>
            Consistent with real life: in line with the process and logic of
            real life, and comply with languages and habits that the users are
            used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such
            as: design style, icons and texts, position of elements, etc.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Casos Clínicos Designados" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            elements of the page.
          </div>
        </el-collapse-item>
        <el-collapse-item title="Ativação de Caso Clínico" name="3">
          <div>
            Simplify the process: keep operating process simple and intuitive;
          </div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the
            users can quickly understand and make decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which
            helps the users to identify and frees them from memorizing and
            recalling.
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Signature from '@/features/home/components/signature/Signature'

export default {
  name: 'Home',
  components: {
    Signature
  },
  data() {
    return {
      title: 'Conheça a MeSO e suas funcionalidades'
    }
  },
  computed: {
    ...mapGetters('home', [
      'getDoctorName',
      'getDataBoxes',
      'getLoading',
      'getError'
    ]),
    ...mapGetters('user', ['getName'])
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions('user', ['getUser'])
  }
}
</script>

<style scoped>
@import './styles/index.scss';

.demo-collapse {
  margin: 30px 0;
}
</style>

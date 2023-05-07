vue```
<template>
  <div class="admin-layout">
    <div class="admin-layout--menu">
      <MenuAdmin :active="page" />
    </div>
    <div class="admin-layout--content">
      <div class="admin-layout--navbar">
        <!-- BRADCRUMP -->
        <Paragraph size="40" weight="medium">
          Você está em: <strong>{{ page }}</strong>
        </Paragraph>
      </div>
      <div class="admin-layout--container">
        <!-- CONTEÚDO -->
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Paragraph from '@/components/Paragraph'
import MenuAdmin from '@/components/_base/MenuAdmin'

import { mapActions, mapGetters } from 'vuex'

import { deleteCookie, getAuthCookieName } from '../helpers/auth'

export default {
  name: 'AdminLayout',
  components: {
    MenuAdmin,
    Paragraph
  },
  props: {
    /** Nome da página */
    page: {
      type: String,
      default: 'Página'
    }
  },
  computed: {
    ...mapGetters('user', ['getFirstName', 'getLastName', 'getEmail'])
  },
  methods: {
    /** Deslogar o usuário */
    signOut() {
      /** Exclui o cookie */
      deleteCookie(getAuthCookieName())

      /** Limpa o token da store */
      this.$store.dispatch('setAuthToken', null)

      /** Seta a flag de token expirado */
      this.$store.dispatch('setIsTokenExpired', true)

      /** Redirecionar para a tela de login */
      window.location = '/login'
    },
    
    /** Recarregar os dados do usuário */
    ...mapActions('user', ['requestUserData'])
  }
}
</script>

<style lang="scss" scoped></style>

```
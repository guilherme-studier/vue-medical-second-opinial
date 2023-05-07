import Vue from 'vue'
import VueRouter from 'vue-router'
import { getCurrentUserAccess } from '@/helpers/auth'

/** Exemplo de importação de telas
import Login from '@/views/Login'
*/

Vue.use(VueRouter)

const routes = [
  /** Exemplos de rotas 
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresNotAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    }
  */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_PATH,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

const DEFAULT_TITLE = 'Concordanciador'
router.beforeEach((to, from, next) => {
  /**
   * Use next tick to handle router history correctly
   * see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
   */

  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE
    /** Se requer autenticação */
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const token = getCurrentUserAccess()
      if (!token) {
        window.location = '/login'
        return false
      } else {
        next()
      }
    }
    /** Se não requer autenticação */
    if (to.matched.some((record) => record.meta.requiresNotAuth)) {
      const token = getCurrentUserAccess()
      if (token) {
        /** Redireciona para a home do letsbook antigo */
        this.$router.push({ path: '/' })
        return false
      } else {
        next()
      }
    }

    next()
  })
})

export default router

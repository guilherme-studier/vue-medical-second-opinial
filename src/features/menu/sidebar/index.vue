<template>
  <div class="sidebar-menu">
    <div :class="['nav-sidebar', { active: active }]">
      <div class="header-logo">
        <transition name="fade">
          <img
            v-if="active"
            :class="{ 'collapsed-sidebar': !active }"
            :src="logo"
            alt="logo-ceos"
            @click.prevent="goHome"
          />
        </transition>
      </div>
      <div class="menu">
        <div :class="['nav-list', { active: active }]">
          <div class="scrollMenuItems">
            <div
              class="menu-item-divider"
              v-for="item in menuItems"
              :key="item.id"
            >
              <router-link
                :to="item.route"
                class="menu-item"
                :class="{
                  active: item.route === $route.path,
                  'collapsed-menu': !active
                }"
              >
                <div class="menu-item-content">
                  <div class="menu-item-text">{{ item.name }}</div>
                </div>
              </router-link>
            </div>
            <button class="toggle-button" @click="toggleMenu">
              <font-awesome-icon
                :icon="toggleIcon"
                :style="{ color: iconColor }"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/logo-ceos.png'

export default {
  name: 'SidebarMenu',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      active: true,
      logo: logo,
      menuItems: [
        {
          id: 1,
          name: 'Início',
          route: '/'
        },
        {
          id: 2,
          name: 'Cadastro Indústria',
          route: '/induster'
        },
        {
          id: 3,
          name: 'Registro de Contrato e Geração de Casos Clínicos',
          route: '/registration-clinical-cases'
        },
        {
          id: 4,
          name: 'Consulta Casos Clínicos',
          route: '/cosultation-clinical-cases'
        },
        {
          id: 5,
          name: 'Geração de Convite para Médico Consultor',
          route: '/consultant-doctor'
        },
        {
          id: 6,
          name: 'Cancelamento de Acesso ao Sistema',
          route: '/access-cancellation'
        },
        {
          id: 7,
          name: 'Cadastro Médico Consultor',
          route: '/medical-registration'
        },
        {
          id: 8,
          name: 'Cadastro',
          route: '/registration'
        },
        {
          id: 8,
          name: 'Administração de Casos Clínicos Designados',
          route: '/adm-clinical-cases'
        },
        {
          id: 9,
          name: 'Atribuição de Casos Clínicos',
          route: '/allocation-clinical-cases'
        },
        {
          id: 10,
          name: 'Cadastro Representante',
          route: '/representative-registration'
        },
        {
          id: 11,
          name: 'Casos Clínicos Designados',
          route: '/clinical-cases-evaluation'
        }
      ],
      toggleIcon: faChevronLeft,
      iconColor: 'white'
    }
  },
  methods: {
    toggleMenu() {
      // eslint-disable-next-line no-self-assign
      this.active = !this.active
      this.toggleIcon = this.active ? faChevronLeft : faChevronRight
    },
    goHome() {
      return router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

<template>
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
            v-for="(item, index) in menuItemsWithLogout"
            :key="item.id || index"
          >
            <router-link
              v-if="item.route"
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
            <a
              v-else
              @click="item.action === 'logout' ? logout() : null"
              :class="{
                'menu-item': true,
                'collapsed-menu': !active,
                'logout-item': item.action === 'logout' // Adicione uma classe específica para o item de Logout
              }"
            >
              <div class="menu-item-content">
                <div class="menu-item-text">{{ item.name }}</div>
              </div>
            </a>
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
</template>

<script>
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapGetters, mapActions } from 'vuex'

import logo from '../../../assets/logo-ceos.png'
import { routes } from '../../../helpers/routes'

import router from '@/router'

export default {
  name: 'SidebarMenu',

  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      active: true,
      logo: logo,
      toggleIcon: faChevronLeft,
      iconColor: '$green-500'
    }
  },

  computed: {
    ...mapGetters(['getRole']),

    typeUser() {
      return this.getRole
    },
    menuItemsWithLogout() {
      const userType = this.getRole?.replace('_', '')
      const menuItems = routes[userType] || []
      // Adicione o item de logout ao final da lista
      menuItems.push({ name: 'Logout', action: 'logout' })
      return menuItems
    }
  },
  methods: {
    ...mapActions(['logoutUser']),

    toggleMenu() {
      this.active = !this.active
      this.toggleIcon = this.active ? faChevronLeft : faChevronRight
    },

    goHome() {
      return router.push('/')
    },

    logout() {
      return this.logoutUser()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>

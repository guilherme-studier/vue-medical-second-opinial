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
          name: 'Administração de Vouchers',
          route: '/voucher-administration'
        },
        {
          id: 9,
          name: 'Atribuição de Vouchers',
          route: '/voucher-allocation'
        },
        {
          id: 10,
          name: 'Cadastro Representante',
          route: '/representative-registration'
        },
        {
          id: 11,
          name: 'Vouchers em avaliação',
          route: '/vouchers-evaluation'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.collapsed-menu .menu-item-content,
.collapsed-menu .menu-item-text {
  display: none;
}
.nav-sidebar {
  background: $gray-500;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transition: width 0.8s ease;
  width: 64px;
  z-index: 150;
  overflow: visible;

  &.active {
    width: 20%;
  }

  .menu {
    background: $gray-500;
    height: 100%;
    z-index: 101;
  }

  .header-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 76px 76px 96px 76px;
    width: 190.8px;
    height: 94.2px;

    &.collapsed-sidebar {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .nav-list {
    align-items: baseline;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 135px);
    .scrollMenuItems {
      align-self: center;
      height: 90%;
    }

    &.active {
      overflow-y: auto;
      overflow-x: hidden;
      .scrollMenuItems {
        width: 100%;
        overflow-x: hidden;
      }
    }
  }

  .menu-item {
    position: relative;

    &:not(.active):hover {
      color: $green-500;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 10px;
        background-color: $green-500;
      }
    }
  }

  .menu-item:hover {
    color: $green-500;
    transition: background 0.3s;
  }

  .menu-item.active {
    color: $green-500;
  }

  .menu-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 10px;
    background-color: $green-500;
  }

  .toggle-button {
    position: absolute;
    top: 28px; /* Nova posição: no canto superior */
    right: -16px;
    transform: translate(0, -50%);
    background: $green-500;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    z-index: 100;

    &.menu-open {
      animation: rotateIcon 0.5s forwards;
    }

    @keyframes rotateIcon {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(180deg);
      }
    }
  }
}

.menu-item-divider {
  position: relative;
  border-bottom: 1px solid rgba(112, 112, 112, 0.35);
}

.menu-item-divider:first-child {
  border-top: 1px solid rgba(112, 112, 112, 0.35);
}

.menu-item-content {
  max-width: 245px;
  line-height: 22px;
  flex-wrap: wrap;
  padding: 20.5px 0;
}

.menu-item-text {
  font-weight: bold;
  margin-left: 44px;
  align-self: flex-start;
}
</style>

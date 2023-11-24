<template>
  <div class="header">
    <img :src="banner" alt="Imagem" class="header-image" />

    <div class="container">
      <h1 class="header-title">
        {{ user }}
      </h1>
      <h1>
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import bannerAdmin from '../../../assets/ceos-header.png'
import bannerConsultantdoctor from '../../../assets/consultant-header.png'
import bannerClientdoctor from '../../../assets/doctor-header.png'
import bannerAgent from '../../../assets/representant-header.png'

import { formatTypeUser } from '@/helpers/typeUser'

export default {
  name: 'Header',
  data() {
    return {
      bannerOptions: {
        admin: bannerAdmin,
        consultantdoctor: bannerConsultantdoctor,
        clientdoctor: bannerClientdoctor,
        agent: bannerAgent
      }
    }
  },
  computed: {
    ...mapGetters(['getRole']),
    ...mapGetters('user', ['getType']),

    banner() {
      const userType = this.getRole?.replace('_', '')
      return this.bannerOptions[userType] || []
    },

    title() {
      return this.$route?.meta?.title
    },

    user() {
      return formatTypeUser(this.getType)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  .header-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 250px;
    object-fit: cover;
    position: relative;
    z-index: inherit;
  }

  .container {
    .header-title {
      position: absolute;
      top: -154px;
      left: 31px;
    }
    h1 {
      position: absolute;
      bottom: 35px;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      color: $green-500;
    }

    @media (min-width: 700px) and (max-width: 1100px) {
      main {
        margin-left: 98px;
      }
    }
  }
}
</style>

<template>
  <div id="registration">
    <doctor-registration />
    <registration-data />
  </div>
</template>

<script>
// components
import DoctorRegistration from '../registration/components/DoctorRegistration'
import RegistrationData from '../registration/components/RegistrationData'

export default {
  name: 'Registration',
  components: {
    DoctorRegistration,
    RegistrationData
  }
}
</script>

<style lang="scss" scoped>
#registration {
  justify-content: center;
  margin-bottom: 100px;
  flex-wrap: wrap;
  display: block;
  width: 100%;
}
</style>

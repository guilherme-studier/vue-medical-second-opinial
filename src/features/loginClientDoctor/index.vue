<template>
  <div class="login-client-doctor-container">
    <div class="banner-container">
      <img
        :src="banner"
        alt="Login Client Doctor Banner"
        class="banner-image"
      />
    </div>
    <div class="text-container">
      <h1>MeSO - Medical Second Opinion</h1>
      <p>
        Seja muito bem-vindo(a) à plataforma Medical Second Opinion - MeSO.<br />
        Por meio da plataforma MeSO você terá a oportunidade de analisar um caso
        clínico junto a um de nossos consultores médicos especialistas,
        auxiliando-o na avaliação sobre o diagnóstico e manejo do paciente
        envolvido.
      </p>
      <p>
        Todo o processo será realizado via plataforma MeSO, com total sigilo e
        segurança dos dados trocados durante o processo, resguardando a
        privacidade dos pacientes envolvidos, de acordo com a legislação
        vigente.
      </p>
      <p>
        Por favor, digite no campo abaixo o e-mail que você informou ao
        representante de nossa indústria parceira que ele lhe forneceu este
        link. Em breve lhe enviaremos um e-mail com instruções para seu
        cadastramento na plataforma MeSO.
      </p>
    </div>
  </div>
</template>

<script>
import loginClientDoctorBanner from '../../assets/background-login-client-doctor.png'

export default {
  name: 'LoginClientDoctor',
  data() {
    return {
      banner: loginClientDoctorBanner
    }
  }
}
</script>

<style lang="scss" scoped>
.login-client-doctor-container {
  display: flex;
  height: 100vh; /* 100% of the viewport height */
  overflow: hidden; /* Hide overflow to prevent scrolling */
}

.banner-container {
  flex: 1; /* Take up all available space in the flex container */
  overflow: hidden; /* Hide overflow to prevent scrolling */
}

.banner-image {
  width: 100%; /* Make sure the image takes up the full width of the container */
  height: 100%; /* Make sure the image takes up the full height of the container */
  object-fit: cover; /* Ensure the image covers the entire container without distorting */
}

.text-container {
  flex: 1; /* Take up the remaining space in the flex container */
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  padding: 20px 50px;

  h1 {
    font-size: 28px;
    color: $green-500;
    margin-bottom: 20px;
  }

  p {
    font-size: 21px;
    line-height: 24px;
    margin-bottom: 15px;
  }
}
</style>

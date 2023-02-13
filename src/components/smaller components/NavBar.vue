<script setup>
import { useStore } from '../../state/store'
const store = useStore()

</script>

<template>
  <div class="navBarDesk">


    <a id='logoLink' href="https://www.d-tt.nl/"><img class="logoimg" src="../../assets/slices/img_logo_dtt@3x.png"
        alt="logoDTT" />
    </a>

    <h2 class="navBut1" :class="[store.activeTab === 'about' ? 'inactive' : '']">

      <router-link to="/" @click='store.activeTab = "home", store.deselectHouse()'>
        Houses
      </router-link>
    </h2>
    <h2 class="navBut2" :class="[store.activeTab === 'home' ? 'inactive' : '']">

      <router-link to="/about" @click='store.activeTab = "about", store.deselectHouse()'>
        About
      </router-link>
    </h2>


  </div>

  <div class="navBarMob">
    <router-link to="/">
      <img v-if="store.activeTab === 'home'" src="../../assets/slices/ic_mobile_navigarion_home_active@3x.png"
        alt="home" />
      <img v-else src="../../assets/slices/ic_mobile_navigarion_home@3x.png" alt="home"
        @click='store.activeTab = "home", store.deselectHouse()' />

    </router-link>
    <router-link to="/about">
      <img v-if="store.activeTab === 'about'" src="../../assets/slices/ic_mobile_navigarion_info_active@3x.png"
        alt="about" />
      <img v-else src="../../assets/slices/ic_mobile_navigarion_info@3x.png" alt="about"
        @click='store.activeTab = "about", store.deselectHouse()' />
    </router-link>

  </div>
</template>
<style scoped>
.navBarDesk {
  background-color: var(--element-BACKGROUND);

  display: grid;
  grid-template-columns: 1fr 150px 1fr 1fr 3fr;
  align-items: center;
  justify-items: center;
  grid-template-areas: '. logo nav1 nav2 .';
}

#logoLink {
  grid-area: logo;

}

.logoimg {
  justify-self: center;
  width: 80%;
  /* 
  transform: scale(0.24); */
}

.navBarDesk .navBut1 {
  grid-area: nav1;
}

.navBarDesk .navBut1.inactive a {
  color: var(--element-TERTIARY);
}

.navBarDesk .navBut2.inactive a {
  color: var(--element-TERTIARY);
}

.navBarDesk .navBut2 {
  grid-area: nav2;
}


.navBarDesk a {
  text-decoration: none;
  color: var(--text-PRIMARY);
}



.navBarMob {
  display: none;
}


@media (max-width: 500px) {
  .navBarMob {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: var(--element-BACKGROUND);
    position: fixed;
    bottom: 0;
    z-index: 99;
  }

  .navBarMob img {
    width: 30px;
    margin: 10px;
  }

  .navBarDesk {
    display: none;
  }
}
</style>

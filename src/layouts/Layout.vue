<template>
  <div ref="app" class="h-screen w-full bg-base-300 relative flex flex-col flex-nowrap overflow-hidden">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <TheHeader />
    <div class="h-full w-full relative flex-shrink">
      <router-view v-slot="{ Component, route }">
        <transition name="page">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
      <TheToasts />
    </div>
    <TheDrawer :showAdds="showAdds" />
  </div>
</template>

<script lang="ts">
import TheHeader from '@/components/shared/TheHeader.vue';
import TheToasts from '@/components/shared/TheToasts.vue';
import TheDrawer from '@/components/shared/TheDrawer.vue';
import { RouterView } from 'vue-router'
import { initializeAdMob, showAdMobBanner } from '@/services/capacitor/admob';
export default {
  components: {
    TheHeader,
    TheToasts,
    TheDrawer,
    RouterView
  },
  data() {
    return {
      showAdds: false
    }
  },
  methods: {
    async loadAppAds() {
      await initializeAdMob()
      showAdMobBanner(this.updateLayoutApp)
    },
    updateLayoutApp() {
      this.showAdds = true
    },
  },
  mounted() {
    this.loadAppAds()
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  position: fixed;
  transition: 0.5s ease;
}

.page-enter-from {
  transform: translateY(100vh);
  opacity: 0;
}

.page-leave-to {
  transform: translateY(-100vh);
  opacity: 0;
}
</style>
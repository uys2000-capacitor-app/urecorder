<template>
  <router-view v-slot="{ Component }">
    <transition name="layout">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  },
  methods: {
    setTheme(theme: string) {
      localStorage.setItem("theme", theme);
      document.body.setAttribute("data-theme", theme);
    },
  },
  beforeMount() {
    const theme = localStorage.getItem("theme");
    if (theme) this.setTheme(theme)

  }
}
</script>


<style>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
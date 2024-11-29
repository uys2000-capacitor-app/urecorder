<template>
  <header class="px-4 pt-4 sticky top-0 z-10 flex-shrink-0">
    <div class="bg-neutral text-neutral-content flex justify-between items-center p-4 rounded-box">
      <label for="drawer" aria-label="open sidebar" class="material-symbols-outlined cursor-pointer select-none">
        menu
      </label>
      <span>URecorder</span>

      <div>
        <ThemeBtn />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import ThemeBtn from '../daisy/ThemeBtn.vue';

export default {
  components: { RouterLink, ThemeBtn },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
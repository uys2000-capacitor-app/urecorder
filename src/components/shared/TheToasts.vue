<template>
  <div class="absolute top-4 right-4 flex flex-col gap-2">
    <template v-for="toast in appStore.toasts">
      <div class="overflow-hidden max-w-xs bg-success text-success-content p-1 rounded-box">
        {{ toast.message }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';

export default {
  data() {
    return {
      appStore: useAppStore()
    }
  }
}
</script>
<template>
  <div class="flex flex-col gap-2 text-center">
    <div class="u-record-animation flex gap-2 h-14">
      <div :class="{ 'bar-animation': status != 'NONE', 'pause': status == 'PAUSED' }" class="bar"></div>
      <div :class="{ 'bar-animation': status != 'NONE', 'pause': status == 'PAUSED' }" class="bar delay"></div>
      <div :class="{ 'bar-animation': status != 'NONE', 'pause': status == 'PAUSED' }" class="bar"></div>
      <div :class="{ 'bar-animation': status != 'NONE', 'pause': status == 'PAUSED' }" class="bar delay"></div>
      <div :class="{ 'bar-animation': status != 'NONE', 'pause': status == 'PAUSED' }" class="bar"></div>
    </div>
    <div>
      {{ duration }}
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';

export default {
  props: {
    duration: {
      type: String,
      default: "00:00:00"
    },
    status: {
      type: String as PropType<"RECORDING" | "PAUSED" | "NONE">,
      default: false
    }
  },
}
</script>
<style scoped>
@keyframes bar-animation {
  0% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(0.5);
  }

  100% {
    transform: scaleY(1);
  }
}


.bar {
  @apply bg-primary w-2 h-14;
  transition: 4000ms;
}

.pause {
  animation-play-state: paused;
}

.bar-animation {
  animation-name: bar-animation;
  animation-duration: 2000ms;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}


.delay {
  animation-delay: 1000ms;
}
</style>
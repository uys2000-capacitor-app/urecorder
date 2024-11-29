<template>
  <div class="flex flex-col gap-4 w-full items-center relative">
    <div class="h-20 w-full flex justify-center">
      <Transition name="controller-slide">
        <template v-if="audio">
          <audio controls>
            <source :src="audio">
          </audio>
        </template>
      </Transition>
    </div>
    <div class="ur-controller relative w-full flex justify-center items-center">
      <Transition name="controller-slide">
        <template v-if="status == 'NONE'">
          <div class="gap-4 flex justify-center items-center">
            <span class="w-[60px] h-[60px] relative">
              <Transition name="controller-slide">
                <template v-if="record">
                  <span class="material-symbols-outlined cursor-pointer select-none text-6xl text-secondary"
                    @click="() => $emit('remove')">
                    delete
                  </span>
                </template>
              </Transition>
            </span>
            <span class="material-symbols-outlined cursor-pointer select-none text-6xl text-primary"
              @click="() => $emit('start')">
              radio_button_checked
            </span>
            <span class="w-[60px] h-[60px] relative">
              <Transition name="controller-slide">
                <template v-if="record">
                  <span class="material-symbols-outlined cursor-pointer select-none text-6xl text-secondary"
                    @click="() => $emit('save')">
                    save
                  </span>
                </template>
              </Transition>
            </span>
          </div>
        </template>
        <template v-else>
          <div class="gap-2 flex justify-center items-center">
            <span class="material-symbols-outlined cursor-pointer select-none text-6xl text-primary"
              @click="() => $emit('stop')">
              stop
            </span>
            <span class="w-[60px] h-[60px] relative">
              <Transition name="controller-slide">
                <template v-if="status == 'PAUSED'">
                  <span class="material-symbols-outlined cursor-pointer select-none text-6xl text-primary"
                    @click="() => $emit('resume')">
                    resume
                  </span>
                </template>
                <template v-else>
                  <span class="material-symbols-outlined cursor-pointer select-none text-6xl text-primary"
                    @click="() => $emit('pause')">
                    pause
                  </span>
                </template>
              </Transition>
            </span>
          </div>
        </template>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import type { RecordingDataValue } from '@/services/capacitor/recorder';
import { Transition, type PropType } from 'vue';

export default {
  components: { Transition },
  emits: ["update:modelValue", "start", "pause", "stop", "resume", "remove", "save"],
  props: {
    record: {
      type: Object as PropType<null | RecordingDataValue>,
      default: ""
    },
    audio: {
      type: String,
      default: ""
    },
    status: {
      type: String as PropType<"RECORDING" | "PAUSED" | "NONE">,
      default: false
    }
  },
}
</script>

<style scoped>
.controller-slide-enter-active {
  transition: all 0.3s ease-out;
}

.controller-slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  position: absolute;
}

.controller-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.controller-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
  position: absolute;
}
</style>
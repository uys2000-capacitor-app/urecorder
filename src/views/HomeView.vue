<template>
  <div class="h-page w-full flex flex-col justify-center items-center pt-20">
    <div class="w-full h-1/2 min-h-20 max-h-96 flex flex-col justify-between items-center">
      <Bar :status="status" :audio="audio" :duration="timerStore.asString" />
      <Controller :status="status" :record="record" :audio="audio" @start="start" @stop="stop" @pause="pause"
        @resume="resume" @remove="remove" @save="save" />
      <a ref="download" download style="display: none;"></a>
    </div>
  </div>
</template>


<script lang="ts">
import Bar from '@/components/recorder/Bar.vue';
import Controller from '@/components/recorder/Controller.vue';
import { writeFile } from '@/services/capacitor/filesystem';
import { addNotificationListener, checkManageOverlayPermission, checkPermissions, moveToForeground, removeAllListeners, requestManageOverlayPermission, requestPermissions, startForegroundService, stopForegroundService } from '@/services/capacitor/foreground';
import { canDeviceVoiceRecord, getAudioString, getCurrentStatus, hasAudioRecordingPermission, pauseRecording, requestAudioRecordingPermission, resumeRecording, startRecording, stopRecording, type RecordingDataValue } from '@/services/capacitor/recorder';
import { useAppStore } from '@/stores/app';
import { useTimerStore } from '@/stores/timer';
import { Capacitor } from '@capacitor/core';

export default {
  components: {
    Bar,
    Controller
  },
  data() {
    return {
      appStore: useAppStore(),
      timerStore: useTimerStore(),
      status: "NONE" as "RECORDING" | "PAUSED" | "NONE",
      record: null as null | RecordingDataValue,
      audio: "",
    }
  },
  methods: {
    async startRecording() {
      if (!await canDeviceVoiceRecord.uLog()) return false;

      if (!await hasAudioRecordingPermission.uLog() && !await requestAudioRecordingPermission.uLog())
        return false

      return await startRecording.uLog()
    },
    async startForeground() {
      if (!await checkPermissions.uLog() && !await requestPermissions.uLog()) return false
      const options = {
        buttons: [{ id: 1, title: 'Stop' }],
        body: 'You can stop the recording',
        title: 'Recording...',
        id: 12398473,
        smallIcon: 'push_icon',
      }
      const result = await startForegroundService(options)
      return result
    },
    async start() {
      this.record = null;
      this.audio = ""
      if (await this.startRecording())
        if (Capacitor.getPlatform() == "web" || await this.startForeground.uLog()) {
          this.timerStore.clear()
          this.timerStore.start()
          this.status = "RECORDING";
        } else stopRecording.uLog()
      else {
        this.appStore.addToast({ message: "Failed to start recording", id: Date.now(), timeout: 2000 })
      }
    },
    async stop() {
      this.record = await stopRecording.uLog()
      if (Capacitor.getPlatform() != "web")
        stopForegroundService.uLog().catch(() => "")
      if (this.record) {
        this.audio = getAudioString(this.record)
        this.timerStore.stop()
        this.status = "NONE";
      }
    },
    async pause() {
      await pauseRecording()
      this.timerStore.stop()
      this.status = "PAUSED";
    },
    async resume() {
      await resumeRecording()
      this.timerStore.start()
      this.status = "RECORDING";
    },
    async remove() {
      this.record = null
      this.audio = ""
      this.timerStore.clear()
    },
    async save() {
      if (!this.record) return
      const date = new Date()
      const dateText = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      const timeText = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
      const extension = this.record.mimeType.split("/")[1].split(";")[0]
      const file = `Record ${dateText} ${timeText}.${extension}`
      if (Capacitor.getPlatform() == "web") {
        const link = this.$refs.download as HTMLAnchorElement
        link.href = getAudioString(this.record)
        link.download = file
        link.click()
      } else {
        await writeFile(file, this.record.recordDataBase64)
      }
      this.appStore.addToast({ message: `Saved as "${file}"`, id: Date.now(), timeout: 2000 })
      this.record = null
    }
  },
  async mounted() {
    this.status = await getCurrentStatus()
    if (Capacitor.getPlatform() == "web") {
      removeAllListeners()
      addNotificationListener(e => this.stop())
    }
  },
}
</script>

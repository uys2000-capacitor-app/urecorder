<template>
  <div class="drawer-side absolute z-50">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="bg-base-200 text-base-content min-h-full w-2/3 p-4 flex flex-col" :class="{ 'pb-20': showAdds }">
      <div class="mt-4">App Info</div>
      <div class="divider"></div>
      <ul class="menu bg-base-200 rounded-box w-full p-0 m-0 gap-1">
        <li class="bg-base-100"><a href="https://urecorder.mehmetuysal.dev">Web Page</a></li>
        <li class="bg-base-100"><a href="https://urecorder.mehmetuysal.dev/privacy">Privacy Policy</a></li>
        <li class="bg-base-100"><a href="https://github.com/uys2000-projects/URecorder">Source Code</a></li>
      </ul>
      <div class="divider"></div>
      <div>Developer Info</div>
      <div class="divider"></div>
      <ul class="menu bg-base-200 rounded-box w-full p-0 m-0 gap-1">
        <li class="bg-base-100"><a href="">Mehmet Uysal</a></li>
        <li class="bg-base-100"><a href="https://mehmetuysal.dev">Web Page</a></li>
        <li class="bg-base-100"><a href="mailto:hi@mehmetuysal.dev">hi@mehmetuysal.dev</a></li>
      </ul>
      <div class="alert alert-info mt-auto text-left">
        Files are saved to `Documments/URecorder` you can access them via any music player or file explorer.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    showAdds: {
      type: Boolean,
      default: false
    }
  }
}
</script>
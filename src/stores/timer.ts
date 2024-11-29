import { defineStore } from "pinia";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    hr: 0,
    mn: 0,
    sn: 0,
    timer: 0,
  }),
  actions: {
    get() {
      return [this.hr, this.mn, this.sn];
    },
    set(times: [number, number, number]) {
      this.hr = times[0];
      this.mn = times[1];
      this.sn = times[2];
    },
    timerEvent() {
      this.sn++;
      if (this.sn == 60) {
        this.sn = 0;
        this.mn++;
      }
      if (this.mn == 60) {
        this.mn = 0;
        this.hr++;
      }
    },
    clear() {
      this.hr = 0;
      this.mn = 0;
      this.sn = 0;
    },
    start() {
      this.timer = setInterval(this.timerEvent, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
  },
  getters: {
    asString: (state) =>
      `${state.hr < 10 ? "0" + state.hr : state.hr}:${
        state.mn < 10 ? "0" + state.mn : state.mn
      }:${state.sn < 10 ? "0" + state.sn : state.sn}`,
  },
});

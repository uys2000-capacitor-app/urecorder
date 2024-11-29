import type { Toast } from "@/types/toast";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      theme: "light",
      toasts: [] as Toast[],
    };
  },
  actions: {
    addToast(toast: Toast) {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast.id), toast.timeout);
    },
    removeToast(toastId: number) {
      this.toasts = this.toasts.filter((t) => t.id !== toastId);
    },
    clearToasts() {
      this.toasts = [];
    },
  },
});

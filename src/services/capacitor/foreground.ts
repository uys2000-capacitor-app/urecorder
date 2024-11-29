import {
  ForegroundService,
  type ButtonClickedEvent,
  type StartForegroundServiceOptions,
} from "@capawesome-team/capacitor-android-foreground-service";

export const moveToForeground = async () => {
  await ForegroundService.moveToForeground();
  return true;
};

export const startForegroundService = async (
  options: StartForegroundServiceOptions
) => {
  await ForegroundService.startForegroundService(options);
  return true;
};

export const updateForegroundService = async (
  options: StartForegroundServiceOptions
) => {
  await ForegroundService.updateForegroundService(options);
  return true;
};

export const stopForegroundService = async () => {
  await ForegroundService.stopForegroundService();
  return true;
};

export const checkPermissions = async () => {
  const result = await ForegroundService.checkPermissions();
  return result.display != "denied";
};

export const requestPermissions = async () => {
  const result = await ForegroundService.requestPermissions();
  return result.display != "denied";
};

export const checkManageOverlayPermission = async () => {
  const result = await ForegroundService.checkManageOverlayPermission();
  return result.granted;
};

export const requestManageOverlayPermission = async () => {
  const result = await ForegroundService.requestManageOverlayPermission();
  return result.granted;
};

export const addNotificationListener = async (
  callback: (e: ButtonClickedEvent) => void
) => {
  return await ForegroundService.addListener("buttonClicked", callback);
};

export const removeAllListeners = async () => {
  await ForegroundService.removeAllListeners();
  return true;
};

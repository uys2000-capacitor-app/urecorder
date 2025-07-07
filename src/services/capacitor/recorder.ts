import { VoiceRecorder, type Base64String } from "capacitor-voice-recorder";

export type RecordingDataValue = {
  recordDataBase64?: Base64String;
  msDuration: number;
  mimeType: string;
  uri?: string;
};

export const canDeviceVoiceRecord = async () => {
  const result = await VoiceRecorder.canDeviceVoiceRecord();
  return result.value;
};

export const requestAudioRecordingPermission = async () => {
  const result = await VoiceRecorder.requestAudioRecordingPermission();
  return result.value;
};

export const hasAudioRecordingPermission = async () => {
  const result = await VoiceRecorder.hasAudioRecordingPermission();
  return result.value;
};

export const startRecording = async () => {
  const result = await VoiceRecorder.startRecording();
  return result.value;
};

export const stopRecording = async (): Promise<RecordingDataValue> => {
  const result = await VoiceRecorder.stopRecording();
  return result.value;
};

export const pauseRecording = async () => {
  const result = await VoiceRecorder.pauseRecording();
  return result.value;
};

export const resumeRecording = async () => {
  const result = await VoiceRecorder.resumeRecording();
  return result.value;
};

export const getCurrentStatus = async () => {
  const result = await VoiceRecorder.getCurrentStatus();
  return result.status;
};

export const getAudioString = (recordingDataValue: RecordingDataValue) => {
  return `data:${recordingDataValue.mimeType};base64,${recordingDataValue.recordDataBase64}`;
};

import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const readFile = async (path: string) => {
  const result = await Filesystem.readFile({
    path: "URecorder/" + path,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  return result.data as string;
};

export const writeFile = async (path: string, data: string) => {
  const result = await Filesystem.writeFile({
    path: "URecorder/" + path,
    data: data,
    directory: Directory.Documents,
    recursive: true,
  });
  return result.uri;
};

export const deleteFile = async (path: string) => {
  await Filesystem.deleteFile({
    path: "URecorder/" + path,
    directory: Directory.Documents,
  });
};

export const createDir = async (path: string) => {
  await Filesystem.mkdir({
    path: "URecorder/" + path,
    directory: Directory.Documents,
  });
  return true;
};

export const readDir = async (path: string) => {
  const result = await Filesystem.readdir({
    path: "URecorder/" + path,
    directory: Directory.Documents,
  });
  return result.files;
};

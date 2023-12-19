import { FileEntry, FileObject } from "../types/File";

export const convertToJsonObject = (fileEntries: FileEntry[]): FileObject[] => {
    return fileEntries.map(([fileName, aliases, description, extension, filePath]) => ({
      fileName,
      aliases,
      description,
      extension,
      filePath,
    }));
  };

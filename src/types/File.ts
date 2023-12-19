
export type FileEntry = [string, string[], string, string, string];

export interface FileObject {
    fileName: string;
    aliases: string[];
    description: string;
    extension: string;
    filePath: string;
  }
